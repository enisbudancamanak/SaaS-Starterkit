<script lang="ts">
  import ChartCard from '$lib/components/dashboard/chartCard.svelte'
  import { Separator } from '$lib/components/ui/separator'
  import Time from 'svelte-time'
  import * as Table from '$lib/components/ui/table'
  import Bar from '$lib/components/bar.svelte'

  const invoices = [
    {
      invoice: 'INV001',
      paymentStatus: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV002',
      paymentStatus: 'Pending',
      totalAmount: '$150.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV003',
      paymentStatus: 'Unpaid',
      totalAmount: '$350.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV004',
      paymentStatus: 'Paid',
      totalAmount: '$450.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV005',
      paymentStatus: 'Paid',
      totalAmount: '$550.00',
      paymentMethod: 'PayPal',
    },
  ]

  import type { PageData } from './$types'

  export let data: PageData
  console.log(data.orders)
</script>

<div class="space-y-0.5">
  <p class="text-sm text-muted-foreground">
    <Time timestamp={new Date()} format="ddd D MMM, hh:mm A" />
  </p>
  <h2>Overview</h2>
</div>
<Separator class="my-6" />

<div class="flex flex-col gap-4">
  <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
    <ChartCard
      title="Total revenue"
      value={105865.89}
      moneyPrefix={true}
      percentage={34}
    />
    <ChartCard
      title="Subscriptions"
      value={221}
      decimalPlaces={0}
      moneyPrefix={false}
      percentage={10}
    />
    <ChartCard
      title="Sales"
      value={7865.43}
      moneyPrefix={true}
      percentage={10}
    />
    <ChartCard
      title="Store visitors"
      value={2245}
      moneyPrefix={false}
      decimalPlaces={0}
      percentage={73}
    />
  </div>

  <div class="flex flex-wrap gap-4">
    <div class="w-full md:flex-1">
      <ChartCard title="Sales activity">
        <Bar />
      </ChartCard>
    </div>

    <div class="w-full md:w-fit">
      <ChartCard title="Recent orders">
        <Table.Root>
          <Table.Caption>A list of your recent invoices.</Table.Caption>
          <Table.Header>
            <Table.Row>
              <Table.Head>Invoice</Table.Head>
              <Table.Head>Method</Table.Head>
              <Table.Head class="text-right">Amount</Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {#each invoices as invoice, i (i)}
              <Table.Row>
                <Table.Cell class="font-medium">{invoice.invoice}</Table.Cell>
                <Table.Cell>{invoice.paymentMethod}</Table.Cell>
                <Table.Cell class="text-right">{invoice.totalAmount}</Table.Cell
                >
              </Table.Row>
            {/each}
          </Table.Body>
        </Table.Root>
      </ChartCard>
    </div>
  </div>
</div>
