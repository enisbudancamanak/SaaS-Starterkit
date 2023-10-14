import { setError, superValidate } from 'sveltekit-superforms/server'
import type { PageServerLoad, Actions } from './$types'
import { redirect, setFlash } from 'sveltekit-flash-message/server'
import { updateProfileDetailsSchema } from '$lib/schema'
import { fail } from '@sveltejs/kit'
import { generateEmailResetToken, sendEmailResetEmail } from '$lib/server/token'

export const load: PageServerLoad = async (event) => {
  return { form: superValidate(updateProfileDetailsSchema) }
}

export const actions: Actions = {
  updateProfileDetails: async (event) => {
    const form = await superValidate(event.request, updateProfileDetailsSchema)

    if (!form.valid) {
      return fail(400, {
        form,
      })
    }

    const session = await event.locals.auth.validate()
    if (session) {
      // Update name
      if (form.data.name !== session.user.name) {
        await prisma.user.update({
          where: {
            email: session.user.email,
          },
          data: {
            name: form.data.name,
          },
        })

        setFlash(
          { type: 'success', message: 'Successfully updated name' },
          event
        )
      }

      if (form.data.email !== session.user.email) {
        // Update email
        const duplicatedEmail = await prisma.user.findFirst({
          where: {
            email: form.data.email,
          },
        })
        if (duplicatedEmail == null) {
          const token = await generateEmailResetToken(session.user.id)
          await sendEmailResetEmail(token, session.user.email, form.data.email)

          setFlash(
            { type: 'success', message: 'Email sent, check your inbox!' },
            event
          )
        } else {
          setError(form, 'email', 'Email already taken')
        }
      }
    }

    return { form }
  },

  updateProfilePicture: async (event) => {
    try {
      setFlash({ type: 'success', message: 'Successfully logged in' }, event)
    } catch (e: any) {
      throw redirect(
        { type: 'error', message: 'An unknown error occurred' },
        event
      )
    }
  },

  updatePassword: async (event) => {
    try {
      setFlash({ type: 'success', message: 'Successfully logged in' }, event)
    } catch (e: any) {
      throw redirect(
        { type: 'error', message: 'An unknown error occurred' },
        event
      )
    }
  },

  deleteAccount: async (event) => {
    try {
      setFlash({ type: 'success', message: 'Successfully logged in' }, event)
    } catch (e: any) {
      throw redirect(
        { type: 'error', message: 'An unknown error occurred' },
        event
      )
    }
  },
}
