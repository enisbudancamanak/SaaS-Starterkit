<script lang="ts">
  import Dropzone from 'svelte-file-dropzone/Dropzone.svelte'
  import { Button, buttonVariants } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import * as Avatar from '$lib/components/ui/avatar'
  import { blur, fade, fly, slide } from 'svelte/transition'
  import { quintOut } from 'svelte/easing'

  let file = {
    accepted: null,
    rejected: null,
  }

  let imageResult: any

  function handleFilesSelect(e: any) {
    const { acceptedFiles, fileRejections } = e.detail
    file.accepted = acceptedFiles[0]
    file.rejected = fileRejections

    if (!file.accepted) return
    const image = (e.detail.event.target as HTMLInputElement)?.files[0]
    imageResult = URL.createObjectURL(image)

    e.return
  }

  function handleRemoveFile() {
    file.accepted = null
    file.rejected = null
    imageResult = null
  }

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
        <Dialog.Title>Set new photo</Dialog.Title>
        <Dialog.Description />
      </Dialog.Header>

      {#if file.accepted == null}
        <Dropzone
          maxSize={2000000}
          containerClasses="!bg-background hover:!border-secondary !border-muted-foreground !text-foreground !rounded-xl"
          on:drop={handleFilesSelect}
          inputElement
          accept={['image/*']}
          multiple={false}
        >
          <div>
            <span class="underline">Click to upload</span>
            <span>or drag and drop here</span>
          </div>
          <span>SVG, PNG or JPG (max. 2mb)</span>
        </Dropzone>
      {:else if imageResult && file.accepted}
        <div class="flex flex-col items-center w-full gap-4">
          <div in:blur={{ duration: 200 }}>
            <Avatar.Root class="rounded-full w-28 h-28 aspect-square">
              <Avatar.Image
                src={imageResult}
                class="object-cover"
                alt="profilePicture"
              />
            </Avatar.Root>
          </div>
        </div>
      {/if}
      <Dialog.Footer class="!flex !justify-center !w-full">
        <Button
          disabled={!file.accepted ?? null}
          variant="destructive"
          on:click={handleRemoveFile}
        >
          Remove
        </Button>
        <Button disabled={!file.accepted ?? null} type="submit"
          >Save changes</Button
        >
      </Dialog.Footer>
    </Dialog.Content>
  </Dialog.Root>
</div>
