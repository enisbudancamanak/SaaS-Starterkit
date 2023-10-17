import type { PageServerLoad } from './$types'

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
        created_at: login.created_at,
        provider: login.id.split(':')[0],
        name: login.id.includes('github')
          ? login.user.github_username
          : login.id.split(':')[1],
      })),
    ]

    return {
      logins: loginsMapped,
    }
  }
}
