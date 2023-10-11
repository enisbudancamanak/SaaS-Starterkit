import { auth } from '$lib/server/lucia'
import { fail, type Actions } from '@sveltejs/kit'
import { redirect } from 'sveltekit-flash-message/server'
import type { PageServerLoad } from '../../$types'

export const load: PageServerLoad = async (event) => {
  const { locals } = event
  const session = await locals.auth.validate()

  if (session) {
    if (!session.user.emailVerified) throw redirect(302, '/email-verification')

    return {
      userId: session.user.userId,
      email: session.user.email,
    }
  } else {
    throw redirect(
      '/auth/login',
      { type: 'error', message: 'Please login to proceed!' },
      event
    )
  }
}
