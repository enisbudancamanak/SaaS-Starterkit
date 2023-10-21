<script lang="ts">
  import Card from '../card.svelte'
  import { Skeleton } from '$lib/components/ui/skeleton'
</script>

<Card
  class="!w-full !h-full p-4 bg-accent shadow-inner hover:shadow-accent/40 hover:bg-accent/40 transition-all duration-200"
>
  <div class="flex flex-col gap-2 h-fit">
    <Skeleton class="h-2 w-[100px]" />
    <Skeleton class="h-2 w-[50px]" />
  </div>
</Card>
