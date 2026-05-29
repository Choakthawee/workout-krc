<script lang="ts">
	import type { ProgramSection } from '$lib/data/profiles';
	import ProgramBlocks from './ProgramBlocks.svelte';

	let { section }: { section: ProgramSection } = $props();

	let expandedOverride = $state<boolean | undefined>();
	let expanded = $derived(expandedOverride ?? !section.defaultCollapsed);

	function toggleExpanded() {
		expandedOverride = !expanded;
	}
</script>

{#if section.collapsible}
	<section class={['program-section', 'collapsible-section', expanded && 'open']} id={section.id}>
		<button
			class="section-summary"
			type="button"
			aria-expanded={expanded}
			aria-controls={`${section.id}-body`}
			onclick={toggleExpanded}
		>
			<h2>{section.title}</h2>
			<span class="collapse-arrow" aria-hidden="true"></span>
		</button>
		<div
			id={`${section.id}-body`}
			class={['collapse-shell', 'section-collapse', expanded && 'open']}
			aria-hidden={!expanded}
		>
			<div class="collapse-inner section-body">
				<ProgramBlocks blocks={section.blocks} />
			</div>
		</div>
	</section>
{:else}
	<section class="program-section" id={section.id}>
		<h2>{section.title}</h2>
		<ProgramBlocks blocks={section.blocks} />
	</section>
{/if}
