<script lang="ts">
  // Icons
  import Spinner from '~icons/svg-spinners/180-ring-with-bg'

  // UI
  import * as Form from '$lib/components/ui/form'
  import SocialLogins from './social-logins.svelte'
  import { cn } from '$lib/utils'

  // Utils
  import { newUserSchema, type FormSchema } from '$lib/schema'
  import type { SuperValidated } from 'sveltekit-superforms'

  let className: string | undefined | null = undefined
  export { className as class }

  let passwordVisible = false
  export let form: SuperValidated<FormSchema>
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

  <!-- Form -->
  <Form.Root
    method="POST"
    {form}
    schema={newUserSchema}
    let:config
    let:submitting
  >
    <div class="flex flex-1 gap-4">
      <Form.Field {config} name="name">
        <Form.Item class="flex-1">
          <Form.Label>Name</Form.Label>
          <Form.Input
            type="text"
            placeholder="Enter your full name"
            disabled={submitting}
          />
          <Form.Validation />
        </Form.Item>
      </Form.Field>

      <Form.Field {config} name="email">
        <Form.Item class="flex-1">
          <Form.Label>E-Mail</Form.Label>
          <Form.Input
            type="email"
            placeholder="Enter your e-mail address"
            disabled={submitting}
          />
          <Form.Validation />
        </Form.Item>
      </Form.Field>
    </div>

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
        <!-- <PasswordStrength {password} /> -->
      </Form.Item>
    </Form.Field>
    <Form.Button class="w-full" disabled={submitting}>
      {#if submitting}
        <Spinner class="w-4 h-4 mr-2" />
      {/if}
      Continue
    </Form.Button>
  </Form.Root>
</div>
