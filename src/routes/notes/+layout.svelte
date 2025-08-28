<script lang="ts">
	import { getNotes, setNotes } from '$lib/state/Notes.svelte';
	import NoteNavigation from '$lib/components/notes/NoteNavigation.svelte';
	import { onMount } from 'svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { getTags, setTags } from '$lib/state/Tags.svelte';

	setNotes();
	setTags();

	const notes = getNotes(),
		tags = getTags(),
		loadingIndicator = getLoadingIndicator();

	let { children } = $props();

	onMount(async () => {
		loadingIndicator.start();
		await notes.loadCategories();
		await notes.load();
		await tags.load();
		loadingIndicator.stop();
	});
</script>

<div class="w-full h-full flex flex-row">
	<NoteNavigation />
	{@render children?.()}
</div>