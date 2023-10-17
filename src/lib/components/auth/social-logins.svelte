<script>
  // Icons
  import GithubIcon from '~icons/mdi/github'
  import GoogleIcon from '~icons/mdi/google'

  // UI
  import { Button } from '$lib/components/ui/button'
</script>

<div class="flex w-full gap-4">
  <!-- GitHub -->
  <Button href="/oauth/github" class="flex-1 w-full" variant="outline">
    <GithubIcon class="w-4 h-4 mr-2" />
    GitHub
  </Button>

  <!-- Google -->
  <Button href="/oauth/google" class="flex-1 w-full" variant="outline">
    <GoogleIcon class="w-4 h-4 mr-2" />
    Google
  </Button>
</div>
