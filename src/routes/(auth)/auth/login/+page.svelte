<script lang="ts">
  // Icons
  import RandomLogo from '~icons/fa6-solid/blog'

  // UI
  import LoginForm from '$lib/components/auth/login-form.svelte'
  import { goto } from '$app/navigation'

  // Utils
  import { superForm } from 'sveltekit-superforms/client'

  export let data
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
        Welcome back to SaaS-Kit!
      </h1>
    </div>

    <!-- Login Form -->
    <LoginForm bind:form={data.form} />

    <!-- No Account? -->
    <p class="px-8 text-sm text-center text-muted-foreground">
      Don't have an account yet?
      <button
        class="font-bold link"
        on:click={() => {
          goto('/auth/signup')
        }}
      >
        Sign up.
      </button>
    </p>
  </div>
</div>
