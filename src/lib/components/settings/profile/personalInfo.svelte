<script lang="ts">
  // Icons
  import Pencil from '~icons/lucide/pencil'
  import Spinner from '~icons/svg-spinners/180-ring-with-bg'

  // Components
  import { Button } from '$lib/components/ui/button'
  import * as Sheet from '$lib/components/ui/sheet'
  import * as Form from '$lib/components/ui/form'

  // Schemas
  import {
    updateProfileDetailsSchema,
    type UpdateProfileDetailsSchema,
  } from '$lib/schema'
  import type { SuperValidated } from 'sveltekit-superforms'

  let openSheet = false

  export let form: SuperValidated<UpdateProfileDetailsSchema>
  export let user: any
</script>

<div class="flex items-center justify-between">
  <h4>Personal Info</h4>

  <!-- Edit Button => open Sheet -->
  <Sheet.Root bind:open={openSheet}>
    <Sheet.Trigger asChild let:builder>
      <Button builders={[builder]} variant="outline" size="sm">
        <Pencil class="w-4 h-4 mr-2" />
        Edit
      </Button>
    </Sheet.Trigger>
    <Sheet.Content side="right">
      <Sheet.Header>
        <Sheet.Title>Edit profile</Sheet.Title>
        <Sheet.Description>
          Make changes to your profile here. Click save when you're done.
        </Sheet.Description>
      </Sheet.Header>

      <Form.Root
        method="POST"
        {form}
        action="?/updateProfileDetails"
        schema={updateProfileDetailsSchema}
        let:config
        let:submitting
        options={{
          validators: updateProfileDetailsSchema,
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
          <Form.Field {config} name="name">
            <Form.Item>
              <Form.Label>Name</Form.Label>
              <Form.Input
                type="text"
                placeholder="Enter your full name"
                disabled={false}
              />
              <Form.Validation />
            </Form.Item>
          </Form.Field>

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

          <Form.Button type="submit">
            {#if submitting}
              <Spinner class="w-4 h-4 mr-2" />
            {/if}
            Save changes
          </Form.Button>
        </div>
      </Form.Root>
    </Sheet.Content>
  </Sheet.Root>
</div>

<!-- Listing of Informations -->
<div class="flex gap-8">
  <div class="flex flex-col gap-1">
    <span class="text-accent-foreground">Name</span>
    <span class="font-semibold">{user.name}</span>
  </div>
  <div class="flex flex-col gap-1">
    <span class="text-accent-foreground">Email</span>
    <span class="font-semibold">{user.email}</span>
  </div>
</div>
