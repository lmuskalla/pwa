<script lang="ts">
	import type { RightClickMenuEntry } from '$lib/types/menu';
	import { fade } from 'svelte/transition';
	import MenuIcon from '$lib/components/menus/MenuIcon.svelte';
	import { clickOutside } from '$lib/helpers/ClickHelper';

	let { x, y, close, entries } = $props<{
		x: number,
		y: number,
		close: () => void,
		entries: Array<RightClickMenuEntry>,
	}>();
</script>

<div
	class="fixed rounded-lg z-30 bg-white border-1 border-primary-100 flex flex-col justify-start shadow-lg" style="top: {y}px; left: {x}px;"
	in:fade={{ duration: 100 }}
	use:clickOutside={() => { close(); }}
>
	{#each entries as entry (entry.label)}
		<button class="px-4 py-1 hover:bg-surface-100/20 text-left flex flex-row space-x-2 items-center" onclick={entry.action}>
			<MenuIcon icon={entry.icon} size={18} />
			<span>{entry.label}</span>
		</button>
	{/each}
</div>