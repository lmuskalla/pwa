<script lang="ts">
	import { tick } from 'svelte';
	import { getKeyManager } from '$lib/KeyManager.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { getTodos } from '$lib/state/Todos.svelte';
	import { getTags } from '$lib/state/Tags.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { getNotifications } from '$lib/state/Notifications.svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';

	const keyManager = getKeyManager(),
		todos = getTodos(),
		tags = getTags(),
		loadingIndicator = getLoadingIndicator(),
		notifications = getNotifications(),
		ts = getTranslation();

	let formOpen = $state<boolean>(false),
		userInput = $state<string>(''),
		input = $state<HTMLInputElement | null>(null),
		enterHandler: string | null = null,
		escapeHandler: string | null = null;

	onMount(() => {
		enterHandler = keyManager.registerKeyDown({
			key: 'Enter',
			handler: handleEnter,
			priority: 3,
			preventDefault: true,
			preventOthers: true
		});
	})

	onDestroy(() => {
		keyManager.unregisterKeyDown(enterHandler);
		keyManager.unregisterKeyDown(escapeHandler);
	})

	async function toggleForm(): Promise<void> {
		formOpen = !formOpen;
		if (formOpen) {
			await tick();
			input?.focus();
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
			const res = await todos.quickCreate(userInput, tags);

			if (res) {
				userInput = '';
			}

			notifications.add({
				type: 'success',
				message: ts.get.todos.create_success,
			})
		}

		await toggleForm();
		loadingIndicator.stop();
	}
</script>

<div class="w-full mb-8 flex flex-row justify-end p-2 pl-20 sm:pl-30 lg:pl-2 2xl:pl-14 h-14">
	{#if formOpen}
		<input
			bind:this={input}
			bind:value={userInput}
			{onblur}
			type="text"
			class="w-full border-0 border-b-2 border-primary-300 focus:outline-none focus:border-primary-500 dark:bg-surface-700 dark:text-white"
			placeholder="Enter todo"
		/>
	{:else}
		<button class="btn preset-filled-primary-500" type="button" onclick={toggleForm}>
			+ New Todo
		</button>
	{/if}
</div>