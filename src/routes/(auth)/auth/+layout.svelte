<script lang="ts">
  import Background from '$lib/components/background.svelte'
  import CardGlance from '$lib/components/cardGlance.svelte'
</script>

<Background />

<div class="container flex items-center justify-center w-screen h-screen">
  <CardGlance class="p-8" glanceEffect={true}>
    <slot />
  </CardGlance>
</div>

<style>
</style>
