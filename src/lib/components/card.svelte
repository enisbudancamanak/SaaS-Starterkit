<script lang="ts">
  import { cn } from '$lib/utils'

  let className: $$Props['class'] = undefined
  let styling: $$Props['style'] = undefined

  export { className as class, styling as style }
</script>

<div
  style={styling}
  class={cn(
    'border card rounded-xl border-muted-foreground/20 bg-background/10',
    className
  )}
  id="card"
>
  <slot />
</div>

<style>
  :root {
    --bg-color: rgb(20, 20, 20);
    --card-color: rgb(23, 23, 23);
  }

  .card {
    height: max-content;
    position: relative;
    width: max-content;
  }
</style>
