<script lang="ts">
  import { parseProfilePictureUrl, cn } from '$lib/utils'

  let className: $$Props['class'] = undefined
  export let src: $$Props['src'] = undefined
  export let alt: $$Props['alt'] = undefined
  export let fallback: $$Props['fallback'] = undefined
  export let parse = true

  export { className as class }
</script>

<div
  class={cn(
    'w-8 h-8 rounded-full bg-foreground/70 border-input border',
    className
  )}
>
  {#if src}
    <img
      class={'object-cover w-full h-full rounded-full aspect-square'}
      src={parse ? parseProfilePictureUrl(src) : src}
      {alt}
    />
  {:else}
    <img
      class={'object-cover w-full h-full rounded-full aspect-square'}
      src={`https://ui-avatars.com/api/?name=${fallback}`}
      {alt}
    />
  {/if}
</div>
