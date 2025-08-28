<script lang="ts">
	import type { Todo } from '$lib/types/todo';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { getTodos } from '$lib/state/Todos.svelte';
	import { getKeyManager } from '$lib/KeyManager.svelte';
	import { onDestroy, tick } from 'svelte';

	const todos = getTodos(),
		loadingIndicator = getLoadingIndicator(),
		keyManager = getKeyManager();

	let { todo } = $props<{ todo: Todo }>();

	let changeTitle = $state<boolean>(false),
		titleInput = $state<HTMLInputElement | null>(null),
		titleValue = $state<string>(todo.title),
		enterHandler: string = '',
		escapeHandler: string = '';

	async function toggleChangeTitle(): Promise<void> {
		changeTitle = !changeTitle;

		if (changeTitle) {
			await tick();
			titleInput?.focus();

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

	onDestroy(() => {
		keyManager.unregisterKeyDown(enterHandler);
		keyManager.unregisterKeyDown(escapeHandler);
	})

	async function handleEnter(event: KeyboardEvent): Promise<void> {
		await onsubmit();
		await toggleChangeTitle();
	}

	function handleEscape(event: KeyboardEvent): void {
		onblur();
	}

	function onblur(): void {
		changeTitle = false;
		keyManager.unregisterKeyDown(enterHandler);
		keyManager.unregisterKeyDown(escapeHandler);
	}

	async function onsubmit(): Promise<void> {
		loadingIndicator.start();
		keyManager.unregisterKeyDown(enterHandler);
		let todoTitle = titleValue.trim();

		if (todoTitle === '') {
			return;
		}

		await todos.changeTitle(todo, todoTitle);
		loadingIndicator.stop();
	}
</script>

{#if changeTitle}
	<input
		type="text"
		class="{todos.view === 'list' ? 'w-9/10' : 'w-3/4'}"
		{onblur}
		bind:this={titleInput}
		bind:value={titleValue}
	>
{:else}
	<span ondblclick={toggleChangeTitle} class="text-sm 2xl:text-base">{todo.title}</span>
{/if}
