<script lang="ts">
	import type { Todo } from '$lib/types/todo';
	import { fade } from 'svelte/transition';
	import BaseWidget from '$lib/components/widgets/BaseWidget.svelte';
	import { getTodos } from '$lib/state/Todos.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { onMount } from 'svelte';
	import confetti from 'canvas-confetti';
	import { createConfettiOptions } from '$lib/effects/confetti';
	import TodoPriorityIcon from '$lib/components/todos/TodoPriorityIcon.svelte';
	import { getTranslation } from '$lib/state/Translation.svelte.js';
	import TodoFilterService from '$lib/services/TodoFilterService';

	const ts = getTranslation(),
		todos = getTodos(),
		loadingIndicator = getLoadingIndicator(),
		filterService = new TodoFilterService();

	let filteredTodos = $derived(filterService.filterByDueDate('today', todos.todos));

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

<BaseWidget label={ts.get.widgets.todos_due_today}>
	<div class="w-full h-full text-surface-500 dark:text-white flex flex-col gap-2 py-2">
		{#each filteredTodos as todo (todo.id)}
			<div class="flex flex-row justify-start items-center space-x-4" transition:fade>
				<div class="w-auto">
					<TodoPriorityIcon {todo} changePriority={false} simple={true} />
				</div>
				<span>{todo.title}</span>
				<input class="checkbox bg-white ml-auto" type="checkbox" checked={todo.is_completed}
					   onchange={(e) => handleCheck(e, todo)} />
			</div>
		{/each}
	</div>
</BaseWidget>