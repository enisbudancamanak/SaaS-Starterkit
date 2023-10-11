<script lang="ts">
  import { scaleLinear } from 'd3-scale'
  import ChartCard from './chartCard.svelte'
  import dayjs from 'dayjs'
  import { fade } from 'svelte/transition'
  import { quintInOut } from 'svelte/easing'

  export let orders: any

  const data = [
    {
      name: 'Jan',
      month: 1,
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Feb',
      month: 2,
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Mar',
      month: 3,
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Apr',
      month: 4,
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'May',
      month: 5,
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Jun',
      month: 6,
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Jul',
      month: 7,
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Aug',
      month: 8,
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Sep',
      month: 9,
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Oct',
      month: 10,
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Nov',
      month: 11,
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Dec',
      month: 12,
      total: Math.floor(Math.random() * 5000) + 1000,
    },
  ]

  const timeSpans = ['Last 7 days', 'Last 30 days', 'Last 90 days']
  const yTicks = [0, 1500, 3000, 4500, 6000]
  const padding = { top: 20, right: 15, bottom: 20, left: 55 }
  const currentMonth = dayjs().month() + 1

  let dataSliced = data

  let width = 0
  let height = 0

  function formatMobile(tick: number | string) {
    return "'" + tick.toString().slice(0, 2)
  }

  $: xScale = scaleLinear()
    .domain([0, xTicks.length])
    .range([padding.left, width - padding.right])

  $: yScale = scaleLinear()
    .domain([0, Math.max.apply(null, yTicks)])
    .range([height - padding.bottom, padding.top])

  $: innerWidth = width - (padding.left + padding.right)
  $: barWidth = innerWidth / xTicks.length
  $: xTicks = dataSliced.map((d) => d.name)

  // Responsive
  $: if (innerWidth > 400) {
    dataSliced = sortMonths(12)
  } else if (innerWidth < 400 && innerWidth > 350) {
    dataSliced = sortMonths(10)
  } else if (innerWidth < 350 && innerWidth > 300) {
    dataSliced = sortMonths(8)
  } else if (innerWidth < 300) {
    dataSliced = sortMonths(6)
  }

  function sortMonths(count: number) {
    let dataClone = data
    dataClone = dataClone.sort(function (m1, m2) {
      var n1 = m1.month,
        n2 = m2.month
      if (n1 > currentMonth) {
        n1 = n1 - 12
      }
      if (n2 > currentMonth) {
        n2 = n2 - 12
      }
      return n1 - n2
    })
    dataClone = dataClone.slice(dataClone.length - count, dataClone.length)

    return dataClone
  }
</script>

<ChartCard title="Sales activity" value={7865.43} moneyPrefix={true}>
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
            {#each dataSliced as point, i}
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
            {#each dataSliced as point, i}
              <rect
                in:fade={{
                  duration: 200,
                  delay: i * 20,
                }}
                class="fill-accent-foreground/40"
                x={xScale(i) + 8}
                y={yScale(6200)}
                width={barWidth - 15}
                height={yScale(0) - yScale(6200)}
                rx="12"
                ry="12"
              />
            {/each}
          </g>

          <g>
            {#each dataSliced as point, i}
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
