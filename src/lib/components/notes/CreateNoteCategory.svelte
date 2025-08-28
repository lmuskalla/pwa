<script lang="ts">
	import IconFolderPlus from '@lucide/svelte/icons/folder-plus';
	import { getTranslation } from '$lib/state/Translation.svelte';
	import { getKeyManager } from '$lib/KeyManager.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { getNotes } from '$lib/state/Notes.svelte';
	import { onDestroy, onMount, tick } from 'svelte';
	import { getNotifications } from '$lib/state/Notifications.svelte';

	const ts = getTranslation(),
		keyManager = getKeyManager(),
		notes = getNotes(),
		loadingIndicator = getLoadingIndicator(),
		notifications = getNotifications();

	let formOpen = $state<boolean>(false),
		userInput = $state<string>(''),
		input = $state<HTMLInputElement | null>(null),
		enterHandler: string | null = null,
		escapeHandler: string | null = null;

	onDestroy(() => {
		keyManager.unregisterKeyDown(enterHandler);
		keyManager.unregisterKeyDown(escapeHandler);
	})

	async function toggleForm(): Promise<void> {
		formOpen = !formOpen;
		if (formOpen) {
			await tick();
			input?.focus();
			enterHandler = keyManager.registerKeyDown({
				key: 'Enter',
				handler: handleEnter,
				priority: 3,
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

	function onblur(): void {
		formOpen = false;
		keyManager.unregisterKeyDown(enterHandler);
		keyManager.unregisterKeyDown(escapeHandler);
	}

	function handleEscape(event: KeyboardEvent): void {
		onblur();
	}

	async function handleEnter(event: KeyboardEvent): Promise<void> {
		if (!formOpen) {
			await toggleForm();
			return;
		}

		loadingIndicator.start();

		if (userInput.trim() !== '') {
			const res = await notes.createCategory(userInput);

			if (res) {
				userInput = '';

				notifications.add({
					type: 'success',
					message: ts.get.notes.create_folder_success,
				});
			}
		}

		await toggleForm();
		loadingIndicator.stop();
		keyManager.unregisterKeyDown(enterHandler);
		keyManager.unregisterKeyDown(escapeHandler);
	}
</script>

{#if formOpen}
	<input
		bind:this={input}
		bind:value={userInput}
		{onblur}
		type="text"
		class="w-full border-0 border-b-2 border-primary-300 focus:outline-none focus:border-primary-500 dark:bg-surface-700 dark:text-white"
		placeholder="Enter folder title"
	/>
{:else}
	<button class="flex text-sm flex-row space-x-2 px-4 py-1 items-center rounded-lg hover:bg-white" onclick={toggleForm}>
		<IconFolderPlus size={18} />
		<span>{ts.get.notes.new_folder}</span>
	</button>
{/if}