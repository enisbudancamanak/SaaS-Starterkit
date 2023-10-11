<script lang="ts">
  import { cn } from '$lib/utils'
  import { page } from '$app/stores'
  import { Button } from '$lib/components/ui/button'
  import { crossfade } from 'svelte/transition'
  let className: string | undefined | null = undefined
  export let navItems: {
    title: string | null
    items: { icon: any; href: string; title: string }[]
  }[]
  export { className as class }

  const [send, receive] = crossfade({
    duration: 300,
  })
</script>

<nav
  class={cn(
    'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1.5',
    className
  )}
>
  {#each navItems as element, i}
    {#if element.title}
      <h3
        class={`text-sm font-extralight text-foreground/80 ${
          i > 0 ? 'pt-3' : ''
        }`}
      >
        {element.title}
      </h3>
    {/if}
    {#each element.items as item}
      <Button
        href={item.href}
        variant="none"
        class={cn(
          $page.url.pathname === item.href
            ? 'pointer-events-none !text-foreground !font-medium '
            : 'font-light text-foreground/90',
          'relative justify-start text-base  transition-all duration-300'
        )}
      >
        {#if $page.url.pathname === item.href}
          <div
            in:receive={{ key: 'bg-active' }}
            out:send={{ key: 'bg-active' }}
            class="absolute inset-0 transition-all duration-200 border shadow-inner rounded-xl hover:shadow-accent/40 hover:bg-accent/40 card border-muted-foreground/20 bg-accent"
          />
        {/if}
        <span class="z-10 flex items-center gap-1.5">
          <svelte:component this={item.icon} />
          {item.title}
        </span>
      </Button>
    {/each}
  {/each}
</nav>
