<script lang="ts">
	import type { Note } from '$lib/types/note';
	import { fade } from 'svelte/transition';
	import { getNotes } from '$lib/state/Notes.svelte';
	import IconFunnel from '@lucide/svelte/icons/funnel';
	import NoteNavigationCategoryRenderer from '$lib/components/notes/NoteNavigationCategoryRenderer.svelte';
	import NoteNavigationNoteRenderer from '$lib/components/notes/NoteNavigationNoteRenderer.svelte';
	import CreateNote from '$lib/components/notes/CreateNote.svelte';
	import CreateNoteCategory from '$lib/components/notes/CreateNoteCategory.svelte';
	import Divider from '$lib/components/layout/Divider.svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';

	const ts = getTranslation(),
		notes = getNotes();

	let navigation = $state<HTMLDivElement | null>(null);

	function toggleMobile(): void {
		if (navigation) {
			navigation.style.display = 'block';
		}
	}
</script>

<button class="absolute cursor-pointer z-20 top-4 left-4 rounded-lg bg-surface-100/40 hover:bg-surface-100 dark:hover:bg-surface-400 p-4 lg:hidden" onclick={toggleMobile}>
	<IconFunnel />
</button>
<div in:fade class="bg-white text-sm text-surface-600 dark:bg-surface-900 hidden z-20 lg:bg-primary-100/10 absolute lg:relative lg:flex w-full lg:w-32 2xl:w-96 p-2 2xl:p-4 flex-col max-h-screen overflow-y-auto shadow-lg" bind:this={navigation}>
	<div class="text-base font-bold 2xl:text-2xl 2xl:font-normal mb-4">{ts.get.notes.notebook}</div>
	{#each notes.categories as category (category.id)}
		<NoteNavigationCategoryRenderer {category} depth={0} />
	{/each}
	<NoteNavigationNoteRenderer categoryId={null} depth={0} />
	<Divider />
	<CreateNote />
	<CreateNoteCategory />
</div>