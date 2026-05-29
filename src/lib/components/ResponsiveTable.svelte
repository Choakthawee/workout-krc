<script lang="ts">
	import type { TableRow } from '$lib/data/profiles';

	let { headers, rows }: { headers: string[]; rows: TableRow[] } = $props();

	let moveColumnIndex = $derived(headers.findIndex((header) => header === 'ท่า'));
	let hasMoveColumn = $derived(moveColumnIndex !== -1);
	let orderColumnIndex = $derived(headers.findIndex((header) => header === 'ลำดับ'));
	let openRows = $state<Record<string, boolean>>({});

	function exerciseNumber(row: TableRow, rowIndex: number) {
		return orderColumnIndex === -1 ? String(rowIndex + 1) : row.cells[orderColumnIndex];
	}

	function isRowOpen(row: TableRow, rowIndex: number) {
		return openRows[row.id] ?? rowIndex === 0;
	}

	function showDetailCell(cellIndex: number) {
		return cellIndex !== moveColumnIndex && cellIndex !== orderColumnIndex;
	}

	function toggleRow(row: TableRow, rowIndex: number) {
		openRows[row.id] = !isRowOpen(row, rowIndex);
	}
</script>

{#if hasMoveColumn}
	<div class="exercise-list">
		{#each rows as row, rowIndex (row.id)}
			{@const expanded = isRowOpen(row, rowIndex)}
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
						<strong>{row.cells[moveColumnIndex]}</strong>
					</span>
					<span class="collapse-arrow exercise-arrow" aria-hidden="true"></span>
				</button>

				<div
					id={`${row.id}-details`}
					class={['collapse-shell', 'exercise-collapse', expanded && 'open']}
					aria-hidden={!expanded}
				>
					<div class="collapse-inner exercise-details">
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
