<script lang="ts">
  // Icons
  import PersonIcon from '~icons/material-symbols/person'
  import MoneyIcon from '~icons/material-symbols/attach-money-rounded'
  import ChartIcon from '~icons/material-symbols/chart-data-rounded'

  // UI
  import SidebarNav from '$lib/components/sidebar.svelte'

  // Items Sidebar
  const sidebarNavItems = [
    {
      icon: PersonIcon,
      title: 'Overview',
      href: '/dashboard',
    },
    {
      icon: MoneyIcon,
      title: 'Orders',
      href: '/dashboard/orders',
    },
    {
      icon: ChartIcon,
      title: 'Analytics',
      href: '/dashboard/analytics',
    },
  ]
</script>

<div class="h-full p-10 pb-16 space-y-6 rounded-xl bg-background">
  <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
    <aside class="-mx-4 lg:w-1/5">
      <SidebarNav items={sidebarNavItems} />
    </aside>
    <div class="flex-1">
      <slot />
    </div>
  </div>
</div>
