<script lang="ts">
  // Icons
  import PersonIcon from '~icons/material-symbols/person'
  import DeliveryIcon from '~icons/material-symbols/package-2'

  // UI
  import SidebarNav from '$lib/components/sidebar.svelte'
  import type { PageData } from './$types'

  // Items Sidebar
  const sidebarNavItems = [
    {
      title: 'Account',
      items: [
        {
          icon: PersonIcon,
          title: 'Profile',
          href: '/settings/account',
        },
        {
          icon: PersonIcon,
          title: 'Login Connections',
          href: '/settings/account/login-connections',
        },
      ],
    },
    {
      title: 'Bank',
      items: [
        {
          icon: DeliveryIcon,
          title: 'Billing',
          href: '/dashboard/orders',
        },
        {
          icon: PersonIcon,
          title: 'Invoices',
          href: '/dashboard',
        },
      ],
    },
  ]
</script>

<div class="h-full p-10 pb-16 space-y-6 rounded-xl bg-background">
  <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
    <aside class="-mx-4 lg:w-1/6">
      <SidebarNav navItems={sidebarNavItems} />
    </aside>
    <div class="flex-1">
      <slot />
    </div>
  </div>
</div>
