<script lang="ts">
  // @ts-nocheck because of the form config unfortunaetly
  import Pencil from '~icons/lucide/pencil'
  import Spinner from '~icons/svg-spinners/180-ring-with-bg'

  import { Button } from '$lib/components/ui/button'
  import * as Sheet from '$lib/components/ui/sheet'
  import * as Form from '$lib/components/ui/form'

  import { resetPasswordSchema, type ResetPasswordSchema } from '$lib/schema'
  import type { SuperValidated } from 'sveltekit-superforms'

  let openSheet = false
  export let form: SuperValidated<ResetPasswordSchema>
</script>

<h4>Password</h4>

<div>
  <!-- Edit Button => open Sheet -->
  <Sheet.Root bind:open={openSheet}>
    <Sheet.Trigger asChild let:builder>
      <Button builders={[builder]} variant="outline" size="sm">
        <Pencil class="w-4 h-4 mr-2" />
        Set new password
      </Button>
    </Sheet.Trigger>
    <Sheet.Content side="right">
      <Sheet.Header>
        <Sheet.Title>Edit password</Sheet.Title>
        <Sheet.Description>
          Make changes to your password here. Click save when you're done.
        </Sheet.Description>
      </Sheet.Header>

      <Form.Root
        method="POST"
        {form}
        action="?/updatePassword"
        schema={resetPasswordSchema}
        let:config
        let:submitting
        options={{
          validators: resetPasswordSchema,
          onUpdated: (e) => {
            // do something
            if (e.form.valid) {
              // close sheet on form success
              openSheet = false
            }
          },
        }}
      >
        <div class="grid">
          <Form.Field {config} name="current">
            <Form.Item>
              <Form.Label>Current Password</Form.Label>
              <Form.Input
                type="password"
                placeholder="Enter your current password"
                disabled={submitting}
              />
              <Form.Validation />
            </Form.Item>
          </Form.Field>
          <Form.Field {config} name="password">
            <Form.Item>
              <Form.Label>Password</Form.Label>
              <Form.Input
                type="password"
                placeholder="Enter your password"
                disabled={submitting}
              />
              <Form.Validation />
            </Form.Item>
          </Form.Field>

          <Form.Field {config} name="confirm">
            <Form.Item>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Input
                type="password"
                placeholder="Confirm your password"
                disabled={submitting}
              />
              <Form.Validation />
            </Form.Item>
          </Form.Field>

          <Form.Button type="submit">
            {#if submitting}
              <Spinner class="w-4 h-4 mr-2" />
            {/if}
            Save changes</Form.Button
          >
        </div>
      </Form.Root>
    </Sheet.Content>
  </Sheet.Root>
</div>
