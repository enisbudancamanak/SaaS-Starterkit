<script lang="ts">
  // Icons
  import SpinnerIcon from '~icons/gg/spinner'

  // UI
  import * as Form from '$lib/components/ui/form'
  import { cn } from '$lib/utils'

  // Utils
  import { resetPasswordSchema, type ResetPasswordSchema } from '$lib/schema'
  import type { SuperValidated } from 'sveltekit-superforms'
  import Label from '../ui/label/label.svelte'

  let className: string | undefined | null = undefined
  export { className as class }

  export let form: SuperValidated<ResetPasswordSchema>
  export let email: string
</script>

<div class={cn('grid gap-6', className)} {...$$restProps}>
  <!-- Form -->
  <Form.Root
    method="POST"
    {form}
    schema={resetPasswordSchema}
    let:config
    let:delayed
  >
    <Form.Field {config} name="email">
      <Form.Label>E-Mail</Form.Label>
      <Form.Item>
        <Form.Input
          type="email"
          value={email}
          disabled={true}
          class="bg-muted text-primary"
        />
        <Form.Validation />
      </Form.Item>
    </Form.Field>

    <Form.Field {config} name="password">
      <Form.Label>Password</Form.Label>
      <Form.Item>
        <Form.Input
          type="password"
          placeholder="Enter your password"
          disabled={delayed}
        />
        <Form.Validation />
      </Form.Item>
    </Form.Field>

    <Form.Field {config} name="confirm">
      <Form.Label>Confirm Password</Form.Label>
      <Form.Item>
        <Form.Input
          type="password"
          placeholder="Confirm your password"
          disabled={delayed}
        />
        <Form.Validation />
      </Form.Item>
    </Form.Field>

    <Form.Button class="w-full" disabled={delayed}>
      {#if delayed}
        <SpinnerIcon class="w-4 h-4 mr-2 animate-spin" />
      {/if}
      Continue
    </Form.Button>
  </Form.Root>
</div>
