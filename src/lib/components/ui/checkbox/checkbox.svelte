<script lang="ts">
  import { Checkbox as CheckboxPrimitive } from 'bits-ui'
  import { cn } from '$lib/utils'
  import { draw } from 'svelte/transition'

  type $$Props = CheckboxPrimitive.Props
  type $$Events = CheckboxPrimitive.Events

  let className: $$Props['class'] = undefined
  export let checked: $$Props['checked'] = false
  export { className as class }
</script>

<CheckboxPrimitive.Root
  bind:checked
  class={cn(
    'peer h-4 w-4 shrink-0 rounded border border-primary ring-offset-background transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
    className
  )}
  {...$$restProps}
  on:click
>
  <CheckboxPrimitive.Indicator
    class={cn('flex items-center justify-center text-current h-4 w-4 pr-0.5')}
    let:isChecked
  >
    {#if isChecked}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="4"
        stroke="currentColor"
        class="w-3 h-3"
      >
        <path
          in:draw={{ duration: 300, delay: 200 }}
          out:draw={{ duration: 200 }}
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    {/if}
  </CheckboxPrimitive.Indicator>
</CheckboxPrimitive.Root>
