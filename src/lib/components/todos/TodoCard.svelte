<script lang="ts">
	import type { Todo } from '$lib/types/todo';
	import { slide } from 'svelte/transition';
	import IconTrash from '@lucide/svelte/icons/trash-2';
	import IconChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
	import TodoCategory from '$lib/components/todos/TodoCategory.svelte';
	import TodoDate from '$lib/components/todos/TodoDate.svelte';
	import TodoTags from '$lib/components/todos/TodoTags.svelte';
	import TodoPriorityIcon from '$lib/components/todos/TodoPriorityIcon.svelte';
	import TodoProgress from '$lib/components/todos/TodoProgress.svelte';
	import TodoEffort from '$lib/components/todos/TodoEffort.svelte';
	import TodoStatus from '$lib/components/todos/TodoStatus.svelte';
	import TodoTitle from '$lib/components/todos/TodoTitle.svelte';
	import TodoDescription from '$lib/components/todos/TodoDescription.svelte';
	import { getTodos } from '$lib/state/Todos.svelte';
	import { getNotifications } from '$lib/state/Notifications.svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';

	let { todo, handleCheck, } = $props<{
		todo: Todo,
		handleCheck: (event: Event, todo: Todo) => Promise<void>,
	}>();

	const todos = getTodos(),
		notifications = getNotifications(),
		ts = getTranslation(),
		loadingIndicator = getLoadingIndicator();

	let expanded = $state<boolean>(false);

	async function deleteTodo(todo: Todo): Promise<void> {
		loadingIndicator.start();
		await todos.delete(todo);
		notifications.add({
			type: 'success',
			message: ts.get.todos.delete_success,
		});
		loadingIndicator.stop();
	}

	function getBgColor(todo: Todo): string {
		switch (todo.priority) {
			case 'low':
				return 'bg-green-500';
			case 'high':
				return 'bg-red-500';
			default:
				return 'bg-blue-500';
		}
	}
</script>

<div class="p-4 rounded-lg hover:bg-primary-100/10 flex flex-col space-y-2 border-1 border-primary-100/50 relative drop-shadow-xs w-full">
	<div class="absolute top-0 left-0 w-1 h-full rounded-l-md {getBgColor(todo)}"></div>
	<div class="w-full relative">
		<span class="font-bold text-lg">
			<TodoTitle {todo} />
		</span>
		<div class="absolute top-2 right-1 flex flex-row gap-2 items-center">
			<input class="checkbox bg-white ml-4" type="checkbox" checked={todo.is_completed}
				   onchange={(e) => handleCheck(e, todo)} />
		</div>
	</div>
	<div class="flex flex-row items-center gap-2 w-full">
		<TodoStatus {todo} changeStatus={true} />
	</div>
	<div class="flex flex-row items-center gap-2 w-full">
		<TodoCategory {todo} />
		<TodoTags {todo} />
	</div>
	<div class="flex flex-row items-center gap-2 w-full">
		<TodoPriorityIcon {todo} changePriority={true} expanded={false} />
		<TodoEffort {todo} changeEffort={true} />
		<TodoDate {todo} reversed={true} />
	</div>
	<div class="w-full flex flex-row items-center justify-between">
		<div class="w-6/10">
			<TodoProgress {todo} />
		</div>
		<div class="flex flex-row items-center gap-2">
			<IconTrash class="text-red-800 cursor-pointer" onclick={() => deleteTodo(todo)} />
			<IconChevronsUpDown class="text-primary-100 cursor-pointer" onclick={() => expanded = !expanded} />
		</div>
	</div>
	{#if expanded}
		<div class="w-full" transition:slide>
			<TodoDescription {todo} />
		</div>
	{/if}
</div>