<script lang="ts">
  import Dropzone from 'svelte-file-dropzone/Dropzone.svelte'
  import { Button } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import * as Avatar from '$lib/components/ui/avatar'
  import { blur, fade } from 'svelte/transition'

  let file = {
    accepted: null,
    rejected: null,
  }

  let bindedImage: File
  let imageResult: any

  function handleFilesSelect(e: any) {
    const { acceptedFiles, fileRejections } = e.detail
    file.accepted = acceptedFiles[0]
    file.rejected = fileRejections

    if (!file.accepted) return
    // @ts-ignore
    const image = (e.detail.event.target as HTMLInputElement)?.files[0]
    bindedImage = image
    imageResult = URL.createObjectURL(image)

    e.return
  }

  function handleRemoveFile() {
    file.accepted = null
    file.rejected = null
    imageResult = null
  }

  const uploadAvatar = async (e: Event) => {
    if (bindedImage) {
      const getPresignedUrlResponse = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          fileName: bindedImage.name,
          fileType: bindedImage.type,
        }),
      })

      if (!getPresignedUrlResponse.ok) {
        console.error('Failed to get presigned URL')
      }

      const { presignedUrl } = await getPresignedUrlResponse.json()

      const uploadToR2Response = await fetch(presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': bindedImage.type,
        },
        body: bindedImage,
      })

      if (!uploadToR2Response.ok) {
        console.error('Failed to upload file to R2')
      }
    }
  }

  export let userId: string
</script>

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
  {#if file.rejected}
    <p class="!m-0 text-center text-red-500" transition:fade>
      Filetype not supported
    </p>
  {/if}
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

    <Dialog.Footer class="!flex !justify-center !w-full">
      <Button variant="destructive" on:click={handleRemoveFile}>Remove</Button>
      <Button type="submit" on:click={uploadAvatar}>Save changes</Button>
    </Dialog.Footer>
  </div>
{/if}
