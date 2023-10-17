import { dev } from '$app/environment'
import { githubAuth } from '$lib/server/lucia.js'
import type { PageServerLoad } from '../../../$types'

// https://lucia-auth.com/guidebook/github-oauth/sveltekit
export const GET: PageServerLoad = async ({ cookies }) => {
  const [url, state] = await githubAuth.getAuthorizationUrl()
  // store state
  cookies.set('github_oauth_state', state, {
    httpOnly: true,
    secure: !dev,
    path: '/',
    maxAge: 60 * 60,
  })

  return new Response(null, {
    status: 302,
    headers: {
      Location: url.toString(),
    },
  })
}
