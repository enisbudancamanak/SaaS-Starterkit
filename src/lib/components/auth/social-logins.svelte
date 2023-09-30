<script>
  // Icons
  import GithubIcon from '~icons/mdi/github'
  import GoogleIcon from '~icons/mdi/google'

  // UI
  import { Button } from '$lib/components/ui/button'
</script>

<div class="flex w-full gap-4">
  <!-- GitHub -->
  <a class="flex-1" href="/oauth/github">
    <Button class="w-full" variant="outline" type="button">
      <GithubIcon class="w-4 h-4 mr-2" />
      GitHub
    </Button>
  </a>

  <!-- Google -->
  <a class="flex-1" href="/oauth/google">
    <Button class="w-full" variant="outline" type="button">
      <GoogleIcon class="w-4 h-4 mr-2" />
      Google
    </Button>
  </a>
</div>
