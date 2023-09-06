// routes/login/github/callback/+server.ts
import { auth, githubAuth } from '$lib/server/lucia.js'
import { OAuthRequestError } from '@lucia-auth/oauth'
import { prisma } from '$lib/server/prisma'
import { handleRequest } from '$lib/utils/oauth'

export const GET = async ({ url, cookies, locals }) => {
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

    const githubUserEmails = await handleRequest<GitHubUserEmail[]>(
      new Request('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Token ${githubTokens.accessToken}`,
        },
      })
    )
    const primaryEmail = githubUserEmails.find(
      (o) => o.verified && o.primary
    ) as GitHubUserEmail

    const getUser = async () => {
      const existingUser = await getExistingUser()
      if (existingUser) return existingUser
      if (!primaryEmail.verified) {
        throw new Error('Email not verified')
      }
      const existingDatabaseUserWithEmail = await getUserByEmail(
        primaryEmail.email.toLowerCase()
      )

      if (existingDatabaseUserWithEmail) {
        // transform `UserSchema` to `User`
        const user = auth.transformDatabaseUser(existingDatabaseUserWithEmail)
        await createKey(user.userId)
        return user
      }
      return await createUser({
        attributes: {
          email: primaryEmail.email.toLowerCase(),
        },
      })
    }

    const user = await getUser()

    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    })
    locals.auth.setSession(session)
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

type GitHubUserEmail = {
  email: string
  verified: boolean
  primary: boolean
  visibility: string
}
