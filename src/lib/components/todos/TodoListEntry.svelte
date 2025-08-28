<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import type { Todo } from '$lib/types/todo';
	import IconChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
	import TodoCategory from '$lib/components/todos/TodoCategory.svelte';
	import TodoPriorityIcon from '$lib/components/todos/TodoPriorityIcon.svelte';
	import TodoTags from '$lib/components/todos/TodoTags.svelte';
	import TodoStatus from '$lib/components/todos/TodoStatus.svelte';
	import TodoEffort from '$lib/components/todos/TodoEffort.svelte';
	import TodoProgress from '$lib/components/todos/TodoProgress.svelte';
	import TodoDate from '$lib/components/todos/TodoDate.svelte';
	import TodoTitle from '$lib/components/todos/TodoTitle.svelte';
	import TodoDescription from '$lib/components/todos/TodoDescription.svelte';
	import TodoDelete from '$lib/components/todos/TodoDelete.svelte';

	let { todo, handleCheck, } = $props<{
		todo: Todo,
		handleCheck: (event: Event, todo: Todo) => Promise<void>,
	}>();

	let expanded = $state<boolean>(false);
</script>

<div class="relative group rounded-lg border-1 border-primary-100 shadow-xs hover:bg-primary-100/10 w-full h-auto items-center flex flex-row flex-wrap {todo.is_completed ? 'bg-surface-100/40 text-surface-200' : ''}" in:fade>
	<div class="w-14 h-full">
		<TodoPriorityIcon {todo} changePriority={true} {expanded} />
	</div>
	<div class="w-[25%] font-bold ml-4">
		<TodoTitle {todo} />
	</div>
	<div class="w-1/10 flex items-center group">
		<TodoStatus {todo} changeStatus={true} />
	</div>
	<div class="w-1/10 flex items-center group">
		<TodoCategory {todo} />
	</div>
	<div class="w-1/5 flex items-center group">
		<TodoTags {todo} />
	</div>
	<div class="w-14 h-full">
		<TodoEffort {todo} changeEffort={true} />
	</div>
	<div class="w-1/16 flex items-center group">
		<TodoProgress {todo} />
	</div>
	<div class="w-1/16 justify-end group ml-auto">
		<TodoDate {todo} />
	</div>
	<div class="ml-auto h-full items-center flex flex-row gap-2 2xl:gap-4 pr-2 2xl:pr-4 w-auto">
		<input class="checkbox bg-white" type="checkbox" checked={todo.is_completed}
			   onchange={(e) => handleCheck(e, todo)} />
		<TodoDelete {todo} />
		<IconChevronsUpDown class="text-primary-100 cursor-pointer" onclick={() => expanded = !expanded} />
	</div>

	{#if expanded}
		<div class="w-full p-4" transition:slide>
			<TodoDescription {todo} />
		</div>
	{/if}
</div>