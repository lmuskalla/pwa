<script lang="ts">
	import type { TodoCategory } from '$lib/types/todo';
	import IconX from '@lucide/svelte/icons/x';
	import { getTodos } from '$lib/state/Todos.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';

	const todos = getTodos(),
		loadingIndicator = getLoadingIndicator();

	let { category } = $props<{ category: TodoCategory }>();

	async function onDelete(category: TodoCategory): Promise<void> {
		loadingIndicator.start();
		await todos.deleteCategory(category);
		loadingIndicator.stop();
	}
</script>

<div class="flex items-center gap-1 border-1 border-surface-100 text-surface-700 dark:text-white cursor-pointer px-4 py-2 font-semibold text-sm lg:text-md">
	<span>/{category.title}</span>
	<IconX class="cursor-pointer text-red-800" onclick={() => onDelete(category)} />
</div>