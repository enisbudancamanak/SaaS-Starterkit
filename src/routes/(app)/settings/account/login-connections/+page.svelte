<script lang="ts">
  // Icons
  import GithubIcon from '~icons/mdi/github'
  import GoogleIcon from '~icons/mdi/google'
  import EmailIcon from '~icons/mdi/email'
  import ArrowURight from '~icons/lucide/arrow-up-right'

  // Components
  import Card from '$lib/components/settings/card.svelte'
  import { Separator } from '$lib/components/ui/separator'
  import { Button } from '$lib/components/ui/button'

  // Types
  import type { PageData } from './$types'
  import Time from 'svelte-time/src/Time.svelte'
  import { enhance } from '$app/forms'

  export let data: PageData
</script>

<div class="space-y-0.5">
  <h2>Login Connections</h2>
  <p class="text-muted-foreground">
    Manage your login connections to this account.
  </p>
</div>
<Separator class="my-6" />

<Card class="p-6 !h-fit bg-accent/40  mb-4">
  <!-- Add new Login connection -->

  {#if data.logins}
    <div class="flex flex-col gap-4">
      {#each data.logins as login}
        <div class="flex items-center gap-2 p-4 border rounded-xl bg-accent/40">
          {#if login.provider === 'github'}
            <GithubIcon class="w-6 h-6 mr-2" />
            <div class="flex flex-col gap-0">
              <h5 class="font-bold">GitHub</h5>
              <a
                target="_blank"
                class="text-sm link text-muted-foreground"
                href={'https://github.com/' + login.name}
              >
                {'@'}{login.name}
              </a>
            </div>
            <div
              class="flex flex-col items-end flex-1 gap-2 text-sm text-muted-foreground"
            >
              <span>
                Connected
                <Time relative live class="" timestamp={login.created_at} />
              </span>
              <div class="flex gap-2">
                <Button
                  target="_blank"
                  href="https://github.com/settings/connections/applications/4fc8bf033de79e87363d"
                  variant="outline"
                  size="sm"
                  >Manage <ArrowURight class="w-4 h-4 ml-1" />
                </Button>
                {#if data.primaryEmail}
                  <form use:enhance method="post" action="?/disconnect">
                    <input type="text" name="id" value={login.id} hidden />
                    <Button
                      class="text-destructive"
                      target="_blank"
                      variant="outline"
                      size="sm"
                      >Disconnect
                    </Button>
                  </form>
                {/if}
              </div>
            </div>
          {:else if login.provider === 'google'}
            <GoogleIcon class="w-6 h-6 mr-2" />
            <div class="flex flex-col gap-0">
              <h5 class="font-bold">Google</h5>
              <span class="text-sm link text-muted-foreground">
                {login.email}
              </span>
            </div>
            <div
              class="flex flex-col items-end flex-1 gap-2 text-sm text-muted-foreground"
            >
              <span>
                Connected
                <Time relative live class="" timestamp={login.created_at} />
              </span>
              <div class="flex gap-2">
                <Button
                  target="_blank"
                  href="https://myaccount.google.com/connections/overview/ChQaEgoNMTAwNjM3MjE2MTM4OBoBBA"
                  variant="outline"
                  size="sm">Manage <ArrowURight class="w-4 h-4 ml-1" /></Button
                >
                {#if data.primaryEmail}
                  <form use:enhance method="post" action="?/disconnect">
                    <input type="text" name="id" value={login.id} hidden />
                    <Button
                      class="text-destructive"
                      target="_blank"
                      variant="outline"
                      size="sm"
                      >Disconnect
                    </Button>
                  </form>
                {/if}
              </div>
            </div>
          {:else if login.provider === 'email'}
            <EmailIcon class="w-6 h-6 mr-2" />
            <div class="flex flex-col gap-0">
              <h5 class="font-bold">E-Mail</h5>
              <span class="text-sm link text-muted-foreground">
                {login.name}
              </span>
            </div>
            <div class="flex-1 text-sm text-right text-muted-foreground">
              Connected
              <Time relative live class="" timestamp={login.created_at} />
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</Card>

<!-- Manage: https://github.com/settings/connections/applications/4fc8bf033de79e87363d -->
