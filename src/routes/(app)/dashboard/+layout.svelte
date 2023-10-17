<script lang="ts">
  // Icons
  import OverviewIcon from '~icons/ph/squares-four-bold'
  import DeliveryIcon from '~icons/material-symbols/package-2'
  import CustomerIcon from '~icons/material-symbols/shopping-cart'
  import SubscriptionIcon from '~icons/material-symbols/payments'

  // UI
  import SidebarNav from '$lib/components/sidebar.svelte'
  import Time from 'svelte-time/src/Time.svelte'

  // Items Sidebar
  const sidebarNavItems = [
    {
      title: null,
      items: [
        {
          icon: OverviewIcon,
          title: 'Overview',
          href: '/dashboard',
        },
        {
          icon: DeliveryIcon,
          title: 'Orders',
          href: '/dashboard/orders',
        },
        {
          icon: CustomerIcon,
          title: 'Customers',
          href: '/dashboard/customers',
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
      <p class="text-sm text-muted-foreground">
        <Time timestamp={new Date()} format="ddd D MMM, hh:mm A" />
      </p>
      <slot />
    </div>
  </div>
</div>
