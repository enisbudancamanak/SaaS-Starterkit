<script lang="ts">
  // Icons
  import SpinnerIcon from '~icons/svg-spinners/180-ring-with-bg'

  //@ts-ignore
  import SvelteOtp from '@k4ung/svelte-otp'

  // UI
  import { Button } from '$lib/components/ui/button'
  import { Input } from '$lib/components/ui/input'
  import { enhance } from '$app/forms'

  export let email: String | undefined
  let submitting: boolean = false
  let code: String = ''
</script>

<!-- Sent to email@email.de -->
<p class="text-sm text-center text-muted-foreground">
  We've sent a temporary code to
  <small class="font-semibold"> {email} </small>
</p>

<!-- Form -->
<div class="flex flex-col items-center gap-2">
  <form
    use:enhance={() => {
      submitting = true
      return async ({ result, update }) => {
        if (result.type === 'failure') submitting = false
        update({ reset: false })
      }
    }}
    method="post"
    action="?/validateCode"
  >
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
        type="text"
        name="code"
        autocapitalize="none"
        autocorrect="off"
        bind:value={code}
        class="hidden"
      />
      <Button class="capitalize" disabled={submitting}>
        {#if submitting}
          <SpinnerIcon class="w-6 h-6 mr-2" />
        {/if}
        continue</Button
      >
    </div>
  </form>

  <!-- No code received? -->
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
