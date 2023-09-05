<script lang="ts">
  // Icons
  import GithubIcon from '~icons/mdi/github'
  import GoogleIcon from '~icons/mdi/google'
  import SpinnerIcon from '~icons/gg/spinner'

  // UI
  import toast from 'svelte-french-toast'
  import { Button } from '$lib/components/ui/button'
  import { Input } from '$lib/components/ui/input'
  import { Label } from '$lib/components/ui/label'
  import { cn } from '$lib/utils'

  // Utils
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

  export let form: any, errors: any, enhance: any, constraints: any
</script>

<div class={cn('grid gap-6', className)} {...$$restProps}>
  <!-- Social Login -->
  <div class="flex w-full gap-4">
    <!-- GitHub -->
    <Button class="flex-1" variant="outline" type="button" disabled={isLoading}>
      <GithubIcon class="w-4 h-4 mr-2" />
      GitHub
    </Button>

    <!-- Google -->
    <Button class="flex-1" variant="outline" type="button" disabled={isLoading}>
      <GoogleIcon class="w-4 h-4 mr-2" />
      Google
    </Button>
  </div>

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
  <form use:enhance method="post" on:submit={onSubmit}>
    <div class="grid gap-4">
      <div class="grid gap-2.5">
        <Label class="sr-only" for="email">Email</Label>
        <Input
          id="email"
          placeholder="Enter your email address"
          type="email"
          name="email"
          autocapitalize="none"
          autocomplete="email"
          autocorrect="off"
          disabled={isLoading}
          bind:value={form.email}
          {...constraints.email}
        />
        {#if errors.email}
          <small>
            {errors.email}
          </small>
        {/if}
        <Input
          id="password"
          placeholder="Enter your password"
          type="password"
          name="password"
          autocapitalize="none"
          autocorrect="off"
          disabled={isLoading}
          bind:value={form.password}
          {...constraints.password}
        />
        {#if errors.password}
          <small>
            {errors.password}
          </small>
        {/if}
      </div>
      <Button type="submit" class="capitalize" disabled={isLoading}>
        {#if isLoading}
          <SpinnerIcon class="w-4 h-4 mr-2 animate-spin" />
        {/if}
        continue
      </Button>
    </div>
  </form>
</div>
