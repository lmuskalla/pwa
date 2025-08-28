<script lang="ts">
	import type { Tag } from '$lib/types/tag';
	import IconX from '@lucide/svelte/icons/x';
	import ColorPicker from 'svelte-awesome-color-picker';
	import { getTags } from '$lib/state/Tags.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';

	const tags = getTags(),
		loadingIndicator = getLoadingIndicator();

	let { tag } = $props<{ tag: Tag }>();

	async function onColorChange(color: { hex: string }): void {
		if (color.hex === tag.color) return;

		loadingIndicator.start();
		await tags.changeColor(tag, color.hex);
		loadingIndicator.stop();
	}

	async function onDelete(tag: Tag): Promise<void> {
		loadingIndicator.start();
		await tags.delete(tag.id);
		loadingIndicator.stop();
	}

	let hex = $state<string>(tag.color !== null ? tag.color : '#e5e7eb');
</script>

<div class="rounded-full flex items-center gap-1 font-semibold border-1 border-surface-100 text-surface-700 dark:text-white px-2 py-1 lg:px-4 lg:py-2 text-sm lg:text-md">
	<ColorPicker
		bind:hex
		position="responsive"
		nullable={false}
		label=""
		isTextInput={false}
		--cp-border-color="#e5e7eb"
		onInput={onColorChange}
	/>
	<span>#{tag.name}</span>
	<IconX class="cursor-pointer text-red-800" onclick={() => onDelete(tag)} />
</div>