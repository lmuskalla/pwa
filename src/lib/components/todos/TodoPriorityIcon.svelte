<script lang="ts">
	import type { Todo, TodoPriority } from '$lib/types/todo';
	import IconUp from '@lucide/svelte/icons/circle-arrow-up';
	import IconRight from '@lucide/svelte/icons/circle-arrow-right';
	import IconDown from '@lucide/svelte/icons/circle-arrow-down';
	import { getTodos } from '$lib/state/Todos.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { clickOutside } from '$lib/helpers/ClickHelper';

	const { todo, changePriority = true, expanded = false, simple = false } = $props<{
		todo: Todo,
		changePriority: boolean,
		expanded: boolean,
		simple: boolean
	}>();

	const todos = getTodos(),
		loadingIndicator = getLoadingIndicator();

	let priorityMenuVisible = $state<boolean>(false);

	function togglePriorityMenu(): void {
		priorityMenuVisible = !priorityMenuVisible;
	}

	async function handlePriorityChange(todo: Todo, priority: TodoPriority): Promise<void> {
		loadingIndicator.start();
		await todos.changePriority(todo, priority);
		await todos.load();

		togglePriorityMenu();
		loadingIndicator.stop();
	}

	function getBgColor(priority: string): string {
		if (todos.view !== 'list' || simple) {
			return 'bg-transparent';
		}

		switch (priority) {
			case 'high':
				return 'bg-red-500';
			case 'medium':
			default:
				return 'bg-blue-500';
			case 'low':
				return 'bg-green-500';
		}
	}

	function getColor(priority: string): string {
		if (todos.view === 'list') {
			return 'text-white';
		}

		switch (priority) {
			case 'high':
				return 'text-red-500';
			case 'medium':
			default:
				return 'text-blue-500';
			case 'low':
				return 'text-green-500';
		}
	}
</script>

<div
	class="relative flex justify-center rounded-l-md items-center transition-all duration-300 {getBgColor(todo.priority)}"
	class:p-4={todos.view === 'list' && !simple}
	class:w-full={todos.view === 'list'}
	class:h-full={todos.view === 'list'}
	class:rounded-bl-none={expanded}
	class:rounded-br-md={expanded}
>
	{#if changePriority}
		{#if todo.priority === 'high'}
			<IconUp class="cursor-pointer {getColor(todo.priority)}" onclick={togglePriorityMenu} />
		{:else if todo.priority === 'medium'}
			<IconRight class="cursor-pointer {getColor(todo.priority)}" onclick={togglePriorityMenu} />
		{:else if todo.priority === 'low'}
			<IconDown class="cursor-pointer {getColor(todo.priority)}" onclick={togglePriorityMenu} />
		{/if}
		{#if priorityMenuVisible}
			<div use:clickOutside={() => { priorityMenuVisible = false; }} class="absolute top-0 rounded-lg bg-white drop-shadow-lg z-30 flex flex-col gap-2 p-4">
				<IconUp class="cursor-pointer text-red-500 rounded-full hover:bg-surface-100/40" onclick={() => handlePriorityChange(todo, 'high')} />
				<IconRight class="cursor-pointer text-blue-500 rounded-full hover:bg-surface-100/40" onclick={() => handlePriorityChange(todo, 'medium')} />
				<IconDown class="cursor-pointer text-green-500 rounded-full hover:bg-surface-100/40" onclick={() => handlePriorityChange(todo, 'low')} />
			</div>
		{/if}
	{:else}
		{#if todo.priority === 'high'}
			<IconUp class="text-red-500" />
		{:else if todo.priority === 'medium'}
			<IconRight class="text-blue-500" />
		{:else if todo.priority === 'low'}
			<IconDown class="text-green-500" />
		{/if}
	{/if}
</div>