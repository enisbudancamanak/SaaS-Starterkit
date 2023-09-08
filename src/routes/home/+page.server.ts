import { auth } from '$lib/server/lucia'
import { fail, type Actions } from '@sveltejs/kit'
import { redirect } from 'sveltekit-flash-message/server'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate()

  if (session) {
    if (!session.user.emailVerified)
      throw redirect(302, '/signup/email-verification')

    return {
      userId: session.user.userId,
      email: session.user.email,
    }
  }
}

export const actions: Actions = {
  logout: async (event) => {
    const session = await event.locals.auth.validate()
    if (!session) return fail(401)
    await auth.invalidateSession(session.sessionId) // invalidate session
    event.locals.auth.setSession(null) // remove cookie

    throw redirect(
      '/login',
      { type: 'success', message: 'successfully logged out!' },
      event
    )
  },
}
