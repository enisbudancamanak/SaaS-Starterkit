import { auth } from '$lib/server/lucia'
import { fail, redirect } from '@sveltejs/kit'

export async function load({ locals }) {
  const session = await locals.auth.validate()
  //   if (!session) throw redirect(302, '/login')
  //   //   if (!session.user.emailVerified) {
  //   //     throw redirect(302, '/email-verification')
  //   //   }
  return {
    userId: session.user.userId,
    email: session.user.email,
  }
}

/** @type {import('./$types').Actions} */
export const actions = {
  logout: async ({ locals }) => {
    const session = await locals.auth.validate()
    if (!session) return fail(401)
    await auth.invalidateSession(session.sessionId) // invalidate session
    locals.auth.setSession(null) // remove cookie
    throw redirect(302, '/login') // redirect to login page
  },
}
