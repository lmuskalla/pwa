<script lang="ts">
	import { tick, onDestroy } from 'svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';
	import { getTags } from '$lib/state/Tags.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { getKeyManager } from '$lib/KeyManager.svelte';

	const ts = getTranslation(),
		tags = getTags(),
		keyManager = getKeyManager(),
		loadingIndicator = getLoadingIndicator();

	let formOpen = $state<boolean>(false),
		name = $state<string>(''),
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
			if (name.trim() !== '') {
				await tags.create(name);
				name = '';
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
			bind:value={name}
			{onblur}
			type="text"
			class="w-48 border-0 border-b-2 border-primary-300 focus:outline-none focus:border-primary-500"
			placeholder="Name"
		/>
	{:else}
		<button class="btn p-0" type="button" onclick={toggleForm}>
			+ {ts.get.settings.new_tag}
		</button>
	{/if}
</div>