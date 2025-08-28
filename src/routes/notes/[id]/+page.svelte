<script lang="ts">
	import { getNotes } from '$lib/state/Notes.svelte';
	import NoteHeader from '$lib/components/notes/NoteHeader.svelte';
	import NoteHtmlViewer from '$lib/components/notes/NoteHtmlViewer.svelte';
	import NoteEditor from '$lib/components/notes/NoteEditor.svelte';
	import { getKeyManager } from '$lib/KeyManager.svelte';
	import { onDestroy, onMount } from 'svelte';

	const notes = getNotes(),
		keyManager = getKeyManager();

	let eHandler = '';

	onMount(() => {
		eHandler = keyManager.registerKeyDown({
			key: 'e',
			handler: handleE,
			priority: 1,
			preventDefault: true,
			preventOthers: true,
			withHelperKey: 'Control'
		});
	});

	onDestroy(() => {
		keyManager.unregisterKeyDown(eHandler);
	})

	function handleE(): void {
		notes.switchView();
	}
</script>

<div class="w-full max-h-full p-4 lg:p-8 overflow-y-auto relative flex flex-col gap-8 relative">
	{#if notes.activeNote !== null}
		<NoteHeader />
		<div class="w-full h-full flex flex-row gap-0">
			{#if notes.view === 'html' || notes.view === 'both'}
				<NoteHtmlViewer />
			{/if}
			{#if notes.view === 'editor' || notes.view === 'both'}
				<NoteEditor />
			{/if}
		</div>
	{/if}
</div>