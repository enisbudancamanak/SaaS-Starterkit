<script lang="ts">
  import { cn } from '$lib/utils'
  import Card from '../card.svelte'

  let className: $$Props['class'] = undefined
  let styling: $$Props['style'] = undefined

  export { className as class, styling as style }
</script>

<Card
  style={styling}
  class={cn(
    '!w-full !h-full p-4 bg-accent shadow-inner hover:shadow-accent/40 transition-all duration-200',
    className
  )}
>
  <slot />
</Card>
