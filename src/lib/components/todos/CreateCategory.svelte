<script lang="ts">
	import { tick, onDestroy } from 'svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { getKeyManager } from '$lib/KeyManager.svelte';
	import { getTodos } from '$lib/state/Todos.svelte';

	const ts = getTranslation(),
		todos = getTodos(),
		keyManager = getKeyManager(),
		loadingIndicator = getLoadingIndicator();

	let formOpen = $state<boolean>(false),
		title = $state<string>(''),
		input = $state<HTMLInputElement | null>(null),
		enterHandler: string | null = null,
		escapeHandler: string | null = null;

	async function toggleForm(): Promise<void> {
		formOpen = !formOpen;

		if (formOpen) {
			await tick();
			input?.focus();

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

	function onblur(): void {
		formOpen = false;
		keyManager.unregisterKeyDown(enterHandler);
		keyManager.unregisterKeyDown(escapeHandler);
	}

	function handleEscape(event: KeyboardEvent): void {
		onblur();
	}

	async function handleEnter(event: KeyboardEvent): Promise<void> {
		if (event.key === 'Enter') {
			loadingIndicator.start();
			if (title.trim() !== '') {
				await todos.createCategory(title);
				title = '';
			}

			await toggleForm();
			loadingIndicator.stop()
		}
	}
</script>

<div>
	{#if formOpen}
		<input
			bind:this={input}
			bind:value={title}
			{onblur}
			type="text"
			class="w-48 border-0 border-b-2 border-primary-300 focus:outline-none focus:border-primary-500"
			placeholder="Title"
		/>
	{:else}
		<button class="btn p-0" type="button" onclick={toggleForm}>
			+ {ts.get.settings.new_category}
		</button>
	{/if}
</div>