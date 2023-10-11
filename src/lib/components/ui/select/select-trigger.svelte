<script lang="ts">
  import { Select as SelectPrimitive } from 'bits-ui'
  import ChevronDown from '~icons/lucide/chevron-down'
  import { cn } from '$lib/utils'

  type $$Props = SelectPrimitive.TriggerProps
  type $$Events = SelectPrimitive.TriggerEvents

  let className: $$Props['class'] = undefined
  export { className as class }
</script>

<SelectPrimitive.Trigger
  class={cn(
    'flex h-10 items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
    className
  )}
  {...$$restProps}
  let:builder
  on:click
  on:keydown
>
  <slot {builder} />
  <div>
    <ChevronDown class="w-4 h-4 opacity-50" />
  </div>
</SelectPrimitive.Trigger>
