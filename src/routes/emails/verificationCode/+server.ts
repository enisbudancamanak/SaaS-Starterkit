import { render } from 'svelte-email'
import nodemailer from 'nodemailer'
import { GMAIL_EMAIL, GMAIL_PASSWORD } from '$env/static/private'
import VerificationCode from '$lib/emails/VerificationCode.svelte'
import type { RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: GMAIL_EMAIL,
      pass: GMAIL_PASSWORD,
    },
  })

  console.log('TEST')

  // const emailHtml = render({
  //   component: VerificationCode,
  //   props: {
  //     name: 'Enis',
  //   },
  // })

  const options = {
    from: GMAIL_EMAIL,
    to: 'enis.budancamanak@hotmail.com',
    subject: 'hello world',
    html: 'hello world',
  }

  console.log('email sent')

  await transporter.sendMail(options)

  return new Response(null, {
    status: 302,
    headers: {
      Location: '/',
    },
  })
}
