<script lang="ts">
	import type { Todo } from '$lib/types/todo';
	import TodoCard from '$lib/components/todos/TodoCard.svelte';
	import NoTodos from '$lib/components/todos/NoTodos.svelte';
	import { getTodos } from '$lib/state/Todos.svelte.js';
	import TodoKanbanCard from '$lib/components/todos/TodoKanbanCard.svelte';

	const todos = getTodos();

	let { handleCheck } = $props<{ handleCheck: (event: Event, todo: Todo) => Promise<void>}>();
</script>

<div class="flex flex-col items-center justify-between space-y-2">
	{#each todos.filteredTodos as todo (todo.id)}
		<TodoCard {todo} {handleCheck} />
	{/each}
	{#if todos.filteredTodos.length === 0}
		<NoTodos />
	{/if}
</div>