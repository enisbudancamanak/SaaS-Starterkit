import { fail } from '@sveltejs/kit'
import { auth } from '$lib/server/lucia'
import { superValidate } from 'sveltekit-superforms/server'
import { loginSchema } from '$lib/schema'

import type { PageServerLoad, Actions } from './$types'
import { redirect } from 'sveltekit-flash-message/server'

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth.validate()
  if (session) {
    if (!session.user.emailVerified)
      throw redirect(
        '/signup/email-verification',
        { type: 'error', message: 'email not verified' },
        event
      )
    throw redirect(302, '/home')
  }

  return { form: superValidate(loginSchema) }
}

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event.request, loginSchema)

    if (!form.valid) {
      return fail(400, {
        form,
      })
    }

    try {
      const key = await auth.useKey(
        'email',
        form.data.email.toLowerCase(),
        form.data.password
      )
      const session = await auth.createSession({
        userId: key.userId,
        attributes: {},
      })
      event.locals.auth.setSession(session) // set session cookie

      return { form }
    } catch (e: any) {
      if (
        e.message === 'AUTH_INVALID_KEY_ID' ||
        e.message === 'AUTH_INVALID_PASSWORD'
      ) {
        // user does not exist
        // or invalid password
        throw redirect(
          { type: 'error', message: 'Incorrect email or password' },
          event
        )
      }
      throw redirect(
        { type: 'error', message: 'An unknown error occurred' },
        event
      )
    }
  },
}
