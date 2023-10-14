import { resetPasswordSchema } from '$lib/schema'
import { auth } from '$lib/server/lucia'
import { validatePasswordResetToken } from '$lib/server/token'
import { fail, type Actions } from '@sveltejs/kit'
import { redirect, setFlash } from 'sveltekit-flash-message/server'
import { superValidate } from 'sveltekit-superforms/server'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
  const { params } = event

  try {
    await validatePasswordResetToken(params.token)

    throw redirect(
      '/settings/account',
      { type: 'success', message: 'Email updated!' },
      event
    )
  } catch (e: any) {
    if (e.message === 'Invalid token' || e.message === 'Expired token') {
      throw redirect('/home', { type: 'error', message: e.message }, event)
    }
  }

  return {}
}
