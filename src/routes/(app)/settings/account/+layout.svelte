<script lang="ts">
  // Icons
  import PersonIcon from '~icons/material-symbols/person'
  import DeliveryIcon from '~icons/material-symbols/package-2'
  import ChartIcon from '~icons/material-symbols/chart-data-rounded'
  import CustomerIcon from '~icons/material-symbols/shopping-cart'

  // UI
  import SidebarNav from '$lib/components/sidebar.svelte'

  // Items Sidebar
  const sidebarNavItems = [
    {
      title: 'Profile',
      items: [
        {
          icon: PersonIcon,
          title: 'Edit Profile',
          href: '/settings/account',
        },
      ],
    },
    {
      title: 'Bank',
      items: [
        {
          icon: PersonIcon,
          title: 'Invoices',
          href: '/dashboard',
        },
        {
          icon: DeliveryIcon,
          title: 'Billing',
          href: '/dashboard/orders',
        },
      ],
    },
    {
      title: 'Secure',
      items: [
        {
          icon: PersonIcon,
          title: 'Password',
          href: '/dashboard',
        },
        {
          icon: PersonIcon,
          title: 'Login Connections',
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
