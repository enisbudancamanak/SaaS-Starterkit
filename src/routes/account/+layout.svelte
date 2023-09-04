<script lang="ts">
  // Icons
  import PersonIcon from '~icons/material-symbols/person'
  import MoneyIcon from '~icons/material-symbols/attach-money-rounded'

  // UI
  import SidebarNav from '$lib/components/sidebar.svelte'
  import { Separator } from '$lib/components/ui/separator'

  // Items Sidebar
  const sidebarNavItems = [
    {
      icon: PersonIcon,
      title: 'Account',
      href: '/account',
    },
    {
      icon: MoneyIcon,
      title: 'Billing',
      href: '/account/billing',
    },
  ]
</script>

<div class="w-full h-full p-10 pb-16 space-y-6 rounded-xl bg-background">
  <div class="space-y-0.5">
    <h2>Settings</h2>
    <p class="text-muted-foreground">
      Manage your account settings and set e-mail preferences.
    </p>
  </div>
  <Separator class="my-6" />
  <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
    <aside class="-mx-4 lg:w-1/5">
      <SidebarNav items={sidebarNavItems} />
    </aside>
    <div class="flex-1 lg:max-w-2xl">
      <slot />
    </div>
  </div>
</div>
