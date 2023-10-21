// Oslo refactoring

import { TimeSpan, isWithinExpirationDate } from 'oslo'
// @ts-ignore
import { VerificationTokenController } from 'oslo/token'
// @ts-ignore
import { generateRandomString, alphabet } from 'oslo/random'

import { prisma } from '$lib/server/prisma'
import { auth } from '$lib/server/lucia'
import { render } from 'svelte-email'

const codeVerificationTimeout = new Map<
  string,
  {
    triesLeft: number
  }
>()

const verificationController = new VerificationTokenController(
  new TimeSpan(5, 'm') //expires in 5 minutes
)

/**
 * Verification code token
 */

export const generateEmailVerificationCode = async (user_id: string) => {
  const storedUserCode = await prisma.verificationCode.findFirst({
    where: {
      user_id,
    },
  })

  if (storedUserCode) {
    const reusableStoredCode = verificationController.isTokenReusable(
      storedUserCode.expires
    )
    if (reusableStoredCode) return storedUserCode.code
  }

  const code = verificationController.createToken(
    generateRandomString(6, alphabet('0-9')),
    user_id
  )

  await prisma.verificationCode.create({
    data: {
      code: code.value,
      expires: code.expiresAt,
      user_id,
    },
  })

  return code.value
}

export const validateEmailVerificationCode = async (
  user_id: string,
  code: string
) => {
  //  prevent brute force by throttling requests
  let storedTimeout = codeVerificationTimeout.get(user_id) ?? null
  if (!storedTimeout) {
    // first attempt - setup throttling
    codeVerificationTimeout.set(user_id, {
      triesLeft: 4,
    })
  } else {
    //@ts-ignore
    if (storedTimeout.triesLeft <= 0) {
      throw new Error('Too many requests!')
    }

    codeVerificationTimeout.set(user_id, {
      triesLeft: storedTimeout.triesLeft - 1,
    })
  }

  const storedToken = await prisma.verificationCode.findFirst({
    where: {
      code,
    },
  })

  if (!storedToken) throw new Error('Invalid code')

  if (!verificationController.isTokenReusable(storedToken.expires)) {
    generateEmailVerificationCode(user_id) //Resend code

    throw new Error('Code expired, check your inbox')
  }

  codeVerificationTimeout.delete(user_id)
  let user = await auth.getUser(user_id)
  // await auth.invalidateAllUserSessions(user.userId)
  user = await auth.updateUserAttributes(user.userId, {
    email_verified: true, // verify email
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
}

/**
 * Email verification token
 */

export const generateEmailVerificationToken = async (user_id: string) => {
  const storedUserToken = await prisma.emailVerificationToken.findFirst({
    where: {
      user_id,
    },
  })

  if (storedUserToken) {
    const reusableStoredToken = verificationController.isTokenReusable(
      storedUserToken.expires
    )
    if (reusableStoredToken) return storedUserToken.token
  }

  const token = verificationController.createToken(
    generateRandomString(63, alphabet('a-z', '0-9')),
    user_id
  )

  await prisma.emailVerificationToken.create({
    data: {
      token: token.value,
      expires: token.expiresAt,
      user_id,
    },
  })

  return token.value
}

export const validateEmailVerificationToken = async (token: string) => {
  const storedToken = await prisma.emailVerificationToken
    .findFirst({
      where: {
        token,
      },
    })
    .then(async (storedToken) => {
      if (!storedToken) throw new Error('Invalid token')

      if (storedToken) {
        await prisma.emailVerificationToken.deleteMany({
          // @ts-ignore
          where: {
            user_id: storedToken.user_id,
          },
        })
      }
      return storedToken
    })

  // bigint => number conversion
  if (!verificationController.isTokenReusable(storedToken.expires)) {
    throw new Error('Expired token')
  }
  return storedToken.user_id
}

/**
 * Password reset token
 */

export const generatePasswordResetToken = async (userId: string) => {
  const storedUserToken = await prisma.passwordResetToken.findFirst({
    where: {
      user_id: userId,
    },
  })

  if (storedUserToken) {
    // check if expiration is within TimeSpan
    // and reuse the token if true
    const reusableStoredToken = verificationController.isTokenReusable(
      storedUserToken.expires
    )

    // isWithinExpiration(Number(storedUserToken.expires) - EXPIRES_IN * 5) //Withing 25 minutes
    if (reusableStoredToken) return storedUserToken.id
  }
  const token = verificationController.createToken(
    generateRandomString(63, alphabet('a-z', '0-9')),
    userId
  )
  await prisma.passwordResetToken.create({
    data: {
      token: token.value,
      expires: token.expiresAt,
      user_id: userId,
    },
  })

  return token.value
}

/**
 *
 * Validate Password Reset Token
 *
 */

export const validatePasswordResetToken = async (token: string) => {
  const storedToken = await prisma.passwordResetToken
    .findFirst({
      where: {
        token: token,
      },
    })
    .then(async (storedToken) => {
      if (!storedToken) throw new Error('Invalid token')

      if (storedToken)
        await prisma.passwordResetToken.deleteMany({
          // @ts-ignore
          where: {
            user_id: storedToken.user_id,
          },
        })
      return storedToken
    })

  if (!isWithinExpirationDate(storedToken.expires)) {
    throw new Error('Expired token')
  }

  return { userId: storedToken.user_id }
}

/**
 *
 * Validate Email Reset token
 *
 */

export const validateEmailResetToken = async (token: string) => {
  const storedToken = await prisma.emailResetToken
    .findFirst({
      where: {
        token,
      },
    })
    .then(async (storedToken) => {
      if (!storedToken) throw new Error('Invalid token')

      if (storedToken) {
        await prisma.emailResetToken.deleteMany({
          // @ts-ignore
          where: {
            user_id: storedToken.user_id,
          },
        })
      }
      return storedToken
    })

  // bigint => number conversion
  if (!verificationController.isTokenReusable(storedToken.expires)) {
    throw new Error('Expired token')
  }

  return storedToken.new_email
}
