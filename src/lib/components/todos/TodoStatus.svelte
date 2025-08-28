<script lang="ts">
	import type { Todo, TodoStatus } from '$lib/types/todo';
	import { getTodos } from '$lib/state/Todos.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';
	import { clickOutside } from '$lib/helpers/ClickHelper';

	let { todo, changeStatus } = $props<{ todo: Todo, changeStatus: boolean }>();
	const todos = getTodos(),
		ts = getTranslation(),
		loadingIndicator = getLoadingIndicator();

	let statusMenuVisible = $state<boolean>(false);

	function toggleStatusMenu(): void {
		statusMenuVisible = !statusMenuVisible;
	}

	async function handleStatusChange(todo: Todo, status: TodoStatus): Promise<void> {
		loadingIndicator.start();
		await todos.changeStatus(todo, status);
		await todos.load();

		toggleStatusMenu();
		loadingIndicator.stop();
	}


	function getColor(status: TodoStatus): string {
		switch (status) {
			case 'pending':
			default:
				return 'bg-surface-100';
			case 'backlog':
				return 'border-1 border-surface-100';
			case 'in-progress':
				return 'bg-primary-100';
			case 'waiting':
				return 'bg-secondary-100';
			case 'almost-done':
				return 'bg-success-100';
		}
	}

	function getLabel(status: TodoStatus): string {
		switch (status) {
			case 'pending':
			default:
				return ts.get.todos.status_pending;
			case 'backlog':
				return ts.get.todos.status_backlog;
			case 'in-progress':
				return ts.get.todos.status_in_progress;
			case 'waiting':
				return ts.get.todos.status_waiting;
			case 'almost-done':
				return ts.get.todos.status_almost_done;
		}
	}
</script>

<div class="relative">
	{#if changeStatus}
		<div class="cursor-pointer rounded-lg px-2 py-1 text-xs text-black {getColor(todo.status)}" onclick={toggleStatusMenu}>{getLabel(todo.status)}</div>
		{#if statusMenuVisible}
			<div use:clickOutside={() => { statusMenuVisible = false; }} class="absolute w-48 top-0 rounded-lg bg-white dark:bg-surface-700 text-black drop-shadow-lg z-30 flex flex-col gap-2 p-4">
				<div class="cursor-pointer rounded-lg px-2 py-1 text-xs dark:text-white {getColor('backlog')}" onclick={() => handleStatusChange(todo, 'backlog')}>{getLabel('backlog')}</div>
				<div class="cursor-pointer rounded-lg px-2 py-1 text-xs {getColor('pending')}" onclick={() => handleStatusChange(todo, 'pending')}>{getLabel('pending')}</div>
				<div class="cursor-pointer rounded-lg px-2 py-1 text-xs {getColor('in-progress')}" onclick={() => handleStatusChange(todo, 'in-progress')}>{getLabel('in-progress')}</div>
				<div class="cursor-pointer rounded-lg px-2 py-1 text-xs {getColor('waiting')}" onclick={() => handleStatusChange(todo, 'waiting')}>{getLabel('waiting')}</div>
				<div class="cursor-pointer rounded-lg px-2 py-1 text-xs {getColor('almost-done')}" onclick={() => handleStatusChange(todo, 'almost-done')}>{getLabel('almost-done')}</div>
			</div>
		{/if}
	{:else}
		<div class="rounded-lg px-2 py-1 text-xs {getColor(todo.status)}">{getLabel(todo.status)}</div>
	{/if}
</div>