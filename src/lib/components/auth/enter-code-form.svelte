<script>
  // Icons
  import SpinnerIcon from '~icons/gg/spinner'

  //@ts-ignore
  import SvelteOtp from '@k4ung/svelte-otp'

  let code = ''

  // UI
  import { Button } from '$lib/components/ui/button'
  import { Input } from '$lib/components/ui/input'
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
<div class="flex flex-col items-center gap-2">
  <form use:enhance method="post" action="?/validateCode">
    <div class="grid max-w-xs gap-3">
      <SvelteOtp
        wrapperClass="flex justify-center gap-2"
        inputClass="text-2xl font-semibold bg-muted-foreground/20 rounded-sm numberOnly focus:ring-2 focus:ring-secondary w-full h-16 margin-auto text-center"
        numOfInputs={6}
        numberOnly={true}
        disableDefaultStyle={true}
        bind:value={code}
      />

      <Input
        id="code"
        type="text"
        name="code"
        autocapitalize="none"
        autocorrect="off"
        class="hidden"
        bind:value={code}
      />
      <Button class="capitalize">continue</Button>
    </div>
  </form>

  <!-- Wrong email? -->
  <form action="?/resendCode" method="post" use:enhance>
    <p class="text-sm text-center text-muted-foreground">
      Didn't receive a code?
      <button type="submit" class="font-semibold link">
        Click to resend
      </button>
    </p>
  </form>
</div>

<!-- Wrong email? -->
<form action="?/logout" method="post" use:enhance>
  <p class="px-8 text-sm text-center text-muted-foreground">
    Wrong email?
    <button type="submit" class="underline link"> Logout </button>
  </p>
</form>
