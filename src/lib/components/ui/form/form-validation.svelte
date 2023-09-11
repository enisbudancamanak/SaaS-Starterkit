<script lang="ts">
  import { Form as FormPrimitive } from 'formsnap'
  import { cn } from '$lib/utils'
  import type { HTMLAttributes } from 'svelte/elements'
  import WarningIcon from '~icons/ph/warning-circle-duotone'

  // type $$Props = HTMLAttributes<HTMLParagraphElement>
  // let className: string | undefined | null = undefined
  // export { className as class }

  import { getFormField } from 'formsnap'

  const { errors } = getFormField()

  import * as Alert from '$lib/components/ui/alert'
</script>

{#if $errors}
  <Alert.Root variant="destructive">
    <WarningIcon class="w-5 h-5" />
    <Alert.Title>{$errors}</Alert.Title>
  </Alert.Root>
{/if}

<!-- <FormPrimitive.Validation
  class={cn('text-sm font-medium text-destructive', className)}
  {...$$restProps}
/> -->
