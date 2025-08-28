<script lang="ts">
	import type { Tag } from '$lib/types/tag';
	import IconX from '@lucide/svelte/icons/x';

	let { tags, onRemove } = $props<{
		tags: Array<Tag>,
		onRemove: (tag: Tag) => void | Promise<void>
	}>();
</script>

<div class="flex flex-row gap-1">
	{#each tags as tag (tag.id)}
		<div
			class="rounded-full flex items-center gap-1 font-semibold text-surface-700 px-2 py-1 text-xs"
			style="background-color: {tag.color !== null ? tag.color : '#e5e7eb'};"
		>
			#{tag.name}
			<IconX class="size-4 cursor-pointer text-red-800" onclick={() => onRemove(tag)} />
		</div>
	{/each}
</div>