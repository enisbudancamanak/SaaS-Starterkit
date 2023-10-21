<script lang="ts">
  // Icons
  import RandomLogo from '~icons/fa6-solid/blog'

  // UI
  import EnterCodeForm from '$lib/components/auth/enter-code-form.svelte'
  import SignupForm from '$lib/components/auth/signup-form.svelte'
  import { goto } from '$app/navigation'
  // import type { PageData } from './$types'

  export let data: any
</script>

<div
  class="relative z-50 grid flex-col items-center justify-center lg:max-w-none lg:px-0"
>
  <div
    class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]"
  >
    <!-- Logo Section -->
    <div class="flex flex-col items-center justify-center w-full gap-4">
      <RandomLogo class="w-12 h-12" />
      <h1 class="mb-6 text-3xl font-bold tracking-tight text-center">
        Join SaaS-Kit!
      </h1>
    </div>

    <!-- Login Form -->
    {#if !data?.session?.user?.email && !data?.session?.user?.email_verified}
      <SignupForm form={data.form} />
    {:else if !data?.session?.user?.email_verified}
      <EnterCodeForm email={data?.session?.user?.email} />
    {/if}
  </div>

  <p class="px-8 text-sm text-center text-muted-foreground">
    Already have an Account?
    <button
      class="font-bold link"
      on:click={() => {
        goto('/auth/login')
      }}
    >
      Login.
    </button>
  </p>
</div>
