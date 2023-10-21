import {
  generateEmailVerificationToken,
  generateEmailVerificationCode,
  sendVerificationEmail,
  validateEmailVerificationCode,
} from '$lib/server/token'
import type { Actions } from './$types'
import { auth } from '$lib/server/lucia'
import { redirect, setFlash } from 'sveltekit-flash-message/server'
import { error, fail } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth.validate()

  if (session) {
    if (session?.user?.emailVerified) throw redirect(302, '/home')
    return {
      session,
    }
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

  resendCode: async (event) => {
    const session = await event.locals.auth.validate()
    if (!session) return fail(401)

    const user = await auth.getUser(session.user.userId)

    // send a new verification code
    const code = await generateEmailVerificationCode(user.userId)
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
        if (session.user.emailVerified) {
          setFlash({ type: 'error', message: 'Email already verified!' }, event)
          return fail(400)
        }

        await validateEmailVerificationCode(session.user.userId, code)

        // Update user attributes
        await auth.updateUserAttributes(session.user.userId, {
          email_verified: true,
        })

        setFlash({ type: 'success', message: 'Successfully logged in!' }, event)
      } else {
        setFlash({ type: 'error', message: "You're already logged in!" }, event)
        return fail(400)
      }
    } catch (e: any) {
      if (
        e.message === 'Invalid code' ||
        e.message === 'Code expired, check your inbox' ||
        e.message === 'Too many requests!'
      ) {
        setFlash({ message: e.message, type: 'error' }, event)
        return fail(400, e.message)
      }
    }
  },
}
