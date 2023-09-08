<script lang="ts">
  // Icons
  import SpinnerIcon from '~icons/gg/spinner'

  // UI
  import * as Form from '$lib/components/ui/form'
  import SocialLogins from '../social-logins.svelte'
  import PasswordStrength from '../passwordStrength.svelte'
  import { cn } from '$lib/utils'

  // Utils
  import { newUserSchema, type FormSchema } from '$lib/schema'
  import type { SuperValidated } from 'sveltekit-superforms'

  let className: string | undefined | null = undefined
  export { className as class }

  export let form: SuperValidated<FormSchema>
  let password: string = ''
</script>

<div class={cn('grid gap-6', className)} {...$$restProps}>
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

  <!-- Form -->
  <Form.Root method="POST" {form} schema={newUserSchema} let:config>
    <Form.Field {config} name="email">
      <Form.Item>
        <Form.Input type="email" placeholder="Enter your email address" />
        <Form.Validation />
      </Form.Item>
    </Form.Field>

    <Form.Field {config} name="password">
      <Form.Item>
        <Form.Input type="password" placeholder="Enter your password" />
        <Form.Validation />
        <!-- <PasswordStrength {password} /> -->
      </Form.Item>
    </Form.Field>
    <Form.Button class="w-full">Continue</Form.Button>
  </Form.Root>
</div>
