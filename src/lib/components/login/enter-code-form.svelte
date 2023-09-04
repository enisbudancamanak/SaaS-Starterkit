<script>
  import SpinnerIcon from '~icons/gg/spinner'

  import { Button } from '$lib/components/ui/button'
  import { Input } from '$lib/components/ui/input'
  import { Label } from '$lib/components/ui/label'
  import { goto } from '$app/navigation'

  let isLoading = false
  async function onSubmit() {
    isLoading = true

    setTimeout(() => {
      isLoading = false
      goto('/home')
    }, 1000)
  }
</script>

<!-- Form -->
<form on:submit|preventDefault={onSubmit}>
  <div class="grid gap-4">
    <p class="text-sm text-center text-muted-foreground">
      We've sent a temporary code to
      <small class="underline"> example@example.com </small>
    </p>
    <div class="grid gap-1">
      <Label class="sr-only" for="email">Email</Label>
      <Input
        id="email"
        placeholder="Enter login code"
        type="email"
        autocapitalize="none"
        autocomplete="email"
        autocorrect="off"
        disabled={isLoading}
      />
    </div>
    <Button class="capitalize" disabled={isLoading}>
      {#if isLoading}
        <SpinnerIcon class="w-4 h-4 mr-2 animate-spin" />
      {/if}
      continue
    </Button>
  </div>
</form>
