<script lang="ts">
  import Time from 'svelte-time'

  // Components
  import { Separator } from '$lib/components/ui/separator'
</script>

<div class="space-y-0.5">
  <p class="text-sm text-muted-foreground">
    <Time timestamp={new Date()} format="ddd D MMM, hh:mm A" />
  </p>
  <h2>Overview</h2>
</div>
<Separator class="my-6" />
