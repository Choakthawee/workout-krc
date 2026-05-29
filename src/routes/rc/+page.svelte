<script lang="ts">
	import AppShell from '$lib/components/AppShell.svelte';
	import ProfileProgram from '$lib/components/ProfileProgram.svelte';
	import { profiles } from '$lib/data/profiles';
</script>

<AppShell active="rc">
	<ProfileProgram profile={profiles.rc} />
</AppShell>
