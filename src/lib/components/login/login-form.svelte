<script lang="ts">
  // Icons
  import EmailIcon from '~icons/mdi/email'

  // UI
  import SocialLogins from '../social-logins.svelte'
  import * as Form from '$lib/components/ui/form'
  import { Button } from '$lib/components/ui/button'
  import { cn } from '$lib/utils'
  import { loginSchema } from '$lib/schema'

  // Utils
  let className: string | undefined | null = undefined
  export { className as class }

  let emailContinue = false
  export let form: any
</script>

<div class={cn('grid gap-6', className)} {...$$restProps}>
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
      Continue with Email
    </Button>
  {/if}
  <!-- Form -->
  {#if emailContinue}
    <Form.Root method="POST" {form} schema={loginSchema} let:config>
      <Form.Field {config} name="email">
        <Form.Item>
          <Form.Input type="email" placeholder="Enter your email address" />
          <!-- <Form.Validation /> -->
        </Form.Item>
      </Form.Field>

      <Form.Field {config} name="password">
        <Form.Item>
          <Form.Input type="password" placeholder="Enter your password" />
          <!-- <Form.Validation /> -->
          <p class="text-sm text-left text-secondary-foreground">
            <a href="/password-reset">Forgot Password?</a>
          </p>
        </Form.Item>
      </Form.Field>
      <Form.Button class="w-full">Continue</Form.Button>
    </Form.Root>
  {/if}
</div>
