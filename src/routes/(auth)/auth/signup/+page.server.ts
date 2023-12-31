import { setError, superValidate } from 'sveltekit-superforms/server'
import { newUserSchema } from '$lib/schema'
import { auth } from '$lib/server/lucia'
import {
  generateEmailVerificationToken,
  generateEmailVerificationCode,
} from '$lib/server/token'
import type { Actions, PageServerLoad } from './$types'
import { redirect, setFlash } from 'sveltekit-flash-message/server'
import { fail } from '@sveltejs/kit'
import { LuciaError } from 'lucia'
import { sendVerificationEmail } from '$lib/emails/sendEmails'

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth.validate()

  if (session) {
    if (!session.user.emailVerified) throw redirect(302, '/email-verification')
    throw redirect(302, '/home')
  }

  return {
    form: superValidate(newUserSchema),
    session,
  }
}

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event.request, newUserSchema)
    try {
      if (!form.valid) {
        return fail(400, {
          form,
        })
      }

      const user = await auth.createUser({
        key: {
          providerId: 'email',
          providerUserId: form.data.email.toLowerCase(),
          password: form.data.password,
        },
        attributes: {
          name: form.data.name,
          email: form.data.email.toLowerCase(),
          email_verified: false,
          profile_picture: '',
          github_username: '',
        },
      })

      const session = await auth.createSession({
        userId: user.userId,
        attributes: {},
      })
      event.locals.auth.setSession(session) // set session cookie

      const code = await generateEmailVerificationCode(user.userId)
      const token = await generateEmailVerificationToken(user.userId)

      await sendVerificationEmail(code, token)

      setFlash(
        { message: 'E-Mail sent, check your inbox!', type: 'success' },
        event
      )

      return { form }
    } catch (e: any) {
      // Check if user exists but without email verification
      const user = await prisma.user.findFirst({
        where: {
          email: form.data.email.toLowerCase(),
          email_verified: false,
        },
      })

      // if it exists create a session and sendVerificationCode
      if (user) {
        // invalidate all sessions
        await auth.invalidateAllUserSessions(user.id)
        // update password
        await auth.updateKeyPassword('email', user.email, form.data.password)

        // create session
        const session = await auth.createSession({
          userId: user.id,
          attributes: {},
        })
        event.locals.auth.setSession(session) // set session cookie

        // send verification code
        // const code = await generateVerificationToken(user.id)
        // const token = await generateEmailVerificationToken(user.id)

        // await sendVerificationEmail(code, token)
      }

      //E-Mail already taken
      else if (
        e != typeof LuciaError &&
        e.message.includes('Unique constraint failed on the fields: (`email`)')
      ) {
        return setError(form, 'email', 'E-Mail already taken')
      }
    }
  },
}
