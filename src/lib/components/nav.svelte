<script>
  import Card from '$lib/components/card.svelte'
  import Button from '$lib/components/ui/button/button.svelte'
  import { page } from '$app/stores'
  import { cn } from '$lib/utils'

  const navBarItems = [
    {
      title: 'Home',
      href: '/home',
    },
    {
      title: 'Billing',
      href: '/billing',
    },
    {
      title: 'Pricing',
      href: '/pricing',
    },
  ]
</script>

<Card style="margin: 0 auto;" glanceEffect={false} class="top-4">
  <div class="relative z-50 flex px-1 py-1 space-x-3">
    {#each navBarItems as item}
      <Button
        href={item.href}
        variant="none"
        class={cn(
          $page.url.pathname === item.href
            ? 'bg-foreground/10 cursor-default hover:text-foreground text-shadow'
            : 'text-muted-foreground hover:text-foreground',
          ''
        )}>{item.title}</Button
      >
    {/each}
  </div>
</Card>

<style>
  :global(.text-shadow) {
    text-shadow: rgba(0, 0, 0, 0.568) 0px 0 10px;
  }
</style>
