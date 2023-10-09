<script lang="ts">
  import { cn } from '$lib/utils'
  import { page } from '$app/stores'
  import { Button } from '$lib/components/ui/button'
  import { crossfade } from 'svelte/transition'
  let className: string | undefined | null = undefined
  export let items: { icon: any; href: string; title: string }[]
  export { className as class }

  const [send, receive] = crossfade({
    duration: 300,
  })
</script>

<nav
  class={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)}
>
  {#each items as item}
    <Button
      href={item.href}
      variant="none"
      class={cn(
        $page.url.pathname === item.href
          ? 'pointer-events-none dark:text-foreground text-background'
          : '',
        'relative justify-start text-base'
      )}
    >
      {#if $page.url.pathname === item.href}
        <div
          in:receive={{ key: 'bg-active' }}
          out:send={{ key: 'bg-active' }}
          class="absolute inset-0 rounded-xl bg-foreground"
        />
      {/if}
      <span class="z-10 flex items-center gap-1 mix-blend-difference">
        <svelte:component this={item.icon} />
        {item.title}
      </span>
    </Button>
  {/each}
</nav>
