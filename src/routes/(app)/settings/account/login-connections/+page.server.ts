import type { Actions } from '@sveltejs/kit'
import type { PageServerLoad } from './$types'
import { setFlash } from 'sveltekit-flash-message/server'

export const load: PageServerLoad = async (event) => {
  const session = await event.locals.auth.validate()

  if (session) {
    const logins = await prisma.key.findMany({
      where: {
        user_id: session.user.id,
      },
      select: {
        id: true,
        user: true,
        created_at: true,
      },
    })

    const loginsMapped: any = [
      ...logins.map((login: any) => ({
        id: login.id,
        created_at: login.created_at,
        provider: login.id.split(':')[0],
        name: login.id.includes('github')
          ? login.user.github_username
          : login.id.split(':')[1],
        email: login.user.email,
      })),
    ]

    return {
      logins: loginsMapped,
      primaryEmail: logins.some((login) => login.id.includes('email')),
    }
  }
}

export const actions: Actions = {
  disconnect: async (event) => {
    const session = await event.locals.auth.validate()

    const { id } = Object.fromEntries(await event.request.formData()) as Record<
      string,
      string
    >

    // Get variable from form data

    if (session) {
      await prisma.key.delete({
        where: {
          id: id,
        },
      })

      setFlash(
        {
          type: 'success',
          message: id.includes('GitHub')
            ? 'GitHub account disconnected.'
            : 'Google account disconnected',
        },
        event
      )
    }
  },
}
