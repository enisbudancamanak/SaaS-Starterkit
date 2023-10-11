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

  // SORT SALE BY MONTH = GET LAST 12 MONTHS
  // const months = [
  //   'Jan',
  //   'Feb',
  //   'Mar',
  //   'Apr',
  //   'May',
  //   'Jun',
  //   'Jul',
  //   'Aug',
  //   'Sep',
  //   'Oct',
  //   'Nov',
  //   'Dec',
  // ]

  // const currentMonth = dayjs().month() + 1
  // const last12Months = months.slice(currentMonth - 12, currentMonth)

  // const data = last12Months.map((month) => {
  //   return {
  //     name: month,

  //     total: Math.floor(Math.random() * 5000) + 1000,
  //   }

  //   // return {
  //   //   name: month,
  //   //   total: orders.data
  //   //     .filter((order: any) => {
  //   //       const orderMonth = dayjs(order.attributes.created_at).month() + 1
  //   //       return orderMonth === month
  //   //     })
  //   //     .reduce((acc: number, order: any) => {
  //   //       return acc + order.attributes.total
  //   //     }, 0),
  //   // }
  // })

  // console.log(data)
</script>

<div class="space-y-0.5">
  <p class="text-sm text-muted-foreground">
    <Time timestamp={new Date()} format="ddd D MMM, hh:mm A" />
  </p>
  <h2>Overview</h2>
</div>
<Separator class="my-6" />

<div class="flex flex-col gap-4">
  <div class="grid gap-4 md:grid-cols-3">
    <ChartCard
      title="Total revenue"
      value={data.store.data[0].attributes.total_revenue + 1}
      moneyPrefix={true}
    />
    <ChartCard
      title="Subscriptions"
      value={data.subscriptions.data.length}
      decimalPlaces={0}
      moneyPrefix={false}
    />
    <!-- <ChartCard
      title="Sales"
      value={7865.43}
      moneyPrefix={true}
      percentage={10}
    /> -->
    <ChartCard
      title="Store visitors"
      value={2245}
      moneyPrefix={false}
      decimalPlaces={0}
    />
  </div>

  <div class="flex flex-wrap gap-4">
    <div class="w-full md:flex-1">
      <Bar />
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
