import { setError, superValidate } from 'sveltekit-superforms/server'
import type { PageServerLoad, Actions } from './$types'
import { redirect, setFlash } from 'sveltekit-flash-message/server'
import { updateProfileDetailsSchema, resetPasswordSchema } from '$lib/schema'
import { fail } from '@sveltejs/kit'
import { generateEmailResetToken, sendEmailResetEmail } from '$lib/server/token'
import { auth } from '$lib/server/lucia'
import { BASE_URL } from '$env/static/private'

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth.validate()

  return {
    passwordForm: superValidate(resetPasswordSchema),
    personalForm: superValidate(session?.user, updateProfileDetailsSchema),
  }
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
          const token = await generateEmailResetToken(
            session.user.id,
            form.data.email
          )
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
    const { request, locals } = event
    const formData = await request.formData()

    const file = formData.get('avatar') as File

    const session = await locals.auth.validate()
    if (file && session) {
      try {
        const getPresignedUrlResponse = await fetch(`${BASE_URL}/api/upload`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: session.user.userId,
            fileName: file.name,
            fileType: file.type,
            previousImage: session.user.profilePicture,
          }),
        })

        if (!getPresignedUrlResponse.ok) {
          console.error('Failed to get presigned URL')
        }

        const { presignedUrl } = await getPresignedUrlResponse.json()

        const uploadToR2Response = await fetch(presignedUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': file.type,
          },
          body: file,
        })

        if (!uploadToR2Response.ok) {
          console.error('Failed to upload file to R2')

          setFlash(
            { message: 'Failed to upload picture', type: 'error' },
            event
          )
        }
        setFlash({ message: 'Picture uploaded!', type: 'success' }, event)
      } catch (e: any) {
        throw redirect(
          { type: 'error', message: 'An unknown error occurred' },
          event
        )
      }
    }
  },
  updatePassword: async (event) => {
    const form = await superValidate(event.request, resetPasswordSchema)
    const session = await event.locals.auth.validate()

    if (session) {
      const { user } = session
      if (!form.valid) {
        return fail(400, {
          form,
        })
      }

      try {
        const key = await auth.useKey(
          'email',
          session.user.email.toLowerCase(),
          form.data.current
        )
      } catch (e: any) {
        if (e.message === 'AUTH_INVALID_PASSWORD') {
          // user does not exist or invalid password
          return setError(form, 'current', 'Wrong password. Try again.')
        }
      }

      if (form.data.password === form.data.confirm) {
        try {
          await auth.invalidateAllUserSessions(user.userId)
          await auth.updateKeyPassword('email', user.email, form.data.password)
          setFlash(
            { type: 'success', message: 'Successfully changed password' },
            event
          )

          const session = await auth.createSession({
            userId: user.userId,
            attributes: {},
          })

          event.locals.auth.setSession(session) // set session cookie
        } catch (e: any) {
          throw redirect(
            { type: 'error', message: 'An unknown error occurred' },
            event
          )
        }

        return { form }
      }
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
