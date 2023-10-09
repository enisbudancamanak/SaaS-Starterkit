<script lang="ts">
  import Card from '../card.svelte'
  import ChartIcon from '~icons/material-symbols/chart-data-rounded'

  import { tweened } from 'svelte/motion'
  import { quintOut } from 'svelte/easing'
  import { derived } from 'svelte/store'

  export let title: string
  export let value: number = 0
  export let percentage: number = 0
  export let moneyPrefix: boolean = false
  export let decimalPlaces: number = 2

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
  class="!w-full p-4 bg-accent shadow-inner hover:shadow-accent/40 hover:bg-accent/40 transition-all duration-200"
>
  <div class="flex flex-col gap-2">
    <span class="text-sm text-muted-foreground">{title}</span>

    {#if value}
      <div class="flex items-center justify-between gap-4">
        <span class="text-xl text-foreground"
          >{moneyPrefix ? '$' : ''}{$formattedValue}</span
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
