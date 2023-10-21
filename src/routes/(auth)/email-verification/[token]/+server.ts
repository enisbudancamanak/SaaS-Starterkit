import { auth } from '$lib/server/lucia'
import { validateEmailVerificationToken } from '$lib/server/token'
import { setFlash } from 'sveltekit-flash-message/server'

export const GET = async (event) => {
  const { params } = event
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

    setFlash({ message: 'Successfully logged in!', type: 'success' }, event)
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/home',
        'Set-Cookie': sessionCookie.serialize(),
      },
    })
  } catch (e: any) {
    if (
      e.message === 'Invalid code' ||
      e.message === 'Code expired, check your inbox' ||
      e.message === 'Too many requests!'
    ) {
      setFlash({ message: e.message, type: 'error' }, event)
    }
    return new Response(e, {
      status: 400,
    })
  }
}
