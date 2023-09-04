<script lang="ts">
  // Icons
  import EmailIcon from '~icons/mdi/email'
  import GithubIcon from '~icons/mdi/github'
  import GoogleIcon from '~icons/mdi/google'

  // UI
  import { Button } from '$lib/components/ui/button'
  import { cn } from '$lib/utils'
  import { Input } from '$lib/components/ui/input'
  import { Label } from '$lib/components/ui/label'
  import { enhance } from '$app/forms'

  // Utils
  let className: string | undefined | null = undefined
  export { className as class }

  let emailContinue = false
</script>

<div class={cn('grid gap-6', className)} {...$$restProps}>
  {#if !emailContinue}
    <!-- Social Login -->
    <div class="flex w-full gap-4">
      <!-- GitHub -->
      <Button class="flex-1" variant="outline" type="button">
        <GithubIcon class="w-4 h-4 mr-2" />
        GitHub
      </Button>

      <!-- Google -->
      <Button class="flex-1" variant="outline" type="button">
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

    <!-- Email continue button? -->
    <Button
      class="flex-1"
      variant="outline"
      type="button"
      on:click={() => {
        emailContinue = true
      }}
    >
      <EmailIcon class="w-4 h-4 mr-2" />
      Continue with Email
    </Button>
  {/if}
  <!-- Form -->
  <!-- Form -->
  <!-- method="post" use:enhance -->
  {#if emailContinue}
    <form method="post" use:enhance>
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
          />
          <Input
            id="password"
            placeholder="Enter your password"
            type="password"
            name="password"
            autocapitalize="none"
            autocorrect="off"
          />
        </div>
        <Button type="submit" class="capitalize">login</Button>
      </div>
    </form>
  {/if}
</div>
