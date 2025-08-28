<script lang="ts">
	import { getNotes } from '$lib/state/Notes.svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';

	const ts = getTranslation(),
		notes = getNotes();

	let textarea = $state<HTMLTextAreaElement | null>(),
		content = $derived<string>(notes.activeNote.content);

	function oninput() {
		notes.activeNote.content = content;
	}
</script>

<div class="h-full flex flex-col gap-2 {notes.view === 'editor' ? 'w-full' : 'w-1/2'}">
	<span class="text-surface-200 pl-2">{ts.get.notes.editor}</span>
	<textarea
		class="w-full bg-white p-4 border-1 border-surface-100 h-full"
		class:rounded-r-lg={notes.view === 'both'}
		bind:this={textarea}
		bind:value={content}
		{oninput}
	></textarea>
</div>