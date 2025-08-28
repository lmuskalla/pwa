<script lang="ts">
	import type { Todo } from '$lib/types/todo';
	import { onDestroy, tick } from 'svelte';
	import { getTodos } from '$lib/state/Todos.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { getKeyManager } from '$lib/KeyManager.svelte';
	import { markdownToHtml } from '$lib/helpers/FormatHelper';

	const todos = getTodos(),
		loadingIndicator = getLoadingIndicator(),
		keyManager = getKeyManager();

	let { todo } = $props<{ todo: Todo }>();

	let changeDescription = $state<boolean>(false),
		descriptionInput = $state<HTMLTextAreaElement | null>(null),
		descriptionValue = $state<string | null>(todo.description),
		enterSaveHandler: string = '',
		enterNewLineHandler: string = '',
		escapeHandler: string = '';

	async function toggleChangeDescription(): Promise<void> {
		changeDescription = !changeDescription;

		if (changeDescription) {
			await tick();
			descriptionInput?.focus();

			enterSaveHandler = keyManager.registerKeyDown({
				key: 'Enter',
				handler: handleEnter,
				priority: 2,
				preventDefault: true,
				preventOthers: true
			});
			enterNewLineHandler = keyManager.registerKeyDown({
				key: 'Enter',
				handler: handleNewLineEnter,
				priority: 1,
				preventDefault: true,
				preventOthers: true,
				withHelperKey: 'Shift'
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

	onDestroy(() => {
		keyManager.unregisterKeyDown(enterSaveHandler);
		keyManager.unregisterKeyDown(enterNewLineHandler);
		keyManager.unregisterKeyDown(escapeHandler);
	})

	async function handleEnter(event: KeyboardEvent): Promise<void> {
		await onsubmit();
		await toggleChangeDescription();
	}

	function handleNewLineEnter(event: KeyboardEvent): void {
		if (descriptionInput) {
			const start = descriptionInput.selectionStart;
			const end = descriptionInput.selectionEnd;
			descriptionValue = descriptionValue?.slice(0, start) + '\n' + descriptionValue?.slice(end);
			descriptionInput.selectionStart = descriptionInput.selectionEnd = start + 1;
		}
	}

	function handleEscape(event: KeyboardEvent): void {
		onblur();
	}

	function onblur(): void {
		changeDescription = false;
		keyManager.unregisterKeyDown(enterSaveHandler);
		keyManager.unregisterKeyDown(escapeHandler);
	}

	async function onsubmit(): Promise<void> {
		loadingIndicator.start();
		keyManager.unregisterKeyDown(enterSaveHandler);
		let todoDescription = descriptionValue.trim();

		if (todoDescription === '') {
			return;
		}

		await todos.changeDescription(todo, todoDescription);
		loadingIndicator.stop();
	}
</script>

<div class="w-full mt-2">
	{#if changeDescription}
		<textarea
			class="w-full h-32"
			{onblur}
			bind:this={descriptionInput}
			bind:value={descriptionValue}
		></textarea>
	{:else}
		<a href="#"
			class="cursor-text"
			ondblclick={toggleChangeDescription}
		>
			<div>
				{#if todo.description}
					{@html markdownToHtml(todo.description)}
				{:else}
					No description
				{/if}
			</div>
		</a>
	{/if}
</div>