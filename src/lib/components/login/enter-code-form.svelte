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

<!-- Sent to email@email.de -->
<p class="text-sm text-center text-muted-foreground">
  We've sent a temporary code to
  <small class="font-semibold"> {email} </small>
</p>

<!-- Form -->
<form use:enhance method="post" action="?/validateCode">
  <div class="grid gap-3">
    <Input
      id="code"
      placeholder="Enter login code"
      type="text"
      name="code"
      autocapitalize="none"
      autocorrect="off"
    />
    <Button class="capitalize">continue</Button>
  </div>
</form>

<!-- Wrong email? -->
<form action="?/logout" method="post" use:enhance>
  <p class="px-8 text-sm text-center text-muted-foreground">
    Wrong email?
    <button type="submit" class="underline link"> Logout </button>
  </p>
</form>
