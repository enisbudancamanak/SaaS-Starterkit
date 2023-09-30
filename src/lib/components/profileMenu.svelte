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
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
    <Button builders={[builder]} variant="outline">Open</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56">
    <DropdownMenu.Label>My Account</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
      <DropdownMenu.Item>
        <User class="w-4 h-4 mr-2" />
        <span>Profile</span>
        <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <CreditCard class="w-4 h-4 mr-2" />
        <span>Billing</span>
        <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <Settings class="w-4 h-4 mr-2" />
        <span>Settings</span>
        <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <Keyboard class="w-4 h-4 mr-2" />
        <span>Keyboard shortcuts</span>
        <DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
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
          <span>Invite users</span>
        </DropdownMenu.SubTrigger>
        <DropdownMenu.SubContent>
          <DropdownMenu.Item>
            <Mail class="w-4 h-4 mr-2" />
            <span>Email</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <MessageSquare class="w-4 h-4 mr-2" />
            <span>Message</span>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <PlusCircle class="w-4 h-4 mr-2" />
            <span>More...</span>
          </DropdownMenu.Item>
        </DropdownMenu.SubContent>
      </DropdownMenu.Sub>
      <DropdownMenu.Item>
        <Plus class="w-4 h-4 mr-2" />
        <span>New Team</span>
        <DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
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
    <DropdownMenu.Item>
      <LogOut class="w-4 h-4 mr-2" />
      <span>Log out</span>
      <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
