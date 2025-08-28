<script lang="ts">
	import { onMount } from 'svelte';
	import { getTodos } from '$lib/state/Todos.svelte';
	import TodoKanbanCard from '$lib/components/todos/TodoKanbanCard.svelte';
	import type { Todo, TodoStatus } from '$lib/types/todo';

	const todos = getTodos();

	let { handleCheck } = $props<{ handleCheck: (event: Event, todo: Todo) => Promise<void>}>();

	onMount(() => {
		todos.groupByStatus();
	});

	function getStatusLabel(status: TodoStatus): string {
		switch (status) {
			case 'pending':
				return 'Pending';
			case 'in-progress':
				return 'In Progress';
			case 'waiting':
				return 'Waiting';
			case 'almost-done':
				return 'Almost done';
		}
	}

	function getStatusColor(status: TodoStatus): string {
		switch (status) {
			case 'pending':
			default:
				return 'surface-100';
			case 'in-progress':
				return 'primary-100';
			case 'waiting':
				return 'secondary-100';
			case 'almost-done':
				return 'success-100';
		}
	}
</script>

<div class="flex flex-row justify-between w-full">
	{#each todos.groupedTodos as group (group.status)}
		<div class="rounded-lg flex flex-col w-[24%]">
			<span class="font-bold text-xl mb-6 p-4 border-b-4 border-{getStatusColor(group.status)}">{getStatusLabel(group.status)}</span>
			<div class="flex flex-col space-y-4">
				{#each group.todos as todo (todo.id)}
					<TodoKanbanCard {todo} {handleCheck} />
				{/each}
			</div>
		</div>
	{/each}
</div>