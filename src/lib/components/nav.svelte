<script>
  import Card from '$lib/components/card.svelte'
  import Button from '$lib/components/ui/button/button.svelte'
  import { page } from '$app/stores'
  import { cn } from '$lib/utils'
  import { Motion } from 'svelte-motion'

  const navBarItems = [
    {
      title: 'Home',
      href: '/home',
    },
    {
      title: 'Billing',
      href: '/account/billing',
    },
    {
      title: 'Pricindawdwadawdg',
      href: '/account',
    },
    {
      title: 'Lorem',
      href: '/home2',
    },
  ]
</script>

<Card style="margin: 0 auto;" glanceEffect={false} class="top-4">
  <div class="relative z-50 flex px-1 py-1 space-x-3">
    <Motion
      let:motion
      layout
      transition={{
        type: 'spring',
        stiffness: 330,
        damping: 30,
        duration: 0.6,
      }}
    >
      {#each navBarItems as item}
        <Button
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
            <div use:motion class="absolute inset-0 rounded-xl bg-foreground" />
          {/if}
          <span class="z-10 mix-blend-difference">
            {item.title}
          </span>
        </Button>
      {/each}
    </Motion>
  </div>
</Card>

<style>
  :global(.text-shadow) {
    text-shadow: rgba(0, 0, 0, 0.568) 0px 0 10px;
  }
</style>
