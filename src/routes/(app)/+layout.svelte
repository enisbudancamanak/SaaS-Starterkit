<script>
  import Nav from '$lib/components/nav.svelte'
  import ProfileMenu from '$lib/components/profileMenu.svelte'
  import ThemeSwitch from '$lib/components/themeSwitch.svelte'
</script>

<Nav />
<div class="absolute top-4 right-4">
  <div class="flex items-center justify-center space-x-2">
    <ProfileMenu />
    <ThemeSwitch />
  </div>
</div>

<slot />
