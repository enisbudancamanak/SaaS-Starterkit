<script lang="ts">
  import Spinner from '~icons/svg-spinners/180-ring-with-bg'

  import { Button, buttonVariants } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import * as Form from '$lib/components/ui/form'

  import { resetPasswordSchema, type ResetPasswordSchema } from '$lib/schema'
  import type { SuperValidated } from 'sveltekit-superforms'

  export let form: SuperValidated<ResetPasswordSchema>
</script>

<h4>Password</h4>

<div>
  <Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
      Set new password
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Set new password</Dialog.Title>
        <!-- <Dialog.Description>
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description> -->
      </Dialog.Header>
      <Form.Root
        method="POST"
        {form}
        schema={resetPasswordSchema}
        let:config
        let:delayed
      >
        <div class="grid gap-3 py-3">
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
              <Spinner class="w-4 h-4 mr-2 animate-spin" />
            {/if}
            Continue
          </Form.Button>
        </div>
      </Form.Root>
      <!-- <Dialog.Footer>
        <Button type="submit">Save changes</Button>
      </Dialog.Footer> -->
    </Dialog.Content>
  </Dialog.Root>
</div>
