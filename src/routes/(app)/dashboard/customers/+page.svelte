<script lang="ts">
  import { createTable, Subscribe, Render } from 'svelte-headless-table'
  import {
    addSortBy,
    addPagination,
    addTableFilter,
    addSelectedRows,
  } from 'svelte-headless-table/plugins'

  import { readable } from 'svelte/store'
  import * as Table from '$lib/components/ui/table'
  //   import Actions from './data-table/data-table-actions.svelte'
  import { Button } from '$lib/components/ui/button'
  import { Input } from '$lib/components/ui/input'
  //   import DataTableCheckbox from './data-table/data-table-checkbox.svelte'
  //   import { ArrowUpDown, ChevronDown } from 'lucide-svelte'
  import Separator from '$lib/components/ui/separator/separator.svelte'
  import type { PageData } from './$types'

  export let data: PageData

  type Customer = {
    id: string
    status: 'Subscribed' | 'Unsubscribed'
    country: string
    email: string
    name: string
  }

  const customers: Customer[] = [
    ...data.customers.data.map((customer) => ({
      id: customer.id,
      status: customer.attributes.status_formatted as Customer['status'],
      country: customer.attributes.country_formatted,
      email: customer.attributes.email,
      name: customer.attributes.name,
    })),
  ]

  const table = createTable(readable(customers), {
    sort: addSortBy({ disableMultiSort: true }),
    page: addPagination({ initialPageSize: 10 }),
    filter: addTableFilter({
      fn: ({ filterValue, value }) => value.includes(filterValue),
    }),
    select: addSelectedRows(),
  })

  const columns = table.createColumns([
    table.column({
      header: 'Customer ID',
      accessor: 'id',
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
      header: 'Name',
      accessor: 'name',
      plugins: { sort: { disable: true }, filter: { exclude: true } },
    }),
    table.column({
      header: 'Status',
      accessor: 'status',
      plugins: { sort: { disable: true }, filter: { exclude: true } },
    }),
    table.column({
      header: 'Country',
      accessor: 'country',
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
  <h2>Customers</h2>
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
                    {#if cell.id === 'email'}
                      <Button variant="ghost" on:click={props.sort.toggle}>
                        <Render of={cell.render()} />
                        <!-- <ArrowUpDown
                            class={cn(
                              $sortKeys[0]?.id === cell.id && 'text-foreground',
                              'ml-2 h-4 w-4'
                            )}
                          /> -->
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
      Total amount of customers: {customers.length}
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
