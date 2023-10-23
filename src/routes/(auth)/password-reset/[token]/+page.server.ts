import { resetPasswordSchema } from '$lib/schema'
import { auth } from '$lib/server/lucia'
import { validatePasswordResetToken } from '$lib/server/token'
import { fail, type Actions } from '@sveltejs/kit'
import { redirect, setFlash } from 'sveltekit-flash-message/server'
import { superValidate } from 'sveltekit-superforms/server'
import type { PageServerLoad } from './$types'

let token: string
let user: any

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth.validate()

  const { params } = event
  token = params.token

  try {
    const { userId } = await validatePasswordResetToken(params.token)
    user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })
  } catch (e: any) {
    if (e.message === 'Invalid token' || e.message === 'Expired token') {
      throw redirect(
        302,
        '/auth/login',
        { type: 'error', message: e.message },
        event
      )
    }
  }

  if (session) {
    if (!session.user.emailVerified) throw redirect(302, '/email-verification')
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
      await auth.invalidateAllUserSessions(user.user)
      await auth.updateKeyPassword('email', user.email, form.data.password)

      if (!user.emailVerified) {
        await auth.updateUserAttributes(user.id, {
          email_verified: true,
        })
      }

      const session = await auth.createSession({
        userId: user.id,
        attributes: {},
      })

      event.locals.auth.setSession(session) // set session cookie
    } catch (e) {
      setFlash({ type: 'error', message: 'An unknown error occurred' }, event)
    }

    throw redirect(
      '/auth/signup',
      {
        type: 'success',
        message: 'Password successfully changed',
      },
      event
    )
  },
}
