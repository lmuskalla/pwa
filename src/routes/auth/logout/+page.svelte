<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { urls } from '$lib/helpers/UrlHelper';
	import { getAuth } from '$lib/state/Auth.svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';

	const auth = getAuth(),
		ts = getTranslation();

	onMount(async () => {
		if (auth.loggedIn) {
			auth.logout();

			await new Promise(resolve => setTimeout(resolve, 1500));
		}

		await goto(urls.login);
	});
</script>

<div class="w-full not-dark:bg-primary-50 h-screen flex flex-row justify-center items-center">
	<div class="w-full max-w-xs">
		<div class="not-dark:bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-4">
			{ts.get.auth.logout_success}
		</div>
	</div>
</div>
