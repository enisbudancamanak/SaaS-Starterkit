import { fail } from '@sveltejs/kit'
import { superValidate } from 'sveltekit-superforms/server'
import { newUserSchema } from '$lib/schema'
import { auth } from '$lib/server/lucia'

export const load = async (event) => {
  const form = await superValidate(event, newUserSchema)

  return { form }
}

export const actions = {
  default: async (event) => {
    // const form = await superValidate(event, newUserSchema)

    // if (!form.valid) {
    //   return fail(400, { form })
    // }

    const { email, password } = Object.fromEntries(
      await event.request.formData()
    ) as Record<string, string>

    try {
      await auth.createUser({
        key: {
          providerId: 'email',
          providerUserId: email.toLowerCase(),
          password,
        },
        attributes: {
          email: email.toLowerCase(),
        },
      })
    } catch (e) {}
  },
}
