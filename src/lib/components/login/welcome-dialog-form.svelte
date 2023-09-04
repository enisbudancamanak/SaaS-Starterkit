<script lang="ts">
  import { onMount } from 'svelte'

  // Icons
  import RandomLogo from '~icons/fa6-solid/blog'

  // UI
  import { Button } from '$lib/components/ui/button'
  import { Input } from '$lib/components/ui/input'
  import * as Select from '$lib/components/ui/select'
  import * as AlertDialog from '$lib/components/ui/alert-dialog'

  // Roles Select
  const roles = [
    { value: 'student', label: 'Student' },
    { value: 'employee', label: 'Employee' },
  ]

  // Trigger Modal
  onMount(() => {
    setTimeout(() => {
      //@ts-ignore
      document.querySelector('#trigger').click()
    }, 500)
  })
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger asChild let:builder>
    <Button id="trigger" builders={[builder]} class="hidden" variant="outline"
      >Show Dialog</Button
    >
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header class="mb-6">
      <div class="flex flex-col items-center justify-center w-full gap-1">
        <RandomLogo class="w-12 h-12" />
        <AlertDialog.Title class="text-3xl font-bold tracking-tight text-center"
          >Welcome to SaaS-Kit</AlertDialog.Title
        >
        <AlertDialog.Description class="text-center text-muted-foreground"
          >Tell us about yourself</AlertDialog.Description
        >
      </div>
    </AlertDialog.Header>

    <!-- Content -->
    <Input id="name" placeholder="Your name" />
    <Select.Root>
      <Select.Trigger class="w-full">
        <Select.Value placeholder="What is your role?" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          {#each roles as role}
            <Select.Item value={role.value} label={role.label}
              >{role.label}</Select.Item
            >
          {/each}
        </Select.Group>
      </Select.Content>
      <Select.Input name="roleSelect" />
    </Select.Root>

    <!-- Save -->
    <AlertDialog.Footer>
      <AlertDialog.Action class="w-full text-foreground"
        >Continue</AlertDialog.Action
      >
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
