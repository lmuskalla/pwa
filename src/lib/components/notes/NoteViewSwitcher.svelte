<script lang="ts">
	import IconPen from '@lucide/svelte/icons/pen';
	import IconBookOpen from '@lucide/svelte/icons/book-open';
	import IconSquareSplitHorizontal from '@lucide/svelte/icons/square-split-horizontal';
	import { getNotes } from '$lib/state/Notes.svelte';

	const notes = getNotes();

	function onclick() {
		notes.switchView();
	}
</script>

<button class="p-4 rounded-lg hover:bg-surface-100/40" {onclick}>
	{#if notes.view === 'both'}
		<IconSquareSplitHorizontal />
	{:else if notes.view === 'html'}
		<IconBookOpen />
	{:else}
		<IconPen />
	{/if}
</button>