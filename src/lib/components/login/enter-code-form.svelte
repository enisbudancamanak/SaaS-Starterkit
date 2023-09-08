<script>
  // Icons
  import SpinnerIcon from '~icons/gg/spinner'

  // UI
  import * as Form from '$lib/components/ui/form'
  import { Button } from '$lib/components/ui/button'
  import { Input } from '$lib/components/ui/input'
  import { goto } from '$app/navigation'
  import { enhance } from '$app/forms'

  // Utils
  // let isLoading = false
  // async function onSubmit() {
  //   isLoading = true

  //   setTimeout(() => {
  //     isLoading = false
  //     goto('/home')
  //   }, 1000)
  // }

  export let email = ''
</script>

<!-- Form -->
<form use:enhance method="post" action="?/validateCode">
  <div class="grid gap-4">
    <p class="text-sm text-center text-muted-foreground">
      We've sent a temporary code to
      <small class="underline"> {email} </small>
    </p>
    <div class="grid gap-1">
      <Input
        id="code"
        placeholder="Enter login code"
        type="text"
        name="code"
        autocapitalize="none"
        autocorrect="off"
      />
    </div>
    <Button class="capitalize">continue</Button>
  </div>
</form>
