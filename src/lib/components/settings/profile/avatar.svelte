<script lang="ts">
  import { buttonVariants } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import AvatarUpload from './avatarUpload.svelte'
  import Avatar from '$lib/components/avatar.svelte'

  export let user: any
  let openDialog: boolean
</script>

<!-- Avatar -->
<div class="flex items-center gap-4">
  <Avatar
    class="w-28 h-28"
    src={user.profilePicture}
    alt={'Profile Picture'}
    fallback={user.name.slice(0, 2)}
  />

  <Dialog.Root bind:open={openDialog}>
    <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
      Upload new photo
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Set new photo</Dialog.Title>
        <Dialog.Description />
      </Dialog.Header>
      <AvatarUpload bind:openDialog />
    </Dialog.Content>
  </Dialog.Root>
</div>
