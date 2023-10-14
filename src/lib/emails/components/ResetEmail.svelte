<script lang="ts">
  import {
    Button,
    Hr,
    Html,
    Text,
    Heading,
    Head,
    Section,
    Preview,
    Container,
    Img,
  } from 'svelte-email'

  export let token = ''
  export let oldEmail = ''
  export let newEmail = ''

  const fontFamily =
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'

  const main = {
    backgroundColor: '#ffffff',
  }

  const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
  }

  const loginButton = {
    backgroundColor: '#007bff',
    color: '#ffffff',
    borderRadius: '4px',
    padding: '12px 24px',
    textDecoration: 'none' as const,
    display: 'inline-block',
    margin: '0 auto',
    fontFamily,
    fontSize: '16px',
    fontWeight: 'bold' as const,
  }

  const codeBlock = {
    margin: '0 auto',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    padding: '14px',
    textAlign: 'center' as const,
  }

  const paragraph = {
    fontFamily,
    fontSize: '16px',
  }

  const codeFont = {
    fontFamily,
    fontSize: '26px',
    fontWeight: '600' as const,
  }

  const heading = {
    fontFamily,
    fontSize: '28px',
    fontWeight: 'bold' as const,
    paddingBottom: '20px',
  }

  const hr = {
    borderColor: '#cccccc',
    margin: '20px 0',
  }
</script>

<!-- https://svelte-email.vercel.app/docs/components/HTML -->

<Html lang="en">
  <Head />
  <Preview preview="Welcome to svelte-email" />
  <Section style={main}>
    <Container style={container}>
      <Text style={heading}>Confirm Change of Email</Text>

      <Text
        >You are about to change your email from {oldEmail} to {newEmail}</Text
      >
      <Button
        href={`http://localhost:5173/email-reset/${token}`}
        style={loginButton}>Click to confirm</Button
      >

      <Text
        >If you did not make this request, you can safely ignore this email.</Text
      >
    </Container>
  </Section>
  <Hr />
</Html>
