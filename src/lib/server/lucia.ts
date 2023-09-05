import { lucia } from 'lucia'
import { prisma } from '@lucia-auth/adapter-prisma'
import { sveltekit } from 'lucia/middleware'
import { dev } from '$app/environment'
import { prisma as client } from './prisma'

import { github, google } from '@lucia-auth/oauth/providers'
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '$env/static/private'

export const auth = lucia({
  adapter: prisma(client),
  env: dev ? 'DEV' : 'PROD',
  middleware: sveltekit(),

  getUserAttributes: (data) => {
    return {
      email: data.email,
      emailVerified: Boolean(data.email_verified),
    }
  },
})

// https://lucia-auth.com/guidebook/github-oauth/sveltekit
export const githubAuth = github(auth, {
  clientId: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
})

export const googleAuth = google(auth, {
  clientId: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  redirectUri: 'http://localhost:5137/login/google/callback',
})

export type Auth = typeof auth
