import { fail, redirect } from '@sveltejs/kit'
import { auth } from '$lib/server/lucia'
import { superValidate } from 'sveltekit-superforms/server'
import { newUserSchema } from '$lib/schema'

import type { PageServerLoad, Actions } from './$types'

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth.validate()
  if (session) {
    // if (!session.user.emailVerified) throw redirect(302, '/email-verification')
    throw redirect(302, '/home')
  }

  const form = await superValidate(event, newUserSchema)
  return { form }
}

export const actions: Actions = {
  default: async (event) => {
    // const form = await superValidate(event, newUserSchema)
    // if (!form.valid) {
    //   return fail(400, {
    //     form,
    //   })
    // }

    const formData = await event.request.formData()
    const email = formData.get('email')
    const password = formData.get('password')

    // basic check
    if (typeof email !== 'string' || email.length < 1 || email.length > 255) {
      return fail(400, {
        message: 'Invalid email',
      })
    }
    if (
      typeof password !== 'string' ||
      password.length < 1 ||
      password.length > 255
    ) {
      return fail(400, {
        message: 'Invalid password',
      })
    }

    try {
      // find user by key
      // and validate password
      const key = await auth.useKey('email', email.toLowerCase(), password)
      const session = await auth.createSession({
        userId: key.userId,
        attributes: {},
      })
      event.locals.auth.setSession(session) // set session cookie
    } catch (e) {
      if (
        e.message === 'AUTH_INVALID_KEY_ID' ||
        e.message === 'AUTH_INVALID_PASSWORD'
      ) {
        // user does not exist
        // or invalid password
        return fail(400, {
          message: 'Incorrect email or password',
        })
      }
      return fail(500, {
        message: 'An unknown error occurred',
      })
    }
    // redirect to page
    throw redirect(302, '/home')
  },
}
