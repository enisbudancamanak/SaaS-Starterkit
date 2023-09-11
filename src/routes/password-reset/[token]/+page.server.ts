import { resetPasswordSchema } from '$lib/schema'
import { auth } from '$lib/server/lucia'
import { validatePasswordResetToken } from '$lib/server/token'
import { fail, type Actions } from '@sveltejs/kit'
import { redirect, setFlash } from 'sveltekit-flash-message/server'
import { superValidate } from 'sveltekit-superforms/server'
import type { PageServerLoad } from './$types'

let token: string

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth.validate()

  const { params } = event
  let user: any
  token = params.token

  try {
    const userId = await validatePasswordResetToken(params.token)
    user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        email: true,
      },
    })
  } catch (e: any) {
    if (e.message === 'Invalid token' || e.message === 'Expired token') {
      throw redirect('/signup', { type: 'error', message: e.message }, event)
    }
  }

  if (session) {
    if (!session.user.emailVerified)
      throw redirect(302, '/signup/email-verification')
    throw redirect(302, '/home')
  }

  return { form: superValidate(resetPasswordSchema), email: user.email }
}

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event.request, resetPasswordSchema)

    if (!form.valid) {
      return fail(400, {
        form,
      })
    }

    try {
      const userId = await validatePasswordResetToken(token)
      let user = await auth.getUser(userId)
      await auth.invalidateAllUserSessions(user.userId)
      await auth.updateKeyPassword('email', user.email, form.data.password)

      if (!user.emailVerified) {
        user = await auth.updateUserAttributes(user.userId, {
          email_verified: true,
        })
      }

      const session = await auth.createSession({
        userId: user.userId,
        attributes: {},
      })

      event.locals.auth.setSession(session) // set session cookie

      setFlash(
        { type: 'success', message: 'Password successfully changed' },
        event
      )

      return { form }
    } catch (e) {
      return new Response('Invalid or expired password reset link', {
        status: 400,
      })
    }
  },
}
