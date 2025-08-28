<script lang="ts">
	import { markdownToHtml } from '$lib/helpers/FormatHelper';
	import { getNotes } from '$lib/state/Notes.svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';

	const ts = getTranslation(),
		notes = getNotes();
</script>

<div
	class="flex flex-col gap-2 h-full {notes.view === 'html' ? 'w-full' : 'w-1/2'}"
>
	<span class="text-surface-200 pl-2">{ts.get.notes.output}</span>
	<div
		class="w-full h-full p-4 border-1 border-surface-100 markdown bg-surface-100/10"
		class:rounded-l-lg={notes.view === 'both'}
		style="white-space: pre-wrap;"
	>
		{@html markdownToHtml(notes.activeNote.content)}
	</div>
</div>