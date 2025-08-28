<script lang="ts">
	import type { Todo } from '$lib/types/todo';
	import { formatDate } from '$lib/helpers/DateHelper';
	import { getTodos } from '$lib/state/Todos.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';
	import IconCalendarClock from '@lucide/svelte/icons/calendar-clock';
	import { DatePicker } from "@svelte-plugins/datepicker";

	let { todo, reversed = false } = $props<{
		todo: Todo,
		reversed?: boolean
	}>();

	let isOpen = $state<boolean>(false),
		startDate = $state<Date | null>(new Date(todo.due_at));

	const todos = getTodos(),
		ts = getTranslation(),
		loadingIndicator = getLoadingIndicator();

	function toggleDatePicker(): void {
		isOpen = !isOpen;
	}

	async function onChange(): Promise<void> {
		loadingIndicator.start();
		await todos.changeDue(todo, formatDate(startDate));
		loadingIndicator.stop();
	}
</script>


{#if todo.due_at !== null}
	<div
		class="cursor-pointer flex {reversed ? 'flex-row-reverse' : 'flex-row'} gap-2 items-center justify-end"
		class:pr-4={todos.view === 'list'}
		class:ml-1={todos.view === 'kanban'}
		onclick={toggleDatePicker}
	>
		<span>{formatDate(todo.due_at)}</span>
		<IconCalendarClock class="size-4 shrink-0" />
	</div>
{:else}
	<div class="{todos.view === 'list' ? 'w-full text-right pr-4' : ''}">
		<button
			class="cursor-pointer text-xs text-surface-300 hover:text-surface-700 dark:hover:text-surface-400 transition-all"
			class:opacity-0={todos.view === 'list'}
			class:group-hover:opacity-100={todos.view === 'list'}
			onclick={toggleDatePicker}>+ {ts.get.todos.add_due_at}</button>
	</div>
{/if}
<DatePicker
	align="right"
	onDateChange={onChange}
	enableFutureDates={true}
	enablePastDates={true}
	startOfWeek=1
	bind:isOpen
	bind:startDate
>
	<input type="text" class="hidden" bind:value={startDate} />
</DatePicker>