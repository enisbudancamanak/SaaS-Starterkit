// See https://kit.svelte.dev/docs/types#app

import type { PrismaClient } from '@prisma/client'

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      auth: import('lucia').AuthRequest
    }
    // interface PageData {}
    // interface Platform {}
  }
  var prisma: PrismaClient
}

declare global {
  namespace Lucia {
    type Auth = import('$lib/server/lucia').Auth
    type DatabaseUserAttributes = {
      username: string
      name: string
    }
    type DatabaseSessionAttributes = Record<string, never>
  }
}

export {}
