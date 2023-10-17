<script lang="ts">
  // Icons
  import GithubIcon from '~icons/mdi/github'
  import GoogleIcon from '~icons/mdi/google'
  import EmailIcon from '~icons/mdi/email'

  // Components
  import Card from '$lib/components/settings/card.svelte'
  import { Separator } from '$lib/components/ui/separator'
  import { Button } from '$lib/components/ui/button'

  // Types
  import type { PageData } from './$types'
  import Time from 'svelte-time/src/Time.svelte'

  export let data: PageData
</script>

<div class="space-y-0.5">
  <h2>Login Connections</h2>
</div>
<Separator class="my-6" />

<Card class="p-6 !h-fit bg-accent/40  mb-4">
  {#if data.logins}
    <div class="flex flex-col gap-4">
      {#each data.logins as login}
        <div class="flex items-center gap-2 p-4 border rounded-xl bg-accent/40">
          {#if login.provider === 'github'}
            <GithubIcon class="w-6 h-6 mr-2" />
            <div class="flex flex-col gap-0">
              <h5 class="font-bold">GitHub</h5>
              <a
                class="text-sm link text-muted-foreground"
                href={'https://gtihub.com/' + login.name}
              >
                {'@'}{login.name}
              </a>
            </div>
          {:else if login.provider === 'google'}
            <GoogleIcon class="w-6 h-6 mr-2" />
          {:else if login.provider === 'email'}
            <EmailIcon class="w-6 h-6 mr-2" />
            <div class="flex flex-col gap-0">
              <h5 class="font-bold">E-Mail</h5>
              <span class="text-sm link text-muted-foreground">
                {login.name}
              </span>
            </div>
          {/if}

          <div class="flex-1 text-sm text-right text-muted-foreground">
            Connected
            <Time
              relative
              class=""
              timestamp={login.created_at}
              format="ddd D MMM"
            />
          </div>
          <Button variant="ghost" size="sm">...</Button>
        </div>
      {/each}
    </div>
  {/if}
</Card>
