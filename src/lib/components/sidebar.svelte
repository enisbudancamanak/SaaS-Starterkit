<script lang="ts">
  import { cn } from '$lib/utils'
  import { page } from '$app/stores'
  import { Button } from '$lib/components/ui/button'
  let className: string | undefined | null = undefined
  export let items: { icon: any; href: string; title: string }[]
  export { className as class }
</script>

<nav
  class={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)}
>
  {#each items as item}
    <Button
      href={item.href}
      variant="ghost"
      class={cn(
        $page.url.pathname === item.href
          ? 'bg-muted hover:bg-muted'
          : 'hover:bg-accent/40',
        'justify-start gap-1 items-center text-base'
      )}
    >
      <svelte:component this={item.icon} />
      {item.title}
    </Button>
  {/each}
</nav>
