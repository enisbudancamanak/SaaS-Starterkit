import { z } from 'zod'
import { superValidate } from 'sveltekit-superforms/server'
import { fail } from '@sveltejs/kit'

const newUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

//
export const load = async (event) => {
  const form = await superValidate(event, newUserSchema)

  return { form }
}

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    const form = await superValidate(event, newUserSchema)
    console.log(form)

    if (!form.valid) {
      return fail(400, { form })
    }

    return { form }
  },
}
