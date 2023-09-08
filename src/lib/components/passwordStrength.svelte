<script lang="ts">
  export let password: string
  import checkPasswordStrength from 'check-password-strength'
  import { cn } from '$lib/utils'

  $: strength = checkPasswordStrength.passwordStrength(password)
</script>

<!-- <div id="color-indicators">
  <span class:valid={strength.id >= 0} />
  <span class:valid={strength.id >= 1} />
  <span class:valid={strength.id >= 2} />
  <span class:valid={strength.id >= 3} />
</div> -->
<!-- <ul class="space-y-0">
  <li class:valid={strength.contains.includes('lowercase')}>Lowercase</li>
  <li class:valid={strength.contains.includes('uppercase')}>Uppercase</li>
  <li class:valid={strength.contains.includes('number')}>Number</li>
  <li class:valid={strength.contains.includes('symbol')}>Symbol</li>
</ul> -->
{#if password.length > 0}
  <p
    class={cn(
      strength.value.includes('Too weak')
        ? 'text-red-500'
        : strength.value.includes('Weak')
        ? 'text-red-400'
        : strength.value.includes('Medium')
        ? 'text-orange-400'
        : 'text-green-400',
      'text-sm transition-colors duration-200'
    )}
  >
    Your password is {strength.value}!
  </p>
{/if}

<style>
</style>
