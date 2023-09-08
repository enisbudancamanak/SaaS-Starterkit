import { setError, superValidate } from 'sveltekit-superforms/server'
import { newUserSchema } from '$lib/schema'
import { auth } from '$lib/server/lucia'
import { generateEmailVerificationToken } from '$lib/server/token'
import type { Actions, PageServerLoad } from './$types'
import { redirect } from 'sveltekit-flash-message/server'
import { fail } from '@sveltejs/kit'

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth.validate()

  if (session) {
    if (!session.user.emailVerified)
      throw redirect(302, '/signup/email-verification')
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
          email: form.data.email.toLowerCase(),
          email_verified: Number(0),
        },
      })

      const session = await auth.createSession({
        userId: user.userId,
        attributes: {},
      })
      event.locals.auth.setSession(session) // set session cookie
      const token = await generateEmailVerificationToken(user.userId)

      // TODO
      // throw redirect(
      //   { type: 'success', message: 'Email sent, check your Inbox!' },
      //   event
      // )

      // await sendEmailVerificationLink(token)
      return { form }
    } catch (e) {
      console.log(e)

      if (
        e.message.includes('Unique constraint failed on the fields: (`email`)')
      )
        return setError(form, 'email', 'Email already taken')
    }
  },
}
