<script lang="ts">
	import type { ProgramBlock } from '$lib/data/profiles';
	import ResponsiveTable from './ResponsiveTable.svelte';

	let { blocks }: { blocks: ProgramBlock[] } = $props();

	function blockKey(block: ProgramBlock) {
		if (block.kind === 'table') return `table-${block.headers.join('-')}`;
		if (block.kind === 'callout') return `callout-${block.title ?? block.text}`;
		if (block.kind === 'list') return `list-${block.items[0]}`;
		if (block.kind === 'pills') return `pills-${block.intro}`;
		return `${block.kind}-${'title' in block ? block.title : block.text}`;
	}
</script>

{#each blocks as block (blockKey(block))}
	{#if block.kind === 'callout'}
		<div class={['callout', block.tone]}>
			{#if block.title}
				<strong>{block.title}</strong>
			{/if}
			<p>{block.text}</p>
		</div>
	{:else if block.kind === 'day-title'}
		<div class="day-title">{block.text}</div>
	{:else if block.kind === 'list'}
		<ul class="program-list">
			{#each block.items as item (item)}
				<li>{item}</li>
			{/each}
		</ul>
	{:else if block.kind === 'paragraph'}
		<p class="program-copy">{block.text}</p>
	{:else if block.kind === 'pills'}
		<p class="program-copy">{block.intro}</p>
		<div class="pill-row">
			{#each block.items as item (item)}
				<span>{item}</span>
			{/each}
		</div>
	{:else if block.kind === 'subheading'}
		<h3>{block.title}</h3>
	{:else if block.kind === 'table'}
		<ResponsiveTable headers={block.headers} rows={block.rows} />
	{/if}
{/each}
