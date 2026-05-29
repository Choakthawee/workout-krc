<script lang="ts">
	import { ChevronLeft, ChevronRight, Menu, X } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import type { Snippet } from 'svelte';
	import { profiles, type ProfileKey } from '$lib/data/profiles';

	let { active, children }: { active: ProfileKey; children: Snippet } = $props();

	let sidebarOpen = $state(false);
	let sidebarCollapsed = $state(false);

	let activeProfile = $derived(profiles[active]);

	const navItems: ProfileKey[] = ['karn', 'rc'];

	function closeSidebar() {
		sidebarOpen = false;
	}

	function toggleSidebar() {
		sidebarOpen = !sidebarOpen;
	}

	function toggleSidebarFold() {
		sidebarCollapsed = !sidebarCollapsed;
	}
</script>

<main
	class={['app', sidebarOpen && 'sidebar-open', sidebarCollapsed && 'sidebar-folded']}
	style:--accent={activeProfile.accent}
	style:--soft={activeProfile.soft}
	style:--cover={activeProfile.cover}
>
	<header class="mobile-top">
		<button
			class="icon-button"
			type="button"
			aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={sidebarOpen}
			onclick={toggleSidebar}
			title={sidebarOpen ? 'Close menu' : 'Open menu'}
		>
			{#if sidebarOpen}
				<X size={22} strokeWidth={2.4} />
			{:else}
				<Menu size={22} strokeWidth={2.4} />
			{/if}
		</button>

		<a
			class="wordmark"
			href={resolve(activeProfile.path)}
			aria-label={`${activeProfile.name} workout home`}
		>
			<span>{activeProfile.name}</span>
			<strong>{activeProfile.handle}</strong>
		</a>
	</header>

	{#if sidebarOpen}
		<button class="scrim" type="button" aria-label="Close menu" onclick={closeSidebar}></button>
	{/if}

	<aside class="sidebar" aria-label="Main navigation">
		<div class="sidebar-head">
			<span class={['sidebar-face', 'sidebar-profile-face', activeProfile.key]} aria-hidden="true"
			></span>
			<div class="brand-copy">
				<strong>{activeProfile.name}</strong>
				<span>{activeProfile.handle}</span>
			</div>

			<button
				class="icon-button close-button"
				type="button"
				aria-label="Close menu"
				onclick={closeSidebar}
				title="Close menu"
			>
				<X size={20} strokeWidth={2.4} />
			</button>

			<button
				class="icon-button fold-button"
				type="button"
				aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Fold sidebar'}
				onclick={toggleSidebarFold}
				title={sidebarCollapsed ? 'Expand sidebar' : 'Fold sidebar'}
			>
				{#if sidebarCollapsed}
					<ChevronRight size={20} strokeWidth={2.4} />
				{:else}
					<ChevronLeft size={20} strokeWidth={2.4} />
				{/if}
			</button>
		</div>

		<nav class="nav-list" aria-label="Profile menu">
			{#each navItems as key (key)}
				{@const item = profiles[key]}
				<a
					class={['nav-item', active === key && 'active']}
					href={resolve(item.path)}
					aria-current={active === key ? 'page' : undefined}
					onclick={closeSidebar}
				>
					<span class={['sidebar-face', key]} aria-hidden="true"></span>
					<span class="nav-copy">
						<strong>{item.name}</strong>
					</span>
				</a>
			{/each}
		</nav>
	</aside>

	<section class="content" aria-label={`${activeProfile.name} workout feed`}>
		{@render children()}
	</section>
</main>
