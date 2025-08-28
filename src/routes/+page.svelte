<script lang="ts">
	import type { WidgetType } from '$lib/types/widget';
	import { getTranslation } from '$lib/state/Translation.svelte';
	import IconPlus from '@lucide/svelte/icons/plus';
	import BaseWidget from '$lib/components/widgets/BaseWidget.svelte';
	import TodosDueTodayWidget from '$lib/components/widgets/TodosDueTodayWidget.svelte';
	import TodosOverdueWidget from '$lib/components/widgets/TodosOverdueWidget.svelte';
	import TodosHighPriorityWidget from '$lib/components/widgets/TodosHighPriorityWidget.svelte';
	import { setTodos, getTodos } from '$lib/state/Todos.svelte';
	import { onMount } from 'svelte';

	setTodos();

	const ts = getTranslation(),
		todos = getTodos();
	const widgets: Array<WidgetType> = ['add'];

	onMount(async () => {
		if (!todos.loaded) await todos.load();
	});
</script>

<div class="p-2 lg:p-8 flex flex-col md:flex-row gap-4">
	<TodosDueTodayWidget />
	<TodosOverdueWidget />
	<TodosHighPriorityWidget />
	<BaseWidget label={null}>
		<button class="w-full h-full flex items-center justify-center text-surface-100 hover:text-surface-400" onclick={() => alert('T')}>
			<IconPlus class="size-24" />
		</button>
	</BaseWidget>
</div>
