<script lang="ts">
  // Components
  import Card from '$lib/components/settings/card.svelte'
  import { Separator } from '$lib/components/ui/separator'
  import type { PageData } from './$types'

  // Types
  export let data: PageData
</script>

<div class="space-y-0.5">
  <h2>Profile</h2>
</div>
<Separator class="my-6" />

<Card />
