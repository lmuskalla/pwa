<script lang="ts">
	import { blur, fade } from 'svelte/transition';
	import { getKeyManager } from '$lib/KeyManager.svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';
	import { onDestroy, onMount } from 'svelte';

	const ts = getTranslation(),
		keyManager = getKeyManager();

	let { title, description, onConfirm, onCancel } = $props<{
		title: string,
		description: string,
		onConfirm: () => void | Promise<void>,
		onCancel: () => void | Promise<void>,
	}>();

	let enterHandler: string = '',
		escapeHandler: string = '';

	onMount(() => {
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
	});

	function handleEscape(event: KeyboardEvent): void {
		onCancel();
		keyManager.unregisterKeyDown(enterHandler);
		keyManager.unregisterKeyDown(escapeHandler);
	}

	async function handleEnter(event: KeyboardEvent): Promise<void> {
		await onConfirm();
	}

	onDestroy(() => {
		keyManager.unregisterKeyDown(enterHandler);
		keyManager.unregisterKeyDown(escapeHandler);
	});
</script>

<div class="fixed z-30 top-0 left-0 w-screen h-screen bg-transparent backdrop-blur-xs flex justify-center items-center transition-all" transition:fade>
	<div class="bg-white p-4 shadow-md w-96 border-1 border-primary-100">
		<div class="w-full font-bold">{title}</div>
		<div class="w-full text-sm text-gray-500">{description}</div>
		<div class="w-full text-sm text-gray-500 italic mt-4">
			{ts.get.layout.modal_explanation}
		</div>
		<div class="w-full mt-4 flex flex-row justify-center gap-4">
			<button class="btn preset-filled-error-50-950" onclick={onCancel}>
				{ts.get.layout.modal_cancel}
			</button>
			<button class="btn preset-filled-primary-500" onclick={onConfirm}>
				{ts.get.layout.modal_confirm}
			</button>
		</div>
	</div>
</div>