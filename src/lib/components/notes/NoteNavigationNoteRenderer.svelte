<script lang="ts">
	import type { Note, NoteCategory } from '$lib/types/note';
	import { fade } from 'svelte/transition';
	import { getNotes } from '$lib/state/Notes.svelte';
	import { urls } from '$lib/helpers/UrlHelper'
	import RightClickMenu from '$lib/components/menus/RightClickMenu.svelte';
	import type { RightClickMenuEntry } from '$lib/types/menu';
	import { getTranslation } from '$lib/state/Translation.svelte';

	const ts = getTranslation(),
		notes = getNotes();

	let { categoryId, depth } = $props<{ categoryId: number | null, depth: number }>();

	function selectNote(noteId: string): void {
		notes.selectNote(noteId);
	}

	let rightClickMenuOpen = $state<boolean>(false)
	let rightClickMenuX = $state<number>(0);
	let rightClickMenuY = $state<number>(0);

	const rightClickMenuEntries: Array<RightClickMenuEntry> = [
		{ icon: 'delete', label: ts.get.notes.delete_note, action: () => { alert('s') } },
	];

	function showRightClickMenu(e: MouseEvent): void {
		e.preventDefault();
		rightClickMenuOpen = true;
		rightClickMenuX = e.clientX;
		rightClickMenuY = e.clientY;
	}

	function closeRightClickMenu(): void {
		rightClickMenuOpen = false;
	}
</script>

<div class="" transition:fade>
	{#if rightClickMenuOpen}
		<RightClickMenu x={rightClickMenuX} y={rightClickMenuY} close={closeRightClickMenu} entries={rightClickMenuEntries} />
	{/if}
	{#each notes.getNotesForCategory(categoryId) as note (note.id)}
		<a
			href={urls.note.replace('%s', note.id)} onclick={() => { selectNote(note.id); }}
			oncontextmenu={showRightClickMenu}
		>
			<div class="flex space-x-2 items-center px-2 py-1 cursor-pointer hover:bg-white dark:hover:bg-surface-700 rounded-lg {notes.activeNote !== null && note.id === notes.activeNote.id ? 'bg-white dark:bg-surface-700' : ''}" style="padding-left: {8 + depth * 16}px;">
				<span>{note.title}</span>
			</div>
		</a>
	{/each}
</div>