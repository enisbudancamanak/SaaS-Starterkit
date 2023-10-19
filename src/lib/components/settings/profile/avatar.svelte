<script lang="ts">
  import { buttonVariants } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import * as Avatar from '$lib/components/ui/avatar'
  import AvatarUpload from './avatarUpload.svelte'
  import { parseProfilePictureUrl } from '$lib/utils'

  export let user: any
</script>

<!-- Avatar -->
<div class="flex items-center gap-4">
  <Avatar.Root class="rounded-full w-28 h-28">
    <Avatar.Image
      src={parseProfilePictureUrl(user.profilePicture)}
      class="object-cover"
      alt={'profilePicture'}
    />
    <Avatar.Fallback class="uppercase">{user.name.slice(0, 2)}</Avatar.Fallback>
  </Avatar.Root>

  <Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
      Upload new photo
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Set new photo</Dialog.Title>
        <Dialog.Description />
      </Dialog.Header>
      <AvatarUpload userId={user.userId} />
    </Dialog.Content>
  </Dialog.Root>
</div>
