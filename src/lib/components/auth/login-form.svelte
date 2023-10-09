<script lang="ts">
  // Icons
  import EmailIcon from '~icons/mdi/email'
  import Spinner from '~icons/svg-spinners/180-ring-with-bg'

  // UI
  import SocialLogins from './social-logins.svelte'
  import * as Form from '$lib/components/ui/form'
  import { Button } from '$lib/components/ui/button'
  import { cn } from '$lib/utils'
  import { loginSchema } from '$lib/schema'

  // Utils
  let className: string | undefined | null = undefined
  export { className as class }

  let passwordVisible = false
  let emailContinue = false
  export let form: any
</script>

<div class={cn('grid gap-4', className)} {...$$restProps}>
  <!-- Social Login -->
  <SocialLogins />
  <!-- or -->
  <div class="relative">
    <div class="absolute inset-0 flex items-center">
      <span class="w-full border-t" />
    </div>
    <!-- <div class="relative flex justify-center text-xs uppercase">
      <span class="px-2 bg-background text-muted-foreground"> or </span>
    </div> -->
  </div>

  {#if !emailContinue}
    <!-- Email continue button? -->
    <Button
      class="flex-1"
      type="button"
      on:click={() => {
        emailContinue = true
      }}
    >
      <EmailIcon class="w-4 h-4 mr-2" />
      Continue with E-Mail
    </Button>
  {/if}
  <!-- Form -->
  {#if emailContinue}
    <Form.Root
      method="POST"
      {form}
      schema={loginSchema}
      let:config
      let:submitting
    >
      <Form.Field {config} name="email">
        <Form.Item>
          <Form.Label>E-Mail</Form.Label>
          <Form.Input
            type="email"
            placeholder="Enter your e-mail address"
            disabled={submitting}
          />
          <Form.Validation />
        </Form.Item>
      </Form.Field>

      <Form.Field {config} name="password">
        <Form.Item>
          <Form.Label>Password</Form.Label>
          <div class="relative flex">
            <Form.Input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Enter your password"
              disabled={submitting}
            />
            <Form.PasswordToggle bind:passwordVisible />
          </div>
          <Form.Validation />
        </Form.Item>
      </Form.Field>
      <div class="flex justify-between mb-4">
        <Form.Field {config} name="checkbox">
          <Form.Item class="flex space-x-1 space-y-0.5 ">
            <Form.Checkbox disabled={submitting} />
            <Form.Label class="leading-none">Remember me</Form.Label>
          </Form.Item>
        </Form.Field>
        <a href="/password-reset" class="text-sm link"> Forgot? </a>
      </div>
      <Form.Button class="w-full" disabled={submitting}>
        {#if submitting}
          <Spinner class="w-4 h-4 mr-2" />
        {/if}
        Continue
      </Form.Button>
    </Form.Root>
  {/if}
</div>
