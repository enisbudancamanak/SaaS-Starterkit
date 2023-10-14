<script lang="ts">
  import { Button } from '$lib/components/ui/button'
  import * as Avatar from '$lib/components/ui/avatar'

  export let user: any
</script>

<!-- Avatar -->
<div class="flex items-center gap-4">
  <Avatar.Root class="rounded-full w-28 h-28">
    <Avatar.Image src={user.profilePicture} alt={'profilePicture'} />
    <Avatar.Fallback class="uppercase">{user.name.slice(0, 2)}</Avatar.Fallback>
  </Avatar.Root>

  <Button variant="outline">Upload new photo</Button>
</div>
