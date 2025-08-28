<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import type { Note, NoteCategory } from '$lib/types/note';
	import type { RightClickMenuEntry } from '$lib/types/menu';
	import { getNotes } from '$lib/state/Notes.svelte';
	import NoteNavigationCategoryRenderer from '$lib/components/notes/NoteNavigationCategoryRenderer.svelte';
	import NoteNavigationNoteRenderer from '$lib/components/notes/NoteNavigationNoteRenderer.svelte';
	import IconChevronRight from '@lucide/svelte/icons/chevron-right';
	import RightClickMenu from '$lib/components/menus/RightClickMenu.svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';

	const ts = getTranslation(),
		notes = getNotes();

	let { category, depth } = $props<{ category: NoteCategory, depth: number }>();
	let rightClickMenuOpen = $state<boolean>(false)
	let rightClickMenuX = $state<number>(0);
	let rightClickMenuY = $state<number>(0);

	const rightClickMenuEntries: Array<RightClickMenuEntry> = [
		{ icon: 'new', label: ts.get.notes.new_note, action: () => {} },
		{ icon: 'new-folder', label: ts.get.notes.new_folder, action: () => {} },
		{ icon: 'delete', label: ts.get.notes.delete_folder, action: () => { alert('T'); } },
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
	<a
		href="#"
		onclick={() => { notes.toggleCollapseCategory(category.id); }}
		oncontextmenu={showRightClickMenu}
	>
		<div class="flex space-x-2 items-center px-2 py-1 cursor-pointer hover:bg-white dark:hover:bg-surface-700 rounded-lg" style="padding-left: {depth * 16}px;">
			<IconChevronRight
				size={18}
				class="text-surface-300 transition-all {notes.isCategoryCollapsed(category.id) ? 'rotate-90' : ''}"
			/>
			<span>{category.title}</span>
		</div>
	</a>
	{#if notes.isCategoryCollapsed(category.id)}
		<div class="relative" transition:slide={{ duration: 100 }}>
			<div class="w-[1px] z-20 h-full absolute top-0 bg-surface-100" style="left: {8 + depth * 16}px;"></div>
			{#if category.children.length > 0}
				<NoteNavigationCategoryRenderer category={category.children[0]} depth={depth + 1} />
			{/if}
			<NoteNavigationNoteRenderer categoryId={category.id} depth={depth + 1} />
		</div>
	{/if}
</div>