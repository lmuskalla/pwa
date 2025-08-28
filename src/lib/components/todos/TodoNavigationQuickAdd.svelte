<script lang="ts">
	import IconPlus from '@lucide/svelte/icons/plus';
	import IconSave from '@lucide/svelte/icons/save';
	import { getKeyManager } from '$lib/KeyManager.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { getTodos } from '$lib/state/Todos.svelte';
	import { getTags } from '$lib/state/Tags.svelte';
	import { onDestroy, tick } from 'svelte';

	let { title, type } = $props<{
		title: string,
		type: 'tag' | 'category'
	}>();

	const keyManager = getKeyManager(),
		loadingIndicator = getLoadingIndicator(),
		todos = getTodos(),
		tags = getTags();

	let visible = $state<boolean>(false),
		value = $state<string>(''),
		input = $state<HTMLInputElement | null>(null),
		enterHandler: string | null = null,
		escapeHandler: string | null = null;

	async function toggle(): Promise<void> {
		visible = !visible;

		if (visible) {
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

	function onblur(): void {
		visible = false;
		keyManager.unregisterKeyDown(enterHandler);
		keyManager.unregisterKeyDown(escapeHandler);
	}

	onDestroy(() => {
		keyManager.unregisterKeyDown(enterHandler);
		keyManager.unregisterKeyDown(escapeHandler);
	})

	async function handleEnter(event: KeyboardEvent): Promise<void> {
		await onsubmit();
	}

	function handleEscape(event: KeyboardEvent): Promise<void> {
		onblur();
	}

	async function onsubmit(): Promise<void> {
		loadingIndicator.start();

		if (value.trim() === '') {
			return;
		}

		if (type === 'tag') {
			await tags.create(value);
		} else if (type === 'category') {
			await todos.createCategory(value);
		}

		value = '';
		visible = false;

		loadingIndicator.stop();
		keyManager.unregisterKeyDown(enterHandler);
		keyManager.unregisterKeyDown(escapeHandler);
	}
</script>

<div class="text-base font-bold 2xl:text-2xl 2xl:font-normal p-2 mt-2 flex justify-between items-center">
	{title}
	<IconPlus class="pt-1 text-surface-500 hover:text-surface-900 cursor-pointer" onclick={toggle} />
</div>
{#if visible}
	<div class="flex flex-row space-x-2 items-center">
		<input
			bind:this={input}
			bind:value={value}
			{onblur}
			type="text"
			class="w-full border-0 border-b-2 border-primary-300 focus:outline-none focus:border-primary-500 mb-2"
		/>
		<IconSave class="cursor-pointer text-primary-500 hover:text-primary-900 pb-1" onclick={onsubmit} />
	</div>
{/if}