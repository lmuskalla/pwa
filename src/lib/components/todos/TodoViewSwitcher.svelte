<script lang="ts">
	import IconSquareKanban from '@lucide/svelte/icons/square-kanban';
	import IconAlignJustify from '@lucide/svelte/icons/align-justify';
	import { getTodos } from '$lib/state/Todos.svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';

	const todos = getTodos(),
		ts = getTranslation();

	let view = $derived(todos.view);

	function onChangeView() {
		todos.changeView();
	}
</script>

<button class="hidden 2xl:block absolute top-8 left-5 p-4 rounded-lg hover:bg-surface-100/40" onclick={onChangeView} title={ts.get.todos.switch_view}>
	{#if view === 'list'}
		<IconAlignJustify />
	{:else}
		<IconSquareKanban />
	{/if}
</button>