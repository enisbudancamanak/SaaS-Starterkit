<script lang="ts">
  import WelcomeDialogForm from '$lib/components/auth/welcome-dialog-form.svelte'
  import { enhance } from '$app/forms'
  import Background from '$lib/components/background.svelte'
  import { Button } from '$components/ui/button'
  import type { PageData } from './$types'

  export let data: PageData
</script>

<Background />

{#if data.user}
  <!-- <WelcomeDialogForm /> -->
  <h1>Profile</h1>
  <p>User id: {data.user.userId}</p>
  <p>E-Mail: {data.user.email}</p>
  <form method="post" action="?/logout" use:enhance>
    <input type="submit" value="Sign out" />
  </form>

  <Button
    variant="outline"
    href={`https://saas-starterkit.lemonsqueezy.com/checkout/buy/9aedc6cd-e1e7-43be-8362-dc24ab0fbfa5
  ?checkout[email]=${data.user.email}
  &checkout[name]=${data.user.name}`}
  >
    Click on me
  </Button>
{/if}
