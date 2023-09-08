import { generateRandomString, isWithinExpiration } from 'lucia/utils'
import { prisma } from '$lib/server/prisma'
import { auth } from '$lib/server/lucia'
import { error, fail } from '@sveltejs/kit'
import { redirect } from 'sveltekit-flash-message/server'
redirect

const EXPIRES_IN = 1000 * 60 * 5 //5 minutes
const verificationTimeout = new Map<
  string,
  {
    timeoutUntil: number
    timeoutSeconds: number
  }
>()

export const generateEmailVerificationToken = async (user_id: string) => {
  const code = generateRandomString(6, '0123456789')

  await prisma.verificationCode.deleteMany({
    where: {
      user_id,
    },
  })

  await prisma.verificationCode.create({
    data: {
      code,
      expires: Date.now() + EXPIRES_IN,
      user_id,
    },
  })

  //   await sendVerificationCode(session.user.email, code)
  return code
}

export const validateEmailVerificationToken = async (
  user_id: string,
  code: string
) => {
  //  prevent brute force by throttling requests
  const storedTimeout = verificationTimeout.get(user_id) ?? null
  if (!storedTimeout) {
    // first attempt - setup throttling
    verificationTimeout.set(user_id, {
      timeoutUntil: Date.now(),
      timeoutSeconds: 1,
    })
  } else {
    if (!isWithinExpiration(verificationTimeout.get(user_id).timeoutUntil)) {
      generateEmailVerificationToken(user_id) //Resend code
      throw new Error('Too many requests, check your inbox')
    }

    const timeoutSeconds = storedTimeout.timeoutSeconds * 2
    verificationTimeout.set(user_id, {
      timeoutUntil: Date.now() + timeoutSeconds * 1000,
      timeoutSeconds,
    })
  }

  const storedToken = await prisma.verificationCode.findFirst({
    where: {
      code,
    },
  })

  if (!storedToken) throw new Error('Invalid token')

  const tokenExpires = Number(storedToken.expires)
  if (!isWithinExpiration(tokenExpires)) {
    generateEmailVerificationToken(user_id) //Resend code
    throw new Error('Token expired, check your inbox')
  }

  let user = await auth.getUser(user_id)
  // await auth.invalidateAllUserSessions(user.userId) // important!

  user = await auth.updateUserAttributes(user.userId, {
    email_verified: Number(1), // verify email
  })
}
