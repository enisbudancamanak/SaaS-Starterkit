<script>
  import { fade } from 'svelte/transition'
  import '../app.postcss'

  import { Toaster } from 'svelte-french-toast'
  import { onNavigate } from '$app/navigation'

  // https://svelte.dev/blog/view-transitions
  onNavigate((navigation) => {
    if (!document.startViewTransition) return

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve()
        await navigation.complete
      })
    })
  })
</script>

<Toaster />
<slot />

<style>
  :global(*) {
    font-family: 'Nunito Sans', sans-serif !important;
  }

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
