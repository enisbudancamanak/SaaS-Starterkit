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

export const actions: Actions = {
  logout: async (event) => {
    const session = await event.locals.auth.validate()

    if (!session) return fail(401)

    // Invalidate session
    await auth.invalidateSession(session.sessionId)

    // Remove session cookie
    event.locals.auth.setSession(null)

    // Remove OAuth cookies
    event.cookies.delete('github_oauth_state')
    event.cookies.delete('google_oauth_state')

    throw redirect(
      '/auth/login',
      { type: 'success', message: 'successfully logged out!' },
      event
    )
  },
}
