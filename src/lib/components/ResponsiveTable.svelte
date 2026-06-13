<script lang="ts">
	import type { TableRow } from '$lib/data/profiles';
	import { readStoredValue, writeStoredValue } from '$lib/utils/persisted-state';

	type ResponsiveTableState = {
		selectedWeek: string;
		openRows: Record<string, boolean>;
	};

	let {
		headers,
		rows,
		storageScope = 'default',
		storageKey = 'table'
	}: {
		headers: string[];
		rows: TableRow[];
		storageScope?: string;
		storageKey?: string;
	} = $props();

	let moveColumnIndex = $derived(headers.findIndex((header) => header === 'ท่า'));
	let hasMoveColumn = $derived(moveColumnIndex !== -1);
	let orderColumnIndex = $derived(headers.findIndex((header) => header === 'ลำดับ'));
	let weekOptions = $derived(headers.filter(isWeekHeader));
	let selectedWeek = $state('');
	let activeWeek = $derived(weekOptions.includes(selectedWeek) ? selectedWeek : weekOptions[0]);
	let weekPickerId = $derived(`week-picker-${rows[0]?.id ?? headers.length}`);
	let openRows = $state<Record<string, boolean>>({});

	$effect(() => {
		const fallbackWeek = weekOptions[0] ?? '';
		const persisted = readStoredValue<ResponsiveTableState>(`${storageScope}:${storageKey}`, {
			selectedWeek: fallbackWeek,
			openRows: {}
		});
		selectedWeek = weekOptions.includes(persisted.selectedWeek)
			? persisted.selectedWeek
			: fallbackWeek;
		openRows = Object.fromEntries(
			Object.entries(persisted.openRows ?? {}).filter(([rowId]) =>
				rows.some((row) => row.id === rowId)
			)
		);
	});

	$effect(() => {
		writeStoredValue(`${storageScope}:${storageKey}`, { selectedWeek, openRows });
	});

	function isWeekHeader(header: string) {
		return /^W\d+$/.test(header);
	}

	function exerciseNumber(row: TableRow, rowIndex: number) {
		return orderColumnIndex === -1 ? String(rowIndex + 1) : row.cells[orderColumnIndex];
	}

	function exerciseMove(row: TableRow) {
		return row.cells[moveColumnIndex] ?? '';
	}

	function exerciseTitle(row: TableRow) {
		const move = exerciseMove(row);
		const separatorIndex = move.indexOf(' - ');

		return separatorIndex === -1 ? move : move.slice(0, separatorIndex);
	}

	function exerciseDescription(row: TableRow) {
		const move = exerciseMove(row);
		const separatorIndex = move.indexOf(' - ');

		return separatorIndex === -1 ? '' : move.slice(separatorIndex + 3);
	}

	function isRowOpen(row: TableRow, rowIndex: number) {
		return openRows[row.id] ?? rowIndex === 0;
	}

	function showDetailCell(cellIndex: number) {
		const header = headers[cellIndex];

		if (cellIndex === moveColumnIndex || cellIndex === orderColumnIndex) return false;
		if (isWeekHeader(header)) return header === activeWeek;

		return true;
	}

	function toggleRow(row: TableRow, rowIndex: number) {
		openRows[row.id] = !isRowOpen(row, rowIndex);
	}
</script>

{#if hasMoveColumn}
	{#if weekOptions.length > 0}
		<div class="week-picker">
			<label for={weekPickerId}>Week</label>
			<select id={weekPickerId} bind:value={selectedWeek}>
				{#each weekOptions as week (week)}
					<option value={week}>{week}</option>
				{/each}
			</select>
		</div>
	{/if}

	<div class="exercise-list">
		{#each rows as row, rowIndex (row.id)}
			{@const expanded = isRowOpen(row, rowIndex)}
			{@const description = exerciseDescription(row)}
			<article class={['exercise-card', expanded && 'open']}>
				<button
					class="exercise-summary"
					type="button"
					aria-expanded={expanded}
					aria-controls={`${row.id}-details`}
					onclick={() => toggleRow(row, rowIndex)}
				>
					<span class="exercise-number">{exerciseNumber(row, rowIndex)}</span>
					<span class="exercise-title">
						<small>ท่า</small>
						<strong>{exerciseTitle(row)}</strong>
					</span>
					<span class="collapse-arrow exercise-arrow" aria-hidden="true"></span>
				</button>

				<div
					id={`${row.id}-details`}
					class={['collapse-shell', 'exercise-collapse', expanded && 'open']}
					aria-hidden={!expanded}
				>
					<div class="collapse-inner exercise-details">
						{#if description}
							<div class="exercise-description">
								<strong>คำอธิบาย</strong>
								<span>{description}</span>
							</div>
						{/if}

						{#each row.cells as cell, cellIndex (`${row.id}-${headers[cellIndex]}`)}
							{#if showDetailCell(cellIndex)}
								<div>
									<strong>{headers[cellIndex]}</strong>
									<span>{cell}</span>
								</div>
							{/if}
						{/each}
					</div>
				</div>
			</article>
		{/each}
	</div>
{:else}
	<div class="table-scroll">
		<table class="program-table">
			<thead>
				<tr>
					{#each headers as header (header)}
						<th>{header}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each rows as row (row.id)}
					<tr>
						{#each row.cells as cell, cellIndex (`${row.id}-${headers[cellIndex]}`)}
							<td data-label={headers[cellIndex]}>{cell}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}
