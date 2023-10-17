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
  <h2>Overview</h2>
</div>
<Separator class="my-6" />

<div class="flex flex-col gap-4">
  <div class="grid gap-4 md:grid-cols-3">
    <ChartCard
      title="Total revenue"
      value={data.totalRevenue}
      moneyPrefix={true}
    />
    <ChartCard
      title="Subscriptions"
      value={data.ordersTotal}
      decimalPlaces={0}
      moneyPrefix={false}
    />
    <ChartCard
      title="Visitors"
      value={2245}
      moneyPrefix={false}
      decimalPlaces={0}
    />
  </div>

  <div class="flex flex-wrap gap-4">
    <div class="w-full md:flex-1">
      <Bar orders={data.sortedOrders} />
    </div>

    <div class="w-full md:w-fit">
      <ChartCard
        title="Recent orders"
        link={{ goto: '/dashboard/orders', name: 'View all' }}
      >
        <SimpleTable ordersData={data.orders} />
      </ChartCard>
    </div>
  </div>
</div>
