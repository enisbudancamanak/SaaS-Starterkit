<script lang="ts">
  import { cn } from '$lib/utils'
  import type { HTMLAttributes } from 'svelte/elements'

  type $$Props = HTMLAttributes<HTMLDivElement>
  let className: string | undefined | null = undefined
  export { className as class }
</script>

<div class={cn('space-y-1.5 mb-3', className)} {...$$restProps}>
  <slot />
</div>
