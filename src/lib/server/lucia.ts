import { lucia } from 'lucia'
import { prisma } from '@lucia-auth/adapter-prisma'
import { sveltekit } from 'lucia/middleware'
import { dev } from '$app/environment'
import { prisma as client } from './prisma'

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

export type Auth = typeof auth
