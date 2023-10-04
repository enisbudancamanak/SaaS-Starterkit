<script lang="ts">
  import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
  } from 'lucide-svelte'

  import { Button } from '$lib/components/ui/button'
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu'
  import * as Avatar from '$lib/components/ui/avatar'

  import { enhance } from '$app/forms'

  let formLogout: HTMLFormElement

  // dark mode toggle
  let darkModePosition: string = localStorage.getItem('dark-mode')
    ? (localStorage.getItem('dark-mode') as string)
    : 'system'

  $: if (darkModePosition) {
    if (darkModePosition === 'system') {
      localStorage.removeItem('dark-mode')
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? document.documentElement.classList.add('dark')
        : document.documentElement.classList.remove('dark')
    } else if (darkModePosition === 'enabled') {
      enableDarkMode()
    } else if (darkModePosition === 'disabled') {
      disableDarkMode()
    }
  }

  const enableDarkMode = () => {
    document.documentElement.classList.add('dark')
    localStorage.setItem('dark-mode', 'enabled')
  }

  const disableDarkMode = () => {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('dark-mode', 'disabled')
  }
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <!-- <Button builders={[builder]} variant="default">Open</Button> -->
    <Button
      variant="ghost"
      builders={[builder]}
      class="relative w-10 h-10 rounded-full"
    >
      <Avatar.Root class="w-10 h-10">
        <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
        <Avatar.Fallback>SC</Avatar.Fallback>
      </Avatar.Root>
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56">
    <DropdownMenu.Label>My Account</DropdownMenu.Label>
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
    <DropdownMenu.Group>
      <DropdownMenu.Item>
        <Users class="w-4 h-4 mr-2" />
        <span>Team</span>
      </DropdownMenu.Item>
      <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger>
          <UserPlus class="w-4 h-4 mr-2" />
          <span>Theme</span>
        </DropdownMenu.SubTrigger>
        <DropdownMenu.SubContent>
          <DropdownMenu.RadioGroup bind:value={darkModePosition}>
            <DropdownMenu.RadioItem value="system"
              >System</DropdownMenu.RadioItem
            >
            <DropdownMenu.RadioItem value="enabled">Dark</DropdownMenu.RadioItem
            >
            <DropdownMenu.RadioItem value="disabled"
              >Light</DropdownMenu.RadioItem
            >
          </DropdownMenu.RadioGroup>
        </DropdownMenu.SubContent>
      </DropdownMenu.Sub>
      <DropdownMenu.Item>
        <Plus class="w-4 h-4 mr-2" />
        <span>New Team</span>
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>
      <Github class="w-4 h-4 mr-2" />
      <span>GitHub</span>
    </DropdownMenu.Item>
    <DropdownMenu.Item>
      <LifeBuoy class="w-4 h-4 mr-2" />
      <span>Support</span>
    </DropdownMenu.Item>
    <DropdownMenu.Item>
      <Cloud class="w-4 h-4 mr-2" />
      <span>API</span>
    </DropdownMenu.Item>
    <DropdownMenu.Separator />
    <form
      id="formLogout"
      action="?/logout"
      method="post"
      use:enhance
      bind:this={formLogout}
    >
      <DropdownMenu.Item
        class={'cursor-pointer'}
        on:click={() => {
          formLogout.submit()
        }}
      >
        <LogOut class="w-4 h-4 mr-2" />
        <span>Logout</span>
      </DropdownMenu.Item>
    </form>
  </DropdownMenu.Content>
</DropdownMenu.Root>
