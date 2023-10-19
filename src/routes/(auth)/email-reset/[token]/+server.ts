import { validateEmailResetToken } from '$lib/server/token'
import { redirect, setFlash } from 'sveltekit-flash-message/server'
import type { PageServerLoad } from '../../../$types'
import { auth } from '$lib/server/lucia'

export const GET: PageServerLoad = async (event) => {
  const { params } = event
  const token = params.token as string

  const session = await event.locals.auth.validate()

  try {
    if (session) {
      const newEmail = await validateEmailResetToken(token)

      // TODO: update users key

      await prisma.key.update({
        where: { user_id: session.user.id, id: 'email:' + session.user.email },
        data: { id: 'email:' + newEmail },
      })

      await prisma.user.update({
        where: { id: session.user.id },
        data: { email: newEmail },
      })

      await auth.invalidateAllUserSessions(session.user.id)

      const newSession = await auth.createSession({
        userId: session.user.id,
        attributes: {},
      })

      event.locals.auth.setSession(newSession) // set session cookie

      setFlash(
        { type: 'success', message: 'Email successfully verified' },
        event
      )
      return new Response(null, {
        status: 302,
        headers: { Location: '/settings/account' },
      })
    }
  } catch (e: any) {
    // handle error
    setFlash(
      { type: 'error', message: "E-Mail couldn't change: " + e.message },
      event
    )
    return new Response(null, {
      status: 302,
      headers: { Location: '/settings/account' },
    })
  }
}
