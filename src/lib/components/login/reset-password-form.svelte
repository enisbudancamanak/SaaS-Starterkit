<script lang="ts">
  // Icons
  import SpinnerIcon from '~icons/gg/spinner'

  // UI
  import * as Form from '$lib/components/ui/form'

  import { cn } from '$lib/utils'

  // Utils
  import { enterEmailSchema, type EnterEmailSchema } from '$lib/schema'
  import type { SuperValidated } from 'sveltekit-superforms'

  let className: string | undefined | null = undefined
  export { className as class }

  export let form: SuperValidated<EnterEmailSchema>
</script>

<div class={cn('grid gap-6', className)} {...$$restProps}>
  <!-- Form -->
  <Form.Root
    method="POST"
    {form}
    schema={enterEmailSchema}
    let:config
    let:delayed
  >
    <Form.Field {config} name="email">
      <Form.Item>
        <Form.Input
          type="email"
          placeholder="Enter your e-mail address"
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
