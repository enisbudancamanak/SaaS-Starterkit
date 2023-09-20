import {
  validateVerificationToken,
  generateVerificationToken,
  generateEmailVerificationToken,
  sendVerificationEmail,
} from '$lib/server/token'
import type { Actions } from './$types'
import { auth } from '$lib/server/lucia'
import { redirect, setFlash } from 'sveltekit-flash-message/server'
import { fail } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth.validate()

  if (session) {
    if (session?.user?.emailVerified) throw redirect(302, '/home')

    return {
      session,
    }
  }
  throw redirect(302, '/signup')
}

export const actions: Actions = {
  logout: async (event) => {
    const session = await event.locals.auth.validate()
    if (!session) return fail(401)
    await auth.invalidateSession(session.sessionId) // invalidate session
    await auth.deleteDeadUserSessions(session.userId) //delete dead user sessions
    event.locals.auth.setSession(null) // remove cookie

    throw redirect(
      '/signup',
      { type: 'success', message: 'successfully logged out!' },
      event
    )
  },

  resendCode: async (event) => {
    const session = await event.locals.auth.validate()
    if (!session) return fail(401)

    const user = await auth.getUser(session.user.userId)

    // send verification code
    const code = await generateVerificationToken(user.userId)
    const token = await generateEmailVerificationToken(user.userId)

    await sendVerificationEmail(code, token)

    setFlash(
      { message: 'Resent code, check your Spam!', type: 'success' },
      event
    )
  },
  validateCode: async (event) => {
    const { code } = Object.fromEntries(
      await event.request.formData()
    ) as Record<string, string>

    try {
      // Update user attributes
      const session = await event.locals.auth.validate()

      if (session) {
        await validateVerificationToken(session.user.userId, code)

        throw redirect(
          '/home',
          { type: 'success', message: 'Successfully logged in!' },
          event
        )
      }
    } catch (e: any) {
      if (
        e.message === 'Invalid code' ||
        e.message === 'Code expired, check your inbox' ||
        e.message === 'Too many requests!'
      )
        throw redirect({ type: 'error', message: e.message }, event)
    }
  },
}