<script lang="ts">
  import ArrowUpDown from '~icons/lucide/arrow-down-up'

  import { createTable, Subscribe, Render } from 'svelte-headless-table'
  import {
    addSortBy,
    addPagination,
    addTableFilter,
    addSelectedRows,
  } from 'svelte-headless-table/plugins'

  import { readable, writable } from 'svelte/store'
  import * as Table from '$lib/components/ui/table'
  //   import Actions from './data-table/data-table-actions.svelte'
  import { Button } from '$lib/components/ui/button'
  import { Input } from '$lib/components/ui/input'
  import Separator from '$lib/components/ui/separator/separator.svelte'
  import type { PageData } from './$types'
  import dayjs from 'dayjs'

  export let data: PageData

  type Order = {
    id: string
    status: 'Paid' | 'Pending' | 'Unpaid'
    totalAmount: string
    email: string
    date: string
    subscription: string
  }

  const orders: Order[] = [
    ...data.orders.map((order: any) => ({
      id: order.id,
      status: order.attributes.status_formatted as Order['status'],
      totalAmount: order.attributes.total_formatted,
      email: order.attributes.user_email,
      date: order.attributes.created_at,
      subscription: order.attributes.first_order_item.product_name,
    })),
  ]

  const table = createTable(writable(orders), {
    sort: addSortBy({ disableMultiSort: true }),
    page: addPagination({ initialPageSize: 10 }),
    filter: addTableFilter({
      fn: ({ filterValue, value }) => value.includes(filterValue),
    }),
    select: addSelectedRows(),
  })

  const columns = table.createColumns([
    table.column({
      header: 'ID',
      accessor: 'id',
      plugins: { sort: { disable: true }, filter: { exclude: true } },
    }),
    table.column({
      header: 'Date',
      accessor: 'date',
      plugins: {
        filter: {
          getFilterValue(value) {
            return value
          },
        },
      },
      cell: ({ value }) => dayjs(value).format('DD MMM, hh:mm A'),
    }),
    table.column({
      header: 'Status',
      accessor: 'status',
      plugins: { sort: { disable: true }, filter: { exclude: true } },
    }),
    table.column({
      header: 'Email',
      accessor: 'email',
      plugins: {
        filter: {
          getFilterValue(value) {
            return value
          },
        },
      },
    }),
    table.column({
      header: 'Subscription',
      accessor: 'subscription',
      plugins: { sort: { disable: true }, filter: { exclude: true } },
    }),
    table.column({
      header: 'Amount',
      accessor: 'totalAmount',
      plugins: {
        sort: {
          disable: true,
        },
        filter: {
          exclude: true,
        },
      },
    }),
  ])

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
    table.createViewModel(columns)

  const { hasNextPage, hasPreviousPage, pageIndex, pageCount } =
    pluginStates.page
  const { filterValue } = pluginStates.filter

  const { selectedDataIds } = pluginStates.select
</script>

<div class="space-y-0.5">
  <h2>Orders</h2>
</div>
<Separator class="my-6" />

<div class="w-full">
  <div class="flex items-center">
    <Input
      class="max-w-sm"
      placeholder="Filter emails..."
      type="text"
      bind:value={$filterValue}
    />
  </div>
  <div class="mt-4 border rounded-md">
    <Table.Root {...$tableAttrs} class="rounded-md !overflow-hidden">
      <Table.Header class="bg-accent/50">
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row>
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe
                  attrs={cell.attrs()}
                  let:attrs
                  props={cell.props()}
                  let:props
                >
                  <Table.Head {...attrs}>
                    {#if cell.id === 'email' || cell.id === 'date'}
                      <Button
                        variant="ghost"
                        class={props.sort.order != undefined ? 'bg-accent' : ''}
                        on:click={props.sort.toggle}
                      >
                        <Render of={cell.render()} />
                        <ArrowUpDown class={'ml-2 h-4 w-4'} />
                      </Button>
                    {:else}
                      <Render of={cell.render()} />
                    {/if}
                  </Table.Head>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Header>
      <Table.Body {...$tableBodyAttrs}>
        {#each $pageRows as row (row.id)}
          <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            <Table.Row
              {...rowAttrs}
              data-state={$selectedDataIds[row.id] && 'selected'}
            >
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <Table.Cell {...attrs}>
                    {#if cell.id === 'status'}
                      <div class="capitalize">
                        <Render of={cell.render()} />
                      </div>
                    {:else}
                      <Render of={cell.render()} />
                    {/if}
                  </Table.Cell>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
  <div class="flex items-center justify-end py-4 space-x-2">
    <div class="flex-1 text-sm text-muted-foreground">
      Total amount of orders: {orders.length}
      <br />
      Page {$pageIndex + 1} of {$pageCount}
    </div>
    <Button
      variant="outline"
      size="sm"
      on:click={() => ($pageIndex = $pageIndex - 1)}
      disabled={!$hasPreviousPage}>Previous</Button
    >
    <Button
      variant="outline"
      size="sm"
      disabled={!$hasNextPage}
      on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button
    >
  </div>
</div>
