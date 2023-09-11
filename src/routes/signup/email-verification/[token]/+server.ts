import { auth } from '$lib/server/lucia'
import { validateEmailVerificationToken } from '$lib/server/token'

export const GET = async ({ params }) => {
  console.log(params.token)

  const token = params.token
  try {
    const userId = await validateEmailVerificationToken(token)
    const user = await auth.getUser(userId)
    await auth.invalidateAllUserSessions(user.userId)
    await auth.updateUserAttributes(user.userId, {
      email_verified: true,
    })
    const session = await auth.createSession({
      userId: user.userId,
      attributes: {},
    })
    const sessionCookie = auth.createSessionCookie(session)
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/home', // profile page
        'Set-Cookie': sessionCookie.serialize(),
      },
    })
  } catch (e: any) {
    // TODO
    return new Response(e, {
      status: 400,
    })
  }
}
