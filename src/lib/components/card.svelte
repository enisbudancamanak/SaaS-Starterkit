<script lang="ts">
  import { onMount } from 'svelte'
  import { cn } from '$lib/utils'
  import type { HTMLAttributes } from 'svelte/elements'

  type $$Props = HTMLAttributes<HTMLDivElement> & {
    glanceEffect?: boolean
  }

  let className: $$Props['class'] = undefined
  let styling: $$Props['style'] = undefined

  export let glanceEffect: $$Props['glanceEffect'] = true
  export { className as class, styling as style }

  onMount(() => {
    if (glanceEffect) {
      const card = document.getElementById('card') as HTMLDivElement

      card.onmousemove = (e) => {
        const rect = card.getBoundingClientRect(),
          x = e.clientX - rect.left,
          y = e.clientY - rect.top

        card.style.setProperty('--mouse-x', `${x}px`)
        card.style.setProperty('--mouse-y', `${y}px`)
      }
    }
  })
</script>

<div
  style={styling}
  class={cn(
    'border card border-muted-foreground/20 bg-background/10',
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

    box-shadow: 0 8px 32px 0 #3c459a32;
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: var(--radius);
  }

  .card:hover::before {
    opacity: 1;
  }

  .card::before,
  .card::after {
    border-radius: inherit;
    content: '';
    height: 100%;
    left: 0px;
    opacity: 0;
    position: absolute;
    top: 0px;
    transition: opacity 500ms;
    width: 100%;
  }

  .card::before {
    background: radial-gradient(
      700px circle at var(--mouse-x) var(--mouse-y),
      #5861b224,
      transparent 30%
    );
    z-index: 3;
  }

  .card::after {
    background: radial-gradient(
      600px circle at var(--mouse-x) var(--mouse-y),
      rgba(255, 255, 255, 0.4),
      transparent 40%
    );
    z-index: 1;
  }
</style>
