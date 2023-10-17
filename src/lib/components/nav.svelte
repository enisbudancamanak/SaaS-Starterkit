<script lang="ts">
  import Card from '$lib/components/cardGlance.svelte'
  import Button from '$lib/components/ui/button/button.svelte'
  import { crossfade } from 'svelte/transition'
  import { page } from '$app/stores'
  import { cn } from '$lib/utils'

  const [send, receive] = crossfade({
    duration: 300,
  })

  const navBarItems = [
    {
      title: 'Home',
      href: '/home',
    },
    {
      title: 'Billing',
      href: '/settings/account/billing',
    },
    {
      title: 'Pricindawdwadawdg',
      href: '/settings/account',
    },
    {
      title: 'Dashboard',
      href: '/dashboard',
    },
  ]
</script>

<Card style="" glanceEffect={false}>
  <div class="relative z-50 flex px-1 py-1 space-x-3">
    {#each navBarItems as item}
      <Button
        data-sveltekit-preload-data="hover"
        href={item.href}
        variant="none"
        class={cn(
          $page.url.pathname === item.href
            ? 'pointer-events-none dark:text-foreground text-background'
            : '',
          'relative'
        )}
      >
        {#if $page.url.pathname === item.href}
          <div
            in:receive={{ key: 'bg-active' }}
            out:send={{ key: 'bg-active' }}
            class="absolute inset-0 rounded-xl bg-foreground"
          />
        {/if}
        <span class="z-10 mix-blend-difference">
          {item.title}
        </span>
      </Button>
    {/each}
  </div>
</Card>

<style>
  :global(.text-shadow) {
    text-shadow: rgba(0, 0, 0, 0.568) 0px 0 10px;
  }
</style>
