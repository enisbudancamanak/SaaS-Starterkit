<script lang="ts">
  import Dropzone from 'svelte-file-dropzone/Dropzone.svelte'
  import { Button } from '$lib/components/ui/button'
  import * as Dialog from '$lib/components/ui/dialog'
  import { blur, fade } from 'svelte/transition'
  import { applyAction, enhance } from '$app/forms'
  import { invalidateAll } from '$app/navigation'
  import Avatar from '$lib/components/avatar.svelte'

  let bindedImage: File
  let imageResult: any
  let files: any
  let imageInputElement: HTMLInputElement

  let file = {
    accepted: null,
    rejected: null,
  }

  function handleFilesSelect(e: any) {
    const { acceptedFiles, fileRejections } = e.detail
    file.accepted = acceptedFiles[0]
    file.rejected = fileRejections
    if (!file.accepted) return

    // @ts-ignore
    bindedImage = (e.detail.event.target as HTMLInputElement)?.files[0]
    imageResult = URL.createObjectURL(bindedImage)
    files = e.detail.event.target.files

    imageInputElement.files = e.detail.event.target.files
  }

  function handleRemoveFile() {
    file.accepted = null
    file.rejected = null
    imageResult = null
  }

  function parseErrorMessage(message: string) {
    if (message.includes('large')) return 'File is too large'
    else if (message.includes('type')) return 'File type is not supported'
    else return 'Something went wrong'
  }

  let uploadInProgress = false
  export let openDialog: boolean
</script>

{#if file.accepted == null}
  <Dropzone
    maxSize={2000000}
    containerClasses="!bg-background hover:!border-input/50 !border-input !text-foreground !rounded-xl"
    on:drop={handleFilesSelect}
    inputElement
    accept={['image/*']}
    multiple={false}
  >
    <div>
      <span class="underline">Click to upload</span>
      <span>or drag and drop here</span>
    </div>
    <span>SVG, PNG or JPG (max. 2MB)</span>
  </Dropzone>
  {#if file.rejected}
    <p class="!m-0 text-center text-red-500" transition:fade>
      {parseErrorMessage(file.rejected[0].errors[0].message)}
    </p>
  {/if}
{:else if imageResult}
  <div class="flex flex-col items-center w-full gap-4">
    <div in:blur={{ duration: 200 }}>
      <Avatar
        class="w-28 h-28"
        parse={false}
        src={imageResult}
        alt={'Profile Picture'}
      />
    </div>
  </div>
{/if}

<form
  enctype="multipart/form-data"
  action="?/updateProfilePicture"
  method="POST"
  use:enhance={() => {
    uploadInProgress = true

    return async ({ result }) => {
      if (result.type == 'success') {
        openDialog = false
        await invalidateAll()
      }
      applyAction(result)
    }
  }}
>
  <input type="file" name="avatar" bind:this={imageInputElement} hidden />

  <Dialog.Footer class="!flex !justify-center !w-full">
    <Button
      variant="destructive"
      disabled={(file.accepted == null ?? false) || uploadInProgress}
      on:click={handleRemoveFile}>Remove</Button
    >
    <Button
      disabled={(file.accepted == null ?? false) || uploadInProgress}
      type="submit">Save changes</Button
    >
  </Dialog.Footer>
</form>
