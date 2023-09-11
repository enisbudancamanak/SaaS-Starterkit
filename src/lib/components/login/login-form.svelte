<script lang="ts">
  // Icons
  import EmailIcon from '~icons/mdi/email'

  // UI
  import SocialLogins from '../social-logins.svelte'
  import * as Form from '$lib/components/ui/form'
  import { Button } from '$lib/components/ui/button'
  import { cn } from '$lib/utils'
  import { loginSchema } from '$lib/schema'
  import Checkbox from '$lib/components/ui/checkbox/checkbox.svelte'
  import Label from '$lib/components/ui/label/label.svelte'

  // Utils
  let className: string | undefined | null = undefined
  export { className as class }

  let passwordVisible = false
  let emailContinue = false
  export let form: any
</script>

<div class={cn('grid gap-4', className)} {...$$restProps}>
  {#if !emailContinue}
    <!-- Social Login -->
    <SocialLogins />

    <!-- or -->
    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <span class="w-full border-t" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="px-2 bg-background text-muted-foreground"> or </span>
      </div>
    </div>

    <!-- Email continue button? -->
    <Button
      class="flex-1"
      variant="outline"
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
    <Form.Root method="POST" {form} schema={loginSchema} let:config>
      <Form.Field {config} name="email">
        <Form.Item>
          <Form.Label>E-Mail</Form.Label>
          <Form.Input type="email" placeholder="Enter your e-mail address" />
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
            />
            <Form.PasswordToggle bind:passwordVisible />
          </div>
          <Form.Validation />
        </Form.Item>
      </Form.Field>
      <div class="flex justify-between mb-4 -mt-1.5">
        <div class="flex items-center space-x-2">
          <Checkbox id="terms" aria-labelledby="terms-label" />
          <Label
            id="terms-label"
            for="terms"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Remember me
          </Label>
        </div>
        <a href="/password-reset" class="text-sm link"> Forgot? </a>
      </div>
      <Form.Button class="w-full">Continue</Form.Button>
    </Form.Root>
  {/if}
</div>
