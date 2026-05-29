<script lang="ts">
	import { CalendarDays, Clock3, Gauge, Target } from '@lucide/svelte';
	import type { ProfileProgram, WeekdayId } from '$lib/data/profiles';
	import ProgramBlocks from './ProgramBlocks.svelte';

	let { profile }: { profile: ProfileProgram } = $props();

	let selectedDayId = $state<WeekdayId>('monday');
	let selectedDay = $derived.by(() => profile.days.find((day) => day.id === selectedDayId));
	let trainingDays = $derived(
		profile.days
			.filter((day) => day.type === 'training')
			.map((day) => day.label.replace('วัน', ''))
			.join(' / ')
	);

	function selectDay(dayId: WeekdayId) {
		selectedDayId = dayId;
	}
</script>

<section class="day-planner" aria-labelledby={`${profile.key}-day-title`}>
	<div class="day-planner-head">
		<div>
			<p class="eyebrow">เลือกวันซ้อม</p>
			<h2 id={`${profile.key}-day-title`}>กดวันจันทร์-วันอาทิตย์เพื่อดู workout</h2>
			<p>{profile.name}: วันซ้อมหลัก {trainingDays}</p>
		</div>
		<div class="planner-badge">
			<CalendarDays size={18} strokeWidth={2.35} />
			<span>7 days</span>
		</div>
	</div>

	<div class="day-tabs" aria-label={`${profile.name} workout days`}>
		{#each profile.days as day (day.id)}
			<button
				class={['day-tab', selectedDayId === day.id && 'active', day.type]}
				type="button"
				aria-pressed={selectedDayId === day.id}
				onclick={() => selectDay(day.id)}
				style:--day-color={day.color}
			>
				<strong>{day.label}</strong>
				<span>{day.shortLabel}</span>
			</button>
		{/each}
	</div>

	{#if selectedDay}
		<article class="selected-day-card" style:--day-color={selectedDay.color}>
			<div class="selected-day-top">
				<div>
					<p class="eyebrow">{selectedDay.label}</p>
					<h2>{selectedDay.title}</h2>
					<p>{selectedDay.summary}</p>
				</div>
				<span class={['day-type', selectedDay.type]}>{selectedDay.type}</span>
			</div>

			<div class="day-meta-grid">
				<div>
					<Clock3 size={18} strokeWidth={2.35} />
					<span>{selectedDay.duration}</span>
				</div>
				<div>
					<Gauge size={18} strokeWidth={2.35} />
					<span>{selectedDay.intensity}</span>
				</div>
				<div>
					<Target size={18} strokeWidth={2.35} />
					<span>{selectedDay.focus.join(', ')}</span>
				</div>
			</div>

			<div class="focus-row">
				{#each selectedDay.focus as focus (focus)}
					<span>{focus}</span>
				{/each}
			</div>

			<div class="selected-day-blocks">
				<ProgramBlocks blocks={selectedDay.blocks} />
			</div>
		</article>
	{/if}
</section>
