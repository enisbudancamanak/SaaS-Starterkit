// routes/login/github/callback/+server.ts
import { auth, githubAuth } from '$lib/server/lucia.js'
import { OAuthRequestError } from '@lucia-auth/oauth'
import { prisma } from '$lib/server/prisma'
import { handleRequest } from '$lib/utils/oauth'
import type { GithubTokens } from '@lucia-auth/oauth/providers'
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
  const storedState = cookies.get('github_oauth_state')
  const state = url.searchParams.get('state')
  const code = url.searchParams.get('code')
  // validate state
  if (!storedState || !state || storedState !== state || !code) {
    return new Response(null, {
      status: 400,
    })
  }
  try {
    const { getExistingUser, githubUser, createUser, createKey, githubTokens } =
      await githubAuth.validateCallback(code)

    const primaryEmail = await fetchEmailFromUser(githubTokens)

    const getUser = async () => {
      const existingUser = await getExistingUser()
      if (existingUser) return existingUser

      if (!primaryEmail.verified) {
        throw redirect(
          '/auth/login',
          { type: 'error', message: 'GitHub Email is not verified' },
          event
        )
      }

      const existingDatabaseUserWithEmail = await getUserByEmail(
        primaryEmail.email.toLowerCase()
      )

      if (existingDatabaseUserWithEmail) {
        const user = auth.transformDatabaseUser(existingDatabaseUserWithEmail)
        await createKey(user.userId)
        return user
      }

      return await createUser({
        attributes: {
          email: primaryEmail.email.toLowerCase(),
          email_verified: true,
          name: githubUser.login,
          profile_picture: githubUser.avatar_url,
        },
      })
    }

    const user = await getUser()

    await auth.updateUserAttributes(user.userId, {
      email_verified: true,
      profile_picture: user.profilePicture
        ? user.profilePicture
        : githubUser.avatar_url,
    })

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
    console.log(e)

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

async function fetchEmailFromUser(githubTokens: GithubTokens) {
  const githubUserEmails = await handleRequest<GitHubUserEmail[]>(
    new Request('https://api.github.com/user/emails', {
      headers: {
        Authorization: `Token ${githubTokens.accessToken}`,
      },
    })
  )
  return githubUserEmails.find(
    (o) => o.verified && o.primary
  ) as GitHubUserEmail
}

type GitHubUserEmail = {
  email: string
  verified: boolean
  primary: boolean
  visibility: string
}
