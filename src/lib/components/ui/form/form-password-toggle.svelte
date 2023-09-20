<script>
  import EyeClosed from '~icons/ion/eye-disabled'
  import EyeOpen from '~icons/ion/eye'

  import Button from '$lib/components/ui/button/button.svelte'
  import * as Tooltip from '$lib/components/ui/tooltip'

  export let passwordVisible = false
</script>

<Button
  type="button"
  variant="none"
  class="absolute right-0"
  on:click={() => {
    passwordVisible = !passwordVisible
  }}
>
  {#if passwordVisible}
    <EyeOpen class="w-6 h-6" />
  {:else}
    <EyeClosed class="w-6 h-7" />
  {/if}
</Button>
<!-- 

<div class="absolute right-0">
  <Tooltip.Root>
    <Tooltip.Trigger>
      <Button
        type="button"
        variant="none"
        on:click={() => {
          passwordVisible = !passwordVisible
        }}
      >
        {#if passwordVisible}
          <EyeOpen class="w-6 h-6" />
        {:else}
          <EyeClosed class="w-6 h-7" />
        {/if}
      </Button>
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>Add to library</p>
    </Tooltip.Content>
  </Tooltip.Root>
</div> -->
