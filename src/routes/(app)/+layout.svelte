<script lang="ts">
  import Nav from '$lib/components/nav.svelte'
  import ProfileMenu from '$lib/components/profileMenu.svelte'
  // import ThemeSwitch from '$lib/components/themeSwitch.svelte'
  import type { PageData } from '../$types'

  export let data: PageData
</script>

<nav class="relative flex items-center w-full px-12 pb-4 top-4">
  <!-- Left Navigation -->
  <div class="flex justify-center flex-1 mr-auto" />
  <!-- Logo -->
  <Nav />
  <!-- Right Navigation -->
  <div class="flex justify-end flex-1 ml-auto">
    <ProfileMenu user={data.user} />
  </div>
</nav>

<slot />
<!-- </div> -->
