<script lang="ts">
  // Icons
  import SpinnerIcon from '~icons/gg/spinner'

  // UI
  import SocialLogins from '../social-logins.svelte'
  import toast from 'svelte-french-toast'
  import * as Form from '$lib/components/ui/form'
  import { cn } from '$lib/utils'

  // Utils
  import { newUserSchema } from '$lib/schema'

  let className: string | undefined | null = undefined
  export { className as class }

  export let clickedContinue

  let isLoading = false
  async function onSubmit() {
    console.log(errors)

    isLoading = true

    setTimeout(() => {
      isLoading = false
      clickedContinue = true

      toast.success('email sent', {
        style: 'border: 1px solid #09090b; padding: 16px; color: #09090b;',
        iconTheme: {
          primary: '#09090b',
          secondary: '#FAFAFA',
        },
      })
    }, 1000)
  }

  export let form: any
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
  <Form.Root
    method="POST"
    action="/signup"
    {form}
    schema={newUserSchema}
    let:config
  >
    <Form.Field {config} name="email">
      <Form.Item>
        <Form.Input
          type="email"
          placeholder="Enter your email address"
          disabled={isLoading}
        />
        <Form.Validation />
      </Form.Item>
    </Form.Field>

    <Form.Field {config} name="password">
      <Form.Item>
        <Form.Input
          type="password"
          placeholder="Enter your password"
          disabled={isLoading}
        />
        <Form.Validation />
      </Form.Item>
    </Form.Field>
    <Form.Button class="w-full">
      {#if isLoading}
        <SpinnerIcon class="w-4 h-4 mr-2 animate-spin" />
      {/if}
      Continue
    </Form.Button>
  </Form.Root>
</div>
