import { render } from 'svelte-email'
import { sendEmail } from '$lib/emails/send'

// Email Components
// @ts-ignore
import VerificationCode from '$lib/emails/components/VerificationCode.svelte'
// @ts-ignore
import ResetPassword from '$lib/emails/components/ResetPassword.svelte'
// @ts-ignore
import ResetEmail from '$lib/emails/components/ResetEmail.svelte'

/**
 *
 * Send Email Reset Email
 *
 */
export const sendEmailResetEmail = async (
  token: string | number,
  oldEmail: string,
  newEmail: string
) => {
  const emailHtml = render({
    template: ResetEmail,
    props: { token: token, oldEmail: oldEmail, newEmail: newEmail },
  })

  await sendEmail({
    from: 'enis.budancamanak@hotmail.com',
    to: 'enis.budancamanak@hotmail.com',
    subject: 'Confirm Email change',
    html: emailHtml,
  })
}

/**
 * Send password reset email
 */

export const sendPasswordResetEmail = async (token: string | number) => {
  const emailHtml = render({
    template: ResetPassword,
    props: { token: token },
  })

  await sendEmail({
    from: 'enis.budancamanak@hotmail.com',
    to: 'enis.budancamanak@hotmail.com',
    subject: 'Reset your password',
    html: emailHtml,
  })
}

/**
 *
 * Send verification email
 *
 */

export const sendVerificationEmail = async (
  code: string,
  token: string | number
) => {
  const emailHtml = render({
    template: VerificationCode,
    props: { code: code, token: token },
  })

  await sendEmail({
    from: 'enis.budancamanak@hotmail.com',
    to: 'enis.budancamanak@hotmail.com',
    subject: 'Verify Your Email Address',
    html: emailHtml,
  })
}
