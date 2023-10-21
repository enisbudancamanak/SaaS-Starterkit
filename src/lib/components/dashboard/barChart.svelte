<script lang="ts">
  import { scaleLinear } from 'd3-scale'
  import ChartCard from './chartCard.svelte'
  import { fade } from 'svelte/transition'
  import { quintInOut } from 'svelte/easing'

  export let orders: any
  let ordersSliced: any
  let totalSum: any

  $: if (orders) {
    ordersSliced = orders

    totalSum = orders.reduce((a: any, b: any) => a + b.total, 0)
  }

  const yTicks = [0, 50, 100, 150, 200, 250, 300]
  const padding = { top: 20, right: 15, bottom: 20, left: 55 }

  let width = 0
  let height = 0

  $: xScale = scaleLinear()
    .domain([0, xTicks.length])
    .range([padding.left, width - padding.right])

  $: yScale = scaleLinear()
    .domain([0, Math.max.apply(null, yTicks)])
    .range([height - padding.bottom, padding.top])

  $: innerWidth = width - (padding.left + padding.right)
  $: barWidth = innerWidth / xTicks.length
  $: xTicks = ordersSliced.map((d: any) => d.name)

  // Responsive
  $: if (innerWidth > 400) {
    ordersSliced = sortMonths(12)
  } else if (innerWidth < 400 && innerWidth > 350) {
    ordersSliced = sortMonths(10)
  } else if (innerWidth < 350 && innerWidth > 300) {
    ordersSliced = sortMonths(8)
  } else if (innerWidth < 300) {
    ordersSliced = sortMonths(6)
  }

  function sortMonths(months: number) {
    return orders.slice(orders.length - months, orders.length)
  }
</script>

<ChartCard title="Sales activity" value={totalSum} moneyPrefix={true}>
  <div class="pt-3.5">
    <div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
      {#if width > 0}
        <svg>
          <!-- y axis -->
          <g class="axis y-axis">
            {#each yTicks as tick}
              <g class="text-xs" transform="translate(0, {yScale(tick)})">
                <text
                  class="fill-accent-foreground/80"
                  stroke="none"
                  font-size="12"
                  orientation="right"
                  width="60"
                  height="310"
                  x="57"
                  y="-4"
                  text-anchor="end"
                  ><tspan x="40" dy="0.355em">${tick}</tspan></text
                >
              </g>
            {/each}
          </g>

          <!-- x axis -->
          <g class="axis x-axis">
            {#each ordersSliced as point, i}
              <g class="text-xs" transform="translate({xScale(i)},{height})">
                <text
                  in:fade={{
                    duration: 225,
                    delay: i * 30,
                  }}
                  class="fill-accent-foreground/80"
                  stroke="none"
                  font-size="12"
                  orientation="bottom"
                  width="530"
                  height="30"
                  x={barWidth / 2}
                  y="-15"
                  text-anchor="middle"
                  ><tspan x={barWidth / 2} dy="0.71em">{point.name}</tspan
                  ></text
                >
              </g>
            {/each}
          </g>

          <g>
            {#each ordersSliced as point, i}
              <rect
                in:fade={{
                  duration: 200,
                  delay: i * 20,
                }}
                class="fill-accent-foreground/40"
                x={xScale(i) + 8}
                y={yScale(300)}
                width={barWidth - 15}
                height={yScale(0) - yScale(300)}
                rx="12"
                ry="12"
              />
            {/each}
          </g>

          <g>
            {#each ordersSliced as point, i}
              <rect
                in:fade={{
                  duration: 250,
                  delay: i * 30,
                  easing: quintInOut,
                }}
                id="foreground"
                class="fill-accent-foreground/50"
                x={xScale(i) + 8}
                y={yScale(point.total)}
                width={barWidth - 15}
                height={yScale(0) - yScale(point.total)}
                rx="12"
                ry="12"
              />
            {/each}
          </g>
        </svg>
      {/if}
    </div>
  </div>
</ChartCard>

<style>
  .chart {
    width: 100%;
    margin: 0 auto;
  }

  svg {
    position: relative;
    width: 100%;
    height: 300px;
  }

  rect {
    max-width: 51px;
  }
</style>
