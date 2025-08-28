<script lang="ts">
	import type { Todo } from '$lib/types/todo';
	import { onMount } from 'svelte';
	import { getTodos } from '$lib/state/Todos.svelte';
	import { getTags } from '$lib/state/Tags.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { getViewPoint } from '$lib/state/Viewpoint.svelte';
	import confetti from 'canvas-confetti';
	import { createConfettiOptions } from '$lib/effects/confetti';
	import CreateTodo from '$lib/components/todos/CreateTodo.svelte';
	import TodoNavigation from '$lib/components/todos/TodoNavigation.svelte';
	import TodoViewSwitcher from '$lib/components/todos/TodoViewSwitcher.svelte';
	import TodoKanbanView from '$lib/components/todos/TodoKanbanView.svelte';
	import TodoListView from '$lib/components/todos/TodoListView.svelte';
	import TodoCardView from '$lib/components/todos/TodoCardView.svelte';
	import TodoCounter from '$lib/components/todos/TodoCounter.svelte';

	const viewPoint = getViewPoint(),
		todos = getTodos(),
		tags = getTags(),
		loadingIndicator = getLoadingIndicator();

	let view = $derived(todos.view);

	onMount(async () => {
		if (!viewPoint.isDesktop) {
			todos.view = 'card';
		}

		loadingIndicator.start();
		await todos.load();
		loadingIndicator.stop();
		await todos.loadCategories();
		await tags.load();
	});

	async function handleCheck(event: Event, todo: Todo): Promise<void> {
		loadingIndicator.start();
		const checkbox = event.target as HTMLInputElement;
		
		if (checkbox.checked) {
			const rect = checkbox.getBoundingClientRect();
			const x = (rect.left + rect.right) / 2 / window.innerWidth;
			const y = (rect.top + rect.bottom) / 2 / window.innerHeight;

			confetti(createConfettiOptions({ x, y }, 'default'));
		}

		await todos.changeCompleted(todo, checkbox.checked);
		todo.is_completed = checkbox.checked;
		loadingIndicator.stop();
	}
</script>

<div class="w-full h-full flex flex-row">
	<TodoNavigation />
	<div class="w-full max-h-full p-4 lg:p-8 overflow-y-auto relative">
		<TodoViewSwitcher />
		<CreateTodo />
		<TodoCounter todos={todos.filteredTodos} />
		{#if viewPoint.isDesktop}
			{#if view === 'list'}
				<TodoListView {handleCheck} />
			{:else}
				<TodoKanbanView {handleCheck} />
			{/if}
		{:else}
			<TodoCardView {handleCheck} />
		{/if}
	</div>
</div>