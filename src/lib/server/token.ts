import { generateRandomString, isWithinExpiration } from 'lucia/utils'
import { prisma } from '$lib/server/prisma'
import { auth } from '$lib/server/lucia'
import { render } from 'svelte-email'
import nodemailer from 'nodemailer'
//@ts-ignore
import VerificationCode from '$lib/emails/VerificationCode.svelte'
import { GMAIL_EMAIL, GMAIL_PASSWORD } from '$env/static/private'

const EXPIRES_IN = 1000 * 60 * 5 //5 minutes
const verificationTimeout = new Map<
  string,
  {
    triesLeft: number
  }
>()

export const generateVerificationToken = async (user_id: string) => {
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

  return code
}

export const validateVerificationToken = async (
  user_id: string,
  code: string
) => {
  //  prevent brute force by throttling requests
  let storedTimeout = verificationTimeout.get(user_id) ?? null
  if (!storedTimeout) {
    // first attempt - setup throttling
    verificationTimeout.set(user_id, {
      triesLeft: 4,
    })
  } else {
    //@ts-ignore
    if (storedTimeout.triesLeft <= 0) {
      throw new Error('Too many requests!')
    }

    verificationTimeout.set(user_id, {
      triesLeft: storedTimeout.triesLeft - 1,
    })
  }

  const storedToken = await prisma.verificationCode.findFirst({
    where: {
      code,
    },
  })

  if (!storedToken || storedToken.code !== code) throw new Error('Invalid code')

  const tokenExpires = Number(storedToken.expires)
  if (!isWithinExpiration(tokenExpires)) {
    generateVerificationToken(user_id) //Resend code
    verificationTimeout.delete(user_id)

    throw new Error('Code expired, check your inbox')
  }

  verificationTimeout.delete(user_id)

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

export const sendVerificationCode = async (
  code: string,
  token: string | number
) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: GMAIL_EMAIL,
      pass: GMAIL_PASSWORD,
    },
  })

  const emailHtml = render({
    template: VerificationCode,
    props: { code: code, token: token },
  })

  const options = {
    from: GMAIL_EMAIL,
    to: 'enis.budancamanak@hotmail.com',
    subject: `${token} is your activation code`,
    html: emailHtml,
  }

  console.log('email sent')

  await transporter.sendMail(options)
}

export const generatePasswordResetToken = async (user_id: string) => {
  const token = generateRandomString(63)

  const storedUserTokens = await prisma.passwordResetToken.findMany({
    where: {
      user_id,
    },
  })

  if (storedUserTokens.length > 0) {
    const reusableStoredToken = storedUserTokens.find((token) => {
      // check if expiration is within 1 hour
      // and reuse the token if true
      return isWithinExpiration(Number(token.expires) - EXPIRES_IN / 2)
    })
    if (reusableStoredToken) return reusableStoredToken.code
  }
  await prisma.verificationCode.create({
    data: {
      code: token,
      expires: new Date().getTime() + EXPIRES_IN,
      user_id: user_id,
    },
  })

  return token
}

export const generateEmailVerificationToken = async (user_id: string) => {
  const storedUserTokens = await prisma.emailVerificationToken.findMany({
    where: {
      user_id,
    },
  })

  if (storedUserTokens.length > 0) {
    const reusableStoredToken = storedUserTokens.find((token) => {
      // check if expiration is within 25 minutes
      // and reuse the token if true
      return isWithinExpiration(Number(token.expires) - EXPIRES_IN * 5)
    })
    if (reusableStoredToken) return reusableStoredToken.id
  }
  const token = generateRandomString(63)

  await prisma.emailVerificationToken.create({
    data: {
      token: token,
      expires: new Date().getTime() + EXPIRES_IN,
      user_id,
    },
  })

  return token
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
        prisma.emailVerificationToken.delete({
          where: {
            user_id: storedToken.user_id,
          },
        })
      }
      return storedToken
    })

  // bigint => number conversion
  if (!isWithinExpiration(Number(storedToken.expires))) {
    throw new Error('Expired token')
  }
  return storedToken.user_id
}
