<script lang="ts">
	import type { Tag } from '$lib/types/tag';
	import { getNotes } from '$lib/state/Notes.svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { getNotifications } from '$lib/state/Notifications.svelte';
	import NoteViewSwitcher from '$lib/components/notes/NoteViewSwitcher.svelte';
	import NoteTags from '$lib/components/notes/NoteTags.svelte';

	const ts = getTranslation(),
		notes = getNotes(),
		loadingIndicator = getLoadingIndicator(),
		notifications = getNotifications();

	async function saveNote() {
		loadingIndicator.start();
		const res = await notes.saveContent();

		if (res) {
			notifications.add({
				type: 'success',
				message: ts.get.notes.save_success
			});
		}

		loadingIndicator.stop();
	}
</script>

{#if notes.activeNote !== null}
	<div class="flex flex-col gap-2">
		<div class="flex flex-row items-center gap-8">
			<NoteViewSwitcher />
			<span class="text-2xl font-bold">{notes.activeNote.title}</span>
			<button class="btn preset-filled-primary-500 ml-auto" onclick={saveNote}>
				{ts.get.notes.save_note}
			</button>
		</div>
		<div class="ml-1">
			<NoteTags />
		</div>
	</div>
{/if}