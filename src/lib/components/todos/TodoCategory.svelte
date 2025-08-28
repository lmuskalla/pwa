<script lang="ts">
	import type { Todo } from '$lib/types/todo';
	import IconX from '@lucide/svelte/icons/x';
	import { getTodos } from '$lib/state/Todos.svelte';
	import { getTags } from '$lib/state/Tags.svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';
	import { getKeyManager } from '$lib/KeyManager.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { onDestroy, tick } from 'svelte';

	const ts = getTranslation(),
		todos = getTodos(),
		keyManager = getKeyManager(),
		loadingIndicator = getLoadingIndicator();

	let { todo } = $props<{
		todo: Todo,
	}>();

	let addCategoryVisible = $state<boolean>(false),
		addCategoryInput = $state<HTMLInputElement | null>(null),
		addCategoryTitle = $state<string>(''),
		enterHandler: string | null = null,
		escapeHandler: string | null = null;

	async function toggleAddCategories(): Promise<void> {
		addCategoryVisible = !addCategoryVisible;

		if (addCategoryVisible) {
			await tick();
			addCategoryInput?.focus();

			enterHandler = keyManager.registerKeyDown({
				key: 'Enter',
				handler: handleEnter,
				priority: 1,
				preventDefault: true,
				preventOthers: true
			});
			escapeHandler = keyManager.registerKeyDown({
				key: 'Escape',
				handler: handleEscape,
				priority: 1,
				preventDefault: true,
				preventOthers: true
			});
		}

	}

	onDestroy(() => {
		keyManager.unregisterKeyDown(enterHandler);
		keyManager.unregisterKeyDown(escapeHandler);
	})

	async function handleEnter(event: KeyboardEvent): Promise<void> {
		await onsubmit();
		await toggleAddCategories();
		addCategoryTitle = '';
	}

	function handleEscape(event: KeyboardEvent): void {
		onblur();
	}

	function onblur(): void {
		addCategoryVisible = false;
		addCategoryTitle = '';
		keyManager.unregisterKeyDown(enterHandler);
		keyManager.unregisterKeyDown(escapeHandler);
	}

	async function onsubmit(): Promise<void> {
		loadingIndicator.start();
		keyManager.unregisterKeyDown(enterHandler);
		let categoryTitle = addCategoryTitle.trim().replace('/', '');

		if (categoryTitle === '') {
			return;
		}

		const categoryId = todos.categories.filter(c => c.title === categoryTitle)[0]?.id;

		if (!categoryId) {
			return;
		}

		await todos.addCategory(todo, categoryId);
		loadingIndicator.stop();
	}
</script>

{#if addCategoryVisible}
	<input
		type="text"
		class="w-32 dark:bg-surface-700 dark:text-white {todos.view === 'kanban' ? 'text-xs px-2 py-1' : ''}"
		{onblur}
		bind:this={addCategoryInput}
		bind:value={addCategoryTitle}
	>
{:else}
	<div class="flex flex-row gap-1">
		{#if todo.category}
			<div class="bg-gray-200 dark:bg-surface-700 dark:text-white cursor-pointer px-2 py-1 font-semibold text-surface-700 text-xs" onclick={toggleAddCategories}>
				/{todo.category.title}
			</div>
		{:else}
			<button
				class="cursor-pointer text-xs text-surface-300 hover:text-surface-700 dark:hover:text-surface-400 transition-all"
				class:opacity-0={todos.view === 'list'}
				class:group-hover:opacity-100={todos.view === 'list'}
				class:ml-2={todos.view === 'list'}
				onclick={toggleAddCategories}
			>+ {ts.get.todos.add_category}</button>
		{/if}
	</div>
{/if}