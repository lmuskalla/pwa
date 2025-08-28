<script lang="ts">
	import type { Todo } from '$lib/types/todo';
	import IconTrash from '@lucide/svelte/icons/trash-2';
	import Modal from '$lib/components/layout/Modal.svelte';
	import { getTodos } from '$lib/state/Todos.svelte';
	import { getNotifications } from '$lib/state/Notifications.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';

	const todos = getTodos(),
		ts = getTranslation(),
		loadingIndicator = getLoadingIndicator(),
		notifications = getNotifications();

	let { todo } = $props<{ todo: Todo }>();

	let modalOpen = $state<boolean>(false);

	function openModal(): void {
		modalOpen = true;
	}

	async function onConfirm(): void {
		loadingIndicator.start();
		await todos.delete(todo);
		notifications.add({
			type: 'success',
			message: ts.get.todos.delete_success,
		});
		loadingIndicator.stop();
	}

	function onCancel(): void {
		modalOpen = false;
	}
</script>

<IconTrash class="text-red-800 cursor-pointer" onclick={openModal} />

{#if modalOpen}
	<Modal title={ts.get.todos.delete_confirm_label} description={ts.get.todos.delete_confirm_message} {onConfirm} {onCancel} />
{/if}