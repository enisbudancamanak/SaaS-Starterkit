<script lang="ts">
  // Components
  import PersonalInfo from '$lib/components/settings/profile/personalInfo.svelte'
  import DeleteAccount from '$lib/components/settings/profile/deleteAccount.svelte'
  import ChangePassword from '$lib/components/settings/profile/changePassword.svelte'

  import Card from '$lib/components/settings/card.svelte'
  import Avatar from '$lib/components/settings/profile/avatar.svelte'
  import { Separator } from '$lib/components/ui/separator'

  // Types
  import type { PageData } from './$types'

  export let data: PageData
</script>

<div class="space-y-0.5">
  <h2>Profile</h2>
</div>
<Separator class="my-6" />

<!-- Edit Profile -->
<Card class="p-6 !h-fit bg-accent/40 mb-4">
  <Avatar user={data.user} />

  <Separator class="my-4" />

  <div class="flex flex-col gap-4 p-6 border rounded-xl bg-accent/40">
    <PersonalInfo form={data.personalForm} user={data.user} />
  </div>
  <Separator class="my-4" />

  <div class="flex flex-col gap-4 p-6 border rounded-xl bg-accent/40">
    <ChangePassword form={data.passwordForm} />
  </div>
</Card>

<!-- Delete Account -->
<Card
  class="px-8 py-4 !h-fit bg-accent/40 flex flex-col gap-4 p-6 border border-destructive"
>
  <DeleteAccount />
</Card>
