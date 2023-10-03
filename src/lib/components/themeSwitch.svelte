<script lang="ts">
  import { browser } from '$app/environment'
  import { Button } from '$lib/components/ui/button'

  // icons
  import SunIcon from '~icons/mdi/white-balance-sunny'
  import MoonIcon from '~icons/mdi/moon-waning-crescent'

  let darkMode = localStorage.getItem('dark-mode')
    ? localStorage.getItem('dark-mode')
    : window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'enabled'
    : 'disabled'

  const enableDarkMode = () => {
    document.documentElement.classList.add('dark')
    localStorage.setItem('dark-mode', 'enabled')
  }

  const disableDarkMode = () => {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('dark-mode', 'disabled')
  }

  if (darkMode === 'enabled') {
    enableDarkMode() // set state of darkMode on page load
  } else if (darkMode === 'disabled') {
    disableDarkMode()
  }

  function handleSwitchDarkMode() {
    darkMode = localStorage.getItem('dark-mode') as string
    if (darkMode === 'disabled') {
      enableDarkMode()
    } else {
      disableDarkMode()
    }
  }

  // if (browser) {
  //   // LocalStorage
  //   if (localStorage.getItem('darkMode') === null) {
  //     localStorage.setItem('darkMode', darkMode.toString())
  //   } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  //     document.documentElement.classList.add('dark')
  //     darkMode = true
  //   } else {
  //     document.documentElement.classList.remove('dark')
  //     darkMode = false
  //   }
  // }
</script>

<Button
  on:click={handleSwitchDarkMode}
  class="flex items-center justify-center w-full"
>
  {#if darkMode === 'enabled'}
    <SunIcon class="absolute w-5 h-5" />
  {:else}
    <MoonIcon class="absolute w-5 h-5 " />
  {/if}
</Button>
