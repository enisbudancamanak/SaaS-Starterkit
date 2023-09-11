import { fail } from '@sveltejs/kit'
import { setError, superValidate } from 'sveltekit-superforms/server'
import { enterEmailSchema } from '$lib/schema'

import type { PageServerLoad, Actions } from './$types'
import { redirect, setFlash } from 'sveltekit-flash-message/server'
import {
  generatePasswordResetToken,
  sendPasswordResetEmail,
} from '$lib/server/token'

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

  return { form: superValidate(enterEmailSchema) }
}

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event.request, enterEmailSchema)

    if (!form.valid) {
      return fail(400, {
        form,
      })
    }
    try {
      // query from user table
      const storedUser = await prisma.user.findFirst({
        where: {
          email: form.data.email.toLowerCase(),
        },
      })

      if (!storedUser) {
        return setError(form, 'email', 'E-Mail does not exist.')
      }

      const token = await generatePasswordResetToken(storedUser.id)
      await sendPasswordResetEmail(token)

      setFlash(
        { type: 'success', message: 'E-Mail sent, check your inbox!' },
        event
      )

      return { form }
    } catch (e) {
      throw redirect(
        { type: 'error', message: 'An unknown error occurred' },
        event
      )
    }
  },
}
