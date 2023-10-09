<script lang="ts">
  import '../fonts.css'
  import '../app.postcss'

  // import CookieConsent from '$lib/components/cookieConsent.svelte'
  import toast, { Toaster } from 'svelte-french-toast'
  import { beforeNavigate, onNavigate } from '$app/navigation'
  import { page } from '$app/stores'
  import { initFlash } from 'sveltekit-flash-message/client'
  import { initThemeValue, getThemeValue } from '$lib/themeSwitchHandler'
  import { onMount } from 'svelte'

  onMount(() => {
    getThemeValue()
  })

  // https://svelte.dev/blog/view-transitions
  onNavigate((navigation) => {
    // @ts-ignore
    if (!document.startViewTransition) return

    return new Promise((resolve) => {
      // @ts-ignore
      document.startViewTransition(async () => {
        resolve()
        await navigation.complete
      })
    })
  })

  //Flash Messages
  // https://www.youtube.com/watch?v=hB6OkaYWS5I
  const flash = initFlash(page)

  beforeNavigate((nav) => {
    if ($flash && nav.from?.url.toString() !== nav.to?.url.toString())
      $flash = undefined
  })

  $: if ($flash) {
    switch ($flash.type) {
      case 'success':
        toast.success($flash.message, {
          style: 'padding: 12px; color: #09090b;',
          iconTheme: {
            primary: '#09090b',
            secondary: '#FAFAFA',
          },
        })
        break
      case 'error':
        toast.error($flash.message, {
          style: 'padding: 12px; color: #09090b;',
        })
        break
    }
  }
</script>

<!-- init themeChange -->
<svelte:head>
  {@html `<\u{73}cript nonce="%sveltekit.nonce%">(${initThemeValue.toString()})();</script>`}
</svelte:head>

<!-- <CookieConsent /> -->
<Toaster position="bottom-right" />
<slot />

<style>
  @keyframes fade-in {
    from {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion) {
    ::view-transition-group(*),
    ::view-transition-old(*),
    ::view-transition-new(*) {
      animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in;
    }
  }
</style>
