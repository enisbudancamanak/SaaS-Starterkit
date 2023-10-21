<script lang="ts">
  import Card from '../card.svelte'
  import ChartIcon from '~icons/material-symbols/chart-data-rounded'
  import * as Select from '$lib/components/ui/select'
  import { Button } from '$lib/components/ui/button'

  import { tweened } from 'svelte/motion'
  import { quintOut } from 'svelte/easing'
  import { derived } from 'svelte/store'

  export let title: string
  export let value: number = 0
  export let percentage: number = 0
  export let moneyPrefix: boolean = false
  export let decimalPlaces: number = 2
  export let link: linkObject = null

  type linkObject = {
    name: string
    goto: string
  } | null

  export let stringTimeSpans: string[] = []
  export let selectedTimeSpan: string = ''

  //   Counter animation
  export let valueTweened = tweened(0, {
    duration: 750,
    easing: quintOut,
  })
  let formattedValue = derived(valueTweened, ($valueTweened) =>
    $valueTweened.toFixed(decimalPlaces)
  )
  $: if (value) {
    valueTweened.set(value)
  }
</script>

<Card
  class="!w-full !h-full p-4 bg-accent shadow-inner hover:shadow-accent/40 hover:bg-accent/40 transition-all duration-200"
>
  <div class="flex flex-col gap-2">
    {#if link}
      <div class="flex items-center justify-between pb-3">
        <span class="text-sm text-muted-foreground">{title}</span>
        <Button variant="outline" size="sm" href={link.goto}>{link.name}</Button
        >
      </div>
    {:else}
      <span class="text-sm text-muted-foreground">{title}</span>
    {/if}

    <!-- <div class="flex items-center justify-between">
        <div class="flex items-center justify-between gap-4">
          <span class="text-xl text-foreground"
            >{moneyPrefix ? '€' : ''}{$formattedValue}</span
          >
        </div>

        <Select.Root
          preventScroll={false}
          selected={{ value: selectedTimeSpan }}
        >
          <Select.Trigger class="rounded-lg h-7">
            <Select.Value placeholder={'Last 30 Days'} />
          </Select.Trigger>
          <Select.Content>
            <Select.Item value="disabled">Light</Select.Item>
            <Select.Item value="enabled">Dark</Select.Item>
            <Select.Item value="system">System</Select.Item>
          </Select.Content>
        </Select.Root>
      </div> -->

    {#if value}
      <div class="flex items-center gap-4">
        <span class="text-xl text-foreground"
          >{moneyPrefix ? '€' : ''}{$formattedValue}</span
        >
      </div>
    {/if}

    {#if percentage}
      <div class="flex items-center gap-2">
        {#if percentage > 0}
          <div
            class="flex items-center px-1.5 py-1 bg-green-500/40 rounded-sm text-green-900 dark:text-green-400"
          >
            <ChartIcon class="w-4.5 h-4.5 mr-0.5" />
            <span class="text-xs font-semibold">{percentage}%</span>
          </div>
        {:else if percentage < 0}
          <div
            class="flex items-center px-1.5 py-1 bg-destructive/40 rounded-sm text-destructive dark:text-destructive"
          >
            <ChartIcon class="w-4.5 h-4.5 mr-0.5" />
            <span class="text-xs font-semibold">{percentage}%</span>
          </div>
        {/if}
        <span class="text-sm text-muted-foreground"> from last month </span>
      </div>
    {/if}
  </div>
  <div>
    <slot />
  </div>
</Card>
