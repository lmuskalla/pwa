<script lang="ts">
	import type { MenuIcon } from '$lib/types/menu';
	import IconPlus from '@lucide/svelte/icons/plus';
	import IconFolderPlus from '@lucide/svelte/icons/folder-plus';
	import IconTrash from '@lucide/svelte/icons/trash-2';

	let { icon, size } = $props<{ icon: MenuIcon, size: number }>();
</script>

{#if icon === 'new'}
	<IconPlus size={size} />
{:else if icon === 'new-folder'}
	<IconFolderPlus {size} />
{:else if icon === 'delete'}
	<IconTrash size={size} />
{/if}