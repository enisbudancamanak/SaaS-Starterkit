// routes/login/google/callback/+server.ts
import { auth, googleAuth } from '$lib/server/lucia.js'
import { OAuthRequestError } from '@lucia-auth/oauth'
import { prisma } from '$lib/server/prisma'
import { redirect, setFlash } from 'sveltekit-flash-message/server'
import type { PageServerLoad } from '../../../../$types'

export const GET: PageServerLoad = async (event) => {
  const { cookies, url, locals } = event

  /**
   * Check for a session. if it exists,
   * redirect to home
   */
  const session = await locals.auth.validate()
  if (session) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/home',
      },
    })
  }

  const storedState = cookies.get('google_oauth_state')
  const state = url.searchParams.get('state')
  const code = url.searchParams.get('code')
  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    })
  }
  try {
    const { getExistingUser, googleUser, createUser, createKey } =
      await googleAuth.validateCallback(code)

    const getUser = async () => {
      const existingUser = await getExistingUser()
      if (existingUser) return existingUser
      if (!googleUser.email_verified) {
        throw redirect(
          '/auth/login',
          { type: 'error', message: 'Google Email is not verified' },
          event
        )
      }
      const existingDatabaseUserWithEmail = await getUserByEmail(
        googleUser.email as string
      )

      if (existingDatabaseUserWithEmail) {
        // transform `UserSchema` to `User`
        const user = auth.transformDatabaseUser(existingDatabaseUserWithEmail)
        await createKey(user.userId)
        return user
      }
      return await createUser({
        attributes: {
          email: googleUser.email?.toLowerCase() as string,
          email_verified: true,
        },
      })
    }

    const user = await getUser()

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    })
    locals.auth.setSession(session)

    setFlash({ type: 'success', message: 'Successfully logged in' }, event)

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/home',
      },
    })
  } catch (e) {
    if (e instanceof OAuthRequestError) {
      // invalid code
      return new Response(null, {
        status: 400,
      })
    }
    return new Response(null, {
      status: 500,
    })
  }
}

function getUserByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email: email.toLowerCase(),
    },
  })
}

type GoogleUser = {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
  email?: string
  email_verified?: boolean
  hd?: string
}
