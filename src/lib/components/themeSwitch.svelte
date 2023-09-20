<script lang="ts">
  import { browser } from '$app/environment'
  import { Button } from '$lib/components/ui/button'

  // icons
  import SunIcon from '~icons/mdi/white-balance-sunny'
  import MoonIcon from '~icons/mdi/moon-waning-crescent'

  let darkMode = true

  function handleSwitchDarkMode() {
    darkMode = !darkMode

    darkMode
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark')
  }

  if (browser) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark')
      darkMode = true
    } else {
      document.documentElement.classList.remove('dark')
      darkMode = false
    }
  }
</script>

<div class="absolute z-50 top-2 right-2">
  <Button on:click={handleSwitchDarkMode} class="w-8 h-8 ">
    {#if darkMode}
      <SunIcon class="absolute w-5 h-5" />
    {:else}
      <MoonIcon class="absolute w-5 h-5 " />
    {/if}
  </Button>
</div>
