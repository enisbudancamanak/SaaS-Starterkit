<script lang="ts">
  import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Plus,
    Settings,
    User,
    Users,
    Paintbrush,
    Paintbrush2,
  } from 'lucide-svelte'

  import * as Select from '$lib/components/ui/select'
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
  import * as Avatar from '$lib/components/ui/avatar'
  import { Button } from '$lib/components/ui/button'
  import CardGlance from './cardGlance.svelte'

  import { enhance } from '$app/forms'

  import { currentTheme } from '$lib/stores'
  import {
    enableDarkMode,
    enableLightMode,
    enableSystemMode,
  } from '$lib/themeSwitchHandler'

  export let user: any
</script>

<DropdownMenu.Root preventScroll={false} loop={true}>
  <DropdownMenu.Trigger asChild let:builder>
    <Button variant="ghost" builders={[builder]} class="!p-0 rounded-lg">
      <CardGlance
        glanceEffect={false}
        class="flex items-center gap-4 px-2 py-1 rounded-lg"
      >
        <div class="flex flex-col gap-0 ml-2 text-left">
          <span>{user.name}</span>
          <span class="text-xs text-muted-foreground">Super Admin</span>
        </div>
        <Avatar.Root class="w-8 h-8 rounded-sm">
          <Avatar.Image src={user.profilePicture} alt={'profilePicture'} />
          <Avatar.Fallback class="uppercase"
            >{user.name.slice(0, 2)}</Avatar.Fallback
          >
        </Avatar.Root>
      </CardGlance>
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56">
    <DropdownMenu.Label>{user.name}</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
      <DropdownMenu.Item>
        <User class="w-4 h-4 mr-2" />
        <span>Profile</span>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <CreditCard class="w-4 h-4 mr-2" />
        <span>Billing</span>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <Settings class="w-4 h-4 mr-2" />
        <span>Settings</span>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <Keyboard class="w-4 h-4 mr-2" />
        <span>Keyboard shortcuts</span>
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item class="flex justify-between gap-5">
      <div class="flex items-center">
        <Paintbrush2 class="w-4 h-4 mr-2" />
        <span>Theme</span>
      </div>
      <Select.Root preventScroll={false} selected={{ value: $currentTheme }}>
        <Select.Trigger class="w-full h-6 rounded-lg">
          <Select.Value
            placeholder={$currentTheme === 'system'
              ? 'System'
              : $currentTheme === 'enabled'
              ? 'Dark'
              : 'Light'}
          />
        </Select.Trigger>
        <Select.Content>
          <Select.Item value="disabled" on:click={enableLightMode}
            >Light</Select.Item
          >
          <Select.Item value="enabled" on:click={enableDarkMode}
            >Dark</Select.Item
          >
          <Select.Item value="system" on:click={enableSystemMode}
            >System</Select.Item
          >
        </Select.Content>
      </Select.Root>
    </DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>
      <LifeBuoy class="w-4 h-4 mr-2" />
      <span>Support</span>
    </DropdownMenu.Item>
    <DropdownMenu.Separator />

    <DropdownMenu.Item
      class="cursor-pointer text-destructive !p-0 !py-2 !px-2.5"
    >
      <form
        action="?/logout"
        method="post"
        use:enhance
        class="flex items-center"
      >
        <Button
          type="submit"
          variant="none"
          class="!py-1/.5 !h-0 !px-0 hover:!text-destructive-foreground"
        >
          <LogOut class="w-4 h-4 mr-2" />
          <span>Logout</span>
        </Button>
      </form>
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
