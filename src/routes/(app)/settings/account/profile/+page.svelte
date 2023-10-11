<script lang="ts">
  import Time from 'svelte-time'

  // Components
  import { Separator } from '$lib/components/ui/separator'
  import ChartCard from '$lib/components/dashboard/chartCard.svelte'
  import Bar from '$lib/components/dashboard/barChart.svelte'
  import SimpleTable from '$lib/components/dashboard/simpleTable.svelte'

  // Types
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div class="space-y-0.5">
  <p class="text-sm text-muted-foreground">
    <Time timestamp={new Date()} format="ddd D MMM, hh:mm A" />
  </p>
  <h2>Overview</h2>
</div>
<Separator class="my-6" />
