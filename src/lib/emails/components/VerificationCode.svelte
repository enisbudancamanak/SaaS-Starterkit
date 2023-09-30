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

  export let code = ''
  export let token = ''

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
      <!-- <Img
        src="https://svelte.dev/svelte-logo-horizontal.svg"
        alt="Svelte logo"
        style={logo}
        width="200"
        height="50"
      /> -->
      <Text style={heading}>Complete your registration</Text>

      <Button
        href={`http://localhost:5173/email-verification/${token}`}
        style={loginButton}>Click me to login</Button
      >

      <Hr style={hr} />

      <Text style={paragraph}
        >or enter the code into the registration input field to complete the
        registration</Text
      >
      <Container style={codeBlock}>
        <Text style={codeFont}>{code}</Text>
      </Container>
    </Container>
  </Section>
  <Hr />
</Html>
