<script lang="ts">
	import type { Todo } from '$lib/types/todo';
	import { getTodos } from '$lib/state/Todos.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';

	let { todo } = $props<{ todo: Todo }>();

	let hovered = $state<boolean>(false),
		hoverValue = $state<number | null>(null),
		div = $state<HTMLDivElement | null>(null);

	const todos = getTodos(),
		loadingIndicator = getLoadingIndicator();

	function onclick(): void {
		if (hoverValue !== null) {
			onChange(hoverValue);
		}
	}

	function onmousemove(e: MouseEvent): void {
		hovered = true;
		updateFromClientX(e.clientX);
	}

	function onmouseleave(): void {
		hovered = false;
	}

	function onTouch(e: TouchEvent): void {
		if (e.touches.length > 0) {
			hovered = true;
			updateFromClientX(e.touches[0].clientX);
		}
	}

	function ontouchend(): void {
		hovered = false;
		hoverValue = null;

		if (hoverValue !== null) {
			onChange(hoverValue);
		}
	}

	async function onChange(progress: number): Promise<void> {
		loadingIndicator.start();
		await todos.changeProgress(todo, progress);
		loadingIndicator.stop();
	}

	function clampPct(v: number) {
		return Math.max(0, Math.min(100, v));
	}

	function updateFromClientX(clientX: number): void {
		const rect = div?.getBoundingClientRect(),
			pct = ((clientX - rect.left) / rect.width) * 100;
		hoverValue = Math.round(clampPct(pct));
	}

	function getProgress(): number {
		if (hovered && hoverValue !== null) {
			return hoverValue;
		}

		return todo.progress ?? 0;
	}
</script>

<div
	bind:this={div}
	class="w-full bg-white rounded-full h-2.5 border-2 border-secondary-100 cursor-pointer"
	{onmousemove}
	{onmouseleave}
	{onclick}
	ontouchstart={onTouch}
	ontouchmove={onTouch}
	{ontouchend}
	role="slider"
	tabindex="0"
	aria-valuemin="0"
	aria-valuemax="100"
	aria-valuenow={getProgress}
>
	<div class="h-full bg-secondary-100 rounded-full" style="width: {getProgress()}%"></div>
</div>