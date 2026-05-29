<script lang="ts">
	import type { ProfileProgram } from '$lib/data/profiles';
	import DayPlanner from './DayPlanner.svelte';
	import ProgramSection from './ProgramSection.svelte';

	let { profile }: { profile: ProfileProgram } = $props();
</script>

<svelte:head>
	<title>{profile.name} | Workout KRC</title>
	<meta name="description" content={profile.headline} />
</svelte:head>

<DayPlanner {profile} />

<div class="program-stack">
	{#each profile.sections as section (section.id)}
		<ProgramSection {section} />
	{/each}
</div>

<footer class="program-footer">
	{profile.footer}
</footer>
