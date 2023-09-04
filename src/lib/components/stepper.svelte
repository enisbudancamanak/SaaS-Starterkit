<script>
  import EnterCodeForm from './login/enter-code-form.svelte'
  import First from './stepper-welcome/first.svelte'

  let currentItem = 1
</script>

{#if currentItem == 1}
  <First />
{:else if currentItem == 2}
  <EnterCodeForm />
{/if}
