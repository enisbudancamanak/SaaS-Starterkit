<script lang="ts">
  import Background from '$lib/components/background.svelte'
  import Card from '$lib/components/card.svelte'
</script>

<Background />

<div class="container flex items-center justify-center w-screen h-screen">
  <Card glanceEffect={true} class="p-8">
    <slot />
  </Card>
</div>

<style>
</style>
