<script lang="ts">
  import '$lib/styles/cookieBanner.postcss' // optional, you can also define your own styles
  import { Banner as GdprBanner } from '@beyonk/gdpr-cookie-consent-banner'
  import { onMount } from 'svelte'

  // UI
  // import * as AlertDialog from '$lib/components/ui/alert-dialog'
  // import { Button } from '$lib/components/ui/button'

  function initAnalytics() {
    // do something with segment.io or google analytics etc
  }

  let cookieBannerOpen = true
  // onMount(() => {
  //   document.addEventListener('keydown', function (e) {
  //     if (e.which == 9) {
  //       // keycode for tab key
  //       if (cookieBannerOpen) {
  //         e.preventDefault()
  //       }
  //     }
  //   })
  // })

  const props = {
    cookieName: 'cookieBanner',
    cookieConfig: {
      domain: 'localhost',
      path: '/',
    },
    heading: 'Cookies at SaaS-Startkit',
    description:
      'We use cookies to give you the best online experience. Cookies keep Our Site secure and reliable They let us personalise SaaS-Startkit.com to you and help us analyse how the Site is used.',
    acceptLabel: 'Allow all',
    rejectLabel: 'Reject all',
    settingsLabel: 'Manage preferences',
    closeLabel: 'Close window',
    editLabel: 'Edit settings',
    choices: {
      tracking: {
        label: 'Tracking cookies',
        description: 'Used for advertising purposes.',
        value: false,
      },
      analytics: {
        label: 'Analytics cookies',
        description:
          'Used to control Google Analytics, a 3rd party tool offered by Google to track user behavior.',
        value: false,
      },
      marketing: {
        label: 'Marketing cookies',
        description: 'Used for marketing data.',
        value: false,
      },
      necessary: {
        label: 'Necessary cookies',
        description: "Used for cookie control. Can't be turned off.",
        value: true,
      },
    },
    showEditIcon: true,
    categories: {
      analytics: function () {
        console.log('No analytics cookies specified')
      },
      tracking: function () {
        console.log('No tracking cookies specified')
      },
      marketing: function () {
        console.log('No marketing cookies specified')
      },
      necessary: function () {
        console.log('No necessary cookies specified')
      },
    },
  }
</script>

<GdprBanner on:analytics={initAnalytics} {...props} />

<style>
</style>
