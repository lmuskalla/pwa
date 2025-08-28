<script lang="ts">
	import { getNotifications } from '$lib/state/Notifications.svelte';
	import { fly } from 'svelte/transition';
	import IconTriangleAlert from '@lucide/svelte/icons/triangle-alert';
	import IconCheck from '@lucide/svelte/icons/check';
	import IconInfo from '@lucide/svelte/icons/info';
	import IconOctagonX from '@lucide/svelte/icons/octagon-x';

	const notifications = getNotifications();
	let queue = $derived(notifications.queue);
</script>

<div class="fixed top-5 right-5 flex flex-col gap-2 z-40">
	{#each queue as notification (notification.id)}
		<div
			class="w-full h-full flex flex-row gap-2 border-1 bg-white border-primary-500 p-4 drop-shadow-lg"
			in:fly={{ x: 150 }}
			out:fly={{ x: 150 }}
		>
			{#if notification.type === 'info'}
				<IconInfo  />
			{:else if notification.type === 'success'}
				<IconCheck />
			{:else if notification.type === 'error'}
				<IconOctagonX />
			{:else if notification.type === 'warning'}
				<IconTriangleAlert />
			{/if}
			<p>{notification.message}</p>
		</div>
	{/each}
</div>