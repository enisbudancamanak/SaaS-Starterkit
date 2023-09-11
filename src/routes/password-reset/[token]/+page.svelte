<script lang="ts">
  // Icons
  import RandomLogo from '~icons/fa6-solid/blog'

  // UI
  import type { PageData } from './$types'
  import PasswordInputChangeForm from '$lib/components/login/password-input-change-form.svelte'

  export let data: PageData
</script>

<div
  class="relative grid flex-col items-center justify-center w-screen h-screen lg:max-w-none lg:grid-cols-2 lg:px-0"
>
  <div class="lg:p-8">
    <div
      class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]"
    >
      <!-- Logo Section -->
      <div class="flex flex-col items-center justify-center w-full gap-4">
        <RandomLogo class="w-12 h-12 -mt-6" />
        <h1 class="mb-6 text-3xl font-bold tracking-tight text-center">
          Create new Password
        </h1>
      </div>

      <!-- Sent to email@email.de -->
      <p class="text-sm text-center text-muted-foreground">
        Please enter your new password.
      </p>

      <!-- Form -->
      <PasswordInputChangeForm bind:form={data.form} email={data.email} />
    </div>
  </div>

  <!-- Right Side (Image) -->
  <div
    class="relative flex-col hidden h-full p-10 text-white border-l bg-muted dark:border-r lg:flex"
  >
    <div
      class="absolute inset-0 bg-center bg-cover"
      style="background-image: url(https://cdn.dribbble.com/users/3762679/screenshots/14867090/media/43b491c373fc23c8cea7fc9f998f9911.png?resize=1200x900&vertical=center);"
    />
  </div>
</div>
