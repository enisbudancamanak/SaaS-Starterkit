<script lang="ts">
  import { Button, buttonVariants } from '$lib/components/ui/button'
  import * as Avatar from '$lib/components/ui/avatar'
  import * as Dialog from '$lib/components/ui/dialog'

  export let user: any
</script>

<!-- Avatar -->
<div class="flex items-center gap-4">
  <Avatar.Root class="rounded-full w-28 h-28">
    <Avatar.Image src={user.profilePicture} alt={'profilePicture'} />
    <Avatar.Fallback class="uppercase">{user.name.slice(0, 2)}</Avatar.Fallback>
  </Avatar.Root>

  <Dialog.Root>
    <Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
      Upload new photo
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description>
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description>
      </Dialog.Header>
      <!-- <div class="grid gap-4 py-4">
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right">Name</Label>
          <Input id="name" value="Pedro Duarte" class="col-span-3" />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right">Username</Label>
          <Input id="username" value="@peduarte" class="col-span-3" />
        </div>
      </div> -->
      <Dialog.Footer>
        <Button type="submit">Save changes</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</div>
