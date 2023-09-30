import { RESEND_API_KEY } from '$env/static/private'
import { Resend } from 'resend'
import toast from 'svelte-french-toast'

const sendResendEmail = async (options: {
  from: string
  to: string
  subject: string
  html: string
}) => {
  const resend = new Resend(RESEND_API_KEY)

  try {
    options.from = 'onboarding@resend.dev'
    await resend.emails.send(options)

    toast.success('Email sent successfully, check your inbox for the email.', {
      style: 'border: 1px solid #09090b; padding: 16px; color: #09090b;',
      iconTheme: {
        primary: '#09090b',
        secondary: '#FAFAFA',
      },
    })
  } catch (err) {
    toast.error('Error sending email, please try again.')
  }
}

export { sendResendEmail }
