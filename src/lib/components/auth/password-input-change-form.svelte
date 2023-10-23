<script lang="ts">
  // Icons
  import Spinner from '~icons/svg-spinners/180-ring-with-bg'

  // UI
  import * as Form from '$lib/components/ui/form'

  // Utils
  import { resetPasswordSchema, type ResetPasswordSchema } from '$lib/schema'
  import type { SuperValidated } from 'sveltekit-superforms'

  export let form: SuperValidated<ResetPasswordSchema>
  export let email: string
</script>

<!-- Form -->

<Form.Root
  method="POST"
  {form}
  schema={resetPasswordSchema}
  let:config
  let:delayed
  options={{
    validators: resetPasswordSchema,
    invalidateAll: false,
    resetForm: false,
  }}
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
      <Spinner class="w-4 h-4 mr-2" />
    {/if}
    Continue
  </Form.Button>
</Form.Root>
