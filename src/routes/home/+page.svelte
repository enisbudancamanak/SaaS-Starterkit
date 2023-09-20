<script lang="ts">
  import WelcomeDialogForm from '$lib/components/login/welcome-dialog-form.svelte'
  import { enhance } from '$app/forms'

  export let data
</script>

{#if data.email}
  <!-- <WelcomeDialogForm /> -->
  <h1>Profile</h1>
  <p>User id: {data?.userId}</p>
  <p>E-Mail: {data?.email}</p>
  <form method="post" action="?/logout" use:enhance>
    <input type="submit" value="Sign out" />
  </form>
{/if}
