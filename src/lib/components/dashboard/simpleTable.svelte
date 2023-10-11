<script lang="ts">
  import * as Table from '$lib/components/ui/table'
  import Time from 'svelte-time/src/Time.svelte'

  export let ordersData: any

  console.log(ordersData.data)

  type Order = {
    id: string
    status: 'Paid' | 'Pending' | 'Unpaid'
    totalAmount: string
    email: string
    time: string
    subscription: string
  }

  const orders: Order[] = [
    ...ordersData.data.slice(0, 5).map((order: any) => ({
      id: order.id,
      status: order.attributes.status_formatted as Order['status'],
      totalAmount: order.attributes.total_formatted,
      email: order.attributes.user_email,
      time: order.attributes.created_at,
      subscription: order.attributes.first_order_item.product_name,
    })),
  ]
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Invoice</Table.Head>
      <Table.Head>Subscription</Table.Head>
      <Table.Head class="text-right">Amount</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each orders as order, i (i)}
      <Table.Row>
        <Table.Cell class="font-medium">
          <Time timestamp={order.time} format="ddd D MMM" />
        </Table.Cell>
        <Table.Cell>{order.subscription}</Table.Cell>
        <Table.Cell class="text-right">{order.totalAmount}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>
