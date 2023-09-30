// import { SMTPClient } from 'emailjs'
import toast from 'svelte-french-toast'
import nodemailer from 'nodemailer'

// const client = new SMTPClient({
//   host: 'localhost',
//   port: 1025,
//   ssl: false,
// })

const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  secure: false,
})

const sendTestEmail = async (options: {
  from: string
  to: string
  subject: string
  html: string
}) => {
  try {
    options.from = 'kit@mailhog.local'
    options.to = 'enis@mailhog.local'
    await transporter.sendMail(options)

    console.log('Test email sent successfully')

    toast.success(
      'Test-Email sent successfully, check your inbox for the email.',
      {
        style: 'border: 1px solid #09090b; padding: 16px; color: #09090b;',
        iconTheme: {
          primary: '#09090b',
          secondary: '#FAFAFA',
        },
      }
    )
  } catch (e) {
    toast.error('Error sending test email, please try again.')
  }
}

export { sendTestEmail }
