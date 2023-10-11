<script lang="ts">
  import Card from '../card.svelte'
</script>

<Card
  class="!w-full !h-full p-4 bg-accent shadow-inner hover:shadow-accent/40 transition-all duration-200"
>
  <slot />
</Card>
