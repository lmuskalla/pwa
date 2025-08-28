<script lang="ts">
	import type { NextcloudAppToken } from '$lib/types/nextcloudAppToken'
	import IconTrash from '@lucide/svelte/icons/trash-2';
	import { onMount } from 'svelte';
	import { getAuth } from '$lib/state/Auth.svelte';
	import NextcloudAppTokenApiService from '$lib/services/api/NextcloudAppTokenApiService';

	const auth = getAuth(),
		apiService = new NextcloudAppTokenApiService(auth.getToken()!);

	let token = $state<NextcloudAppToken | null>(null),
		urlInputValue = $state<string>(''),
		usernameInputValue = $state<string>(''),
		tokenInputValue = $state<string>('');

	onMount(async () => {
		await loadToken();
	});

	async function loadToken(): Promise<void> {
		const res = await apiService.list();
		if (res) token = res;
	}

	async function saveToken(): Promise<void> {
		const res = await apiService.create({ nextcloud_url: urlInputValue, username: usernameInputValue, app_token: tokenInputValue });

		if (res) {
			await loadToken();
		} else {
			alert('NO');
		}
	}

	async function deleteToken(): Promise<void> {
		if (token === null) {
			return;
		}

		const res = await apiService.delete(token.id);

		if (res) {
			await loadToken();
		} else {
			alert('NO');
		}
	}
</script>

<div>
	{#if token === null}
		<div class="flex flex-col gap-2">
			<span>No token registered.</span>
			<input
				type="text"
				class="w-96 border-0 border-b-2 border-primary-300 focus:outline-none focus:border-primary-500"
				bind:value={urlInputValue}
				placeholder="Nextcloud URL"
			>
			<input
				type="text"
				class="w-96 border-0 border-b-2 border-primary-300 focus:outline-none focus:border-primary-500"
				bind:value={usernameInputValue}
				placeholder="Username"
			>
			<input
				type="text"
				class="w-96 border-0 border-b-2 border-primary-300 focus:outline-none focus:border-primary-500"
				bind:value={tokenInputValue}
				placeholder="Token"
			>
			<button type="button" class="w-96 btn preset-filled-primary-500" onclick={saveToken}>Save</button>
		</div>
	{:else}
		<div class="flex flex-row items-center gap-2">
			<div>
				<span class="font-bold">Registered Token:</span> {token.app_token} ({token.username}, {token.nextcloud_url})
			</div>
			<button onclick={deleteToken}>
				<IconTrash />
			</button>
		</div>
	{/if}
</div>