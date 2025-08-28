<script lang="ts">
	import { slide, fade } from 'svelte/transition';
	import type { TodoNavigationSection } from '$lib/types/todo';
	import { getTranslation } from '$lib/state/Translation.svelte';
	import TodoNavigationQuickAdd from './TodoNavigationQuickAdd.svelte';
	import { getTodos } from '$lib/state/Todos.svelte';
	import { getTags } from '$lib/state/Tags.svelte';
	import IconSub from '$lib/components/icons/IconSub.svelte';
	import IconFunnel from '@lucide/svelte/icons/funnel';

	const ts = getTranslation(),
		todos = getTodos(),
		tags = getTags();

	let navigation = $state<HTMLDivElement | null>(null);

	const sections: Array<TodoNavigationSection> = [
		{
			header: ts.get.todos.priority,
			items: [
				{ filter: { type: 'priority', value: 'high' }, label: ts.get.todos.priority_high },
				{ filter: { type: 'priority', value: 'medium' }, label: ts.get.todos.priority_medium },
				{ filter: { type: 'priority', value: 'low' }, label: ts.get.todos.priority_low }
			]
		},
		{
			header: ts.get.todos.status,
			items: [
				{ filter: { type: 'status', value: 'backlog' }, label: ts.get.todos.status_backlog },
				{ filter: { type: 'status', value: 'pending' }, label: ts.get.todos.status_pending },
				{ filter: { type: 'status', value: 'in-progress' }, label: ts.get.todos.status_in_progress },
				{ filter: { type: 'status', value: 'waiting' }, label: ts.get.todos.status_waiting },
				{ filter: { type: 'status', value: 'almost-done' }, label: ts.get.todos.status_almost_done },
			]
		},
		{
			header: ts.get.todos.effort,
			items: [
				{ filter: { type: 'effort', value: 'low' }, label: ts.get.todos.effort_low },
				{ filter: { type: 'effort', value: 'medium' }, label: ts.get.todos.effort_medium },
				{ filter: { type: 'effort', value: 'high' }, label: ts.get.todos.effort_high }
			]
		},
		{
			header: ts.get.todos.due_at,
			items: [
				{ filter: { type: 'due', value: 'today' }, label: ts.get.todos.due_today },
				{ filter: { type: 'due', value: 'tomorrow' }, label: ts.get.todos.due_tomorrow },
				{ filter: { type: 'due', value: 'week' }, label: ts.get.todos.due_week },
				{ filter: { type: 'due', value: 'overdue' }, label: ts.get.todos.due_overdue }
			]
		},
	];

	function toggleMobile(): void {
		if (navigation) {
			navigation.style.display = 'block';
		}
	}

	function handleNavigation(): void {
		if (navigation && navigation.style.display === 'block') {
			navigation.style.display = 'none';
		}
	}
</script>

<button class="absolute cursor-pointer z-20 top-4 left-4 rounded-lg bg-surface-100/40 hover:bg-surface-100 dark:hover:bg-surface-400 p-4 lg:hidden" onclick={toggleMobile}>
	<IconFunnel />
</button>
<div class="bg-white dark:bg-surface-900 hidden z-20 lg:bg-primary-100/10 absolute lg:relative lg:flex w-full lg:w-32 2xl:w-60 p-2 2xl:p-4 flex-col max-h-screen overflow-y-auto shadow-lg" in:slide bind:this={navigation}>
	<a href="?" onclick={() => { todos.useFilters([]); handleNavigation(); }}>
		<div class="p-2 cursor-pointer hover:bg-white dark:hover:bg-surface-700 rounded-lg {todos.activeFilters.length === 0 ? 'bg-white dark:bg-surface-700' : ''}">
			{ts.get.todos.all_todos}
		</div>
	</a>
	{#each sections as section (section.header)}
		<div class="text-base font-bold 2xl:text-2xl 2xl:font-normal p-2 mt-2">{section.header}</div>
		{#each section.items as item (item.filter)}
			<a href="?filterType={item.filter.type}&filterValue={item.filter.value}" onclick={() => { todos.useFilters([item.filter]); handleNavigation(); }}>
				<div class="text-sm 2xl:text-base px-2 py-1 cursor-pointer hover:bg-white dark:hover:bg-surface-700 rounded-lg {todos.isFilterActive(item.filter) ? 'bg-white dark:bg-surface-700' : ''}">
					{item.label}
				</div>
			</a>
		{/each}
	{/each}
	<TodoNavigationQuickAdd title={ts.get.todos.categories} type="category" />
	{#each todos.categories as category (category.id)}
		<a href="?filterType=category&filterValue={category.id}" onclick={() => { todos.useFilters([{ type: 'category', value: category.id }]); handleNavigation(); }} in:fade>
			<div class="text-sm 2xl:text-base px-2 py-1 cursor-pointer hover:bg-white dark:hover:bg-surface-700 rounded-lg flex flex-row items-center {todos.isFilterActive({ type: 'category', value: category.id }) ? 'bg-white dark:bg-surface-700' : ''}">
				{#if category.title.includes('/')}
					<IconSub /> /{category.title.split('/').pop()}
				{:else}
					/{category.title}
				{/if}
			</div>
		</a>
	{/each}
	<TodoNavigationQuickAdd title={ts.get.todos.tags} type="tag" />
	{#each tags.tags as tag (tag.id)}
		<a href="?filterType=tag&filterValue={tag.id}" onclick={() => { todos.useFilters([{ type: 'tag', value: tag.id }]); handleNavigation(); }} in:fade>
			<div class="text-sm 2xl:text-base px-2 py-1 cursor-pointer hover:bg-white dark:hover:bg-surface-700 rounded-lg {tag.id === todos.isFilterActive({ type: 'tag', value: tag.id }) ? 'bg-white dark:bg-surface-700' : ''}">
				#{tag.name}
			</div>
		</a>
	{/each}
</div>