<script lang="ts">
  import { enhance } from '$app/forms'

  // Components
  import * as AlertDialog from '$lib/components/ui/alert-dialog'
  import { Button } from '$lib/components/ui/button'
</script>

<h4>Delete Account</h4>

<span
  >This action will permanently delete your account and all of its contents from
  our platform, including your projects, deployments, and team memberships. This
  action cannot be undone, so please proceed with caution.
</span>

<div>
  <AlertDialog.Root closeOnOutsideClick>
    <AlertDialog.Trigger asChild let:builder>
      <Button builders={[builder]} size="default" variant="destructive"
        >Delete Account</Button
      >
    </AlertDialog.Trigger>
    <AlertDialog.Content class="border-destructive">
      <AlertDialog.Header>
        <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>

        <form action="?/deleteAccount" method="post" use:enhance>
          <AlertDialog.Action
            type="submit"
            class="bg-destructive text-foreground hover:bg-destructive/80"
          >
            Continue
          </AlertDialog.Action>
        </form>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
</div>
