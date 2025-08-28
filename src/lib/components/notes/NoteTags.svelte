<script lang="ts">
	import type { Todo } from '$lib/types/todo';
	import type { Tag } from '$lib/types/tag';
	import IconX from '@lucide/svelte/icons/x';
	import TagFlexList from '$lib/components/tags/TagFlexList.svelte';
	import { getTodos } from '$lib/state/Todos.svelte';
	import { getTags } from '$lib/state/Tags.svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';
	import { getKeyManager } from '$lib/KeyManager.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { onDestroy, onMount, tick } from 'svelte';
	import { getNotes } from '$lib/state/Notes.svelte';

	const ts = getTranslation(),
		notes = getNotes(),
		tags = getTags(),
		keyManager = getKeyManager(),
		loadingIndicator = getLoadingIndicator();

	let addTagVisible = $state<boolean>(false),
		addTagInput = $state<HTMLInputElement | null>(null),
		addTagName = $state<string>(''),
		enterHandler: string | null = null,
		escapeHandler: string | null = null;

	async function toggleAddTags(): Promise<void> {
		addTagVisible = !addTagVisible;

		if (addTagVisible) {
			await tick();
			addTagInput?.focus();

			enterHandler = keyManager.registerKeyDown({
				key: 'Enter',
				handler: handleEnter,
				priority: 1,
				preventDefault: true,
				preventOthers: true
			});
			escapeHandler = keyManager.registerKeyDown({
				key: 'Escape',
				handler: handleEscape,
				priority: 1,
				preventDefault: true,
				preventOthers: true
			});
		}

	}
	async function handleEnter(event: KeyboardEvent): Promise<void> {
		await onsubmit();
		await toggleAddTags();
		addTagName = '';
	}

	function handleEscape(event: KeyboardEvent): void {
		onblur();
	}

	onDestroy(() => {
		keyManager.unregisterKeyDown(enterHandler);
		keyManager.unregisterKeyDown(escapeHandler);
	})

	function onblur(): void {
		addTagVisible = false;
		addTagName = '';
		keyManager.unregisterKeyDown(enterHandler);
		keyManager.unregisterKeyDown(escapeHandler);
	}

	async function onsubmit(): Promise<void> {
		loadingIndicator.start();
		keyManager.unregisterKeyDown(enterHandler);
		let tagName = addTagName.trim().replace('#', '');
		console.log(tagName);

		if (tagName === '') {
			return;
		}

		const tagId = tags.tags.find((t) => t.name.toLowerCase() === tagName.toLowerCase())?.id;

		if (!tagId) {
			return;
		}

		console.log(tagId);

		await notes.addTag(tagId);
		loadingIndicator.stop();
	}

	async function onRemoveTag(tag: Tag): Promise<void> {
		loadingIndicator.start();
		await notes.removeTag(tag.id);
		loadingIndicator.stop();
	}
</script>

<div class="flex flex-row gap-2">
	{#if notes.activeNote !== null}
		{#if addTagVisible}
			<input
				type="text"
				class="w-32 dark:bg-surface-700 dark:text-white"
				{onblur}
				bind:this={addTagInput}
				bind:value={addTagName}
			>
		{:else}
			<TagFlexList tags={notes.activeNote.tags} onRemove={onRemoveTag} />
			<button
				class="cursor-pointer text-xs text-surface-300 hover:text-surface-700  dark:hover:text-surface-400 transition-all"
				onclick={toggleAddTags}
			>+ {ts.get.todos.add_tag}</button>
		{/if}
	{/if}
</div>