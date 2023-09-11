<script lang="ts">
  import { cn } from '$lib/utils'
  import type { HTMLAttributes } from 'svelte/elements'
  import type { HeadingLevel } from '.'

  type $$Props = HTMLAttributes<HTMLHeadingElement> & {
    level?: HeadingLevel
  }

  let className: $$Props['class'] = undefined
  export let level: $$Props['level'] = 'h5'
  export { className as class }
</script>

<svelte:element
  this={level}
  class={cn(
    'font-medium text-sm leading-none tracking-tight flex items-center',
    className
  )}
  {...$$restProps}
>
  <slot />
</svelte:element>
