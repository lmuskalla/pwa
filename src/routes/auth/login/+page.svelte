<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { urls } from '$lib/helpers/UrlHelper';
	import { getAuth } from '$lib/state/Auth.svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { getNotifications } from '$lib/state/Notifications.svelte';

	import { fade } from 'svelte/transition';
	import AuthNavbar from '$lib/components/auth/AuthNavbar.svelte';

	const auth = getAuth(),
		ts = getTranslation(),
		loadingIndicator = getLoadingIndicator(),
		notifications = getNotifications();

	let email = $state<string>(''),
		emailError = $state<boolean>(false),
		password = $state<string>(''),
		passwordError = $state<boolean>(false);

	onMount(() => {
		if (auth.loggedIn) {
			goto(urls.home);
		}
	});

	async function onsubmit(e: SubmitEvent): Promise<void> {
		e.preventDefault();

		if (!validateInput()) {
			return;
		}

		loadingIndicator.start();

		let success = await auth.login({ email, password });

		loadingIndicator.stop();

		if (success) {
			notifications.add({
				type: 'success',
				message: ts.get.auth.login_success,
			});
			await goto(urls.home);
		} else {
			notifications.add({
				type: 'error',
				message: ts.get.auth.login_error,
			});
		}
	}

	function validateInput(): boolean {
		emailError = false;
		passwordError = false;
		emailError = (email === '');
		passwordError = (password === '');

		return !(emailError || passwordError);
	}
</script>

<div class="w-full not-dark:bg-primary-50 h-screen flex flex-row justify-center items-center">
	<AuthNavbar />
	<div class="w-full max-w-xs">
		<form class="bg-white dark:bg-surface-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-4" {onsubmit}>
			<label class="label">
				<span class="label-text text-surface-700 dark:text-white text-sm font-bold mb-2">{ts.get.auth.email}</span>
				<input type="text" class="input dark:text-white" placeholder={ts.get.auth.email_placeholder} bind:value={email} />
				{#if emailError}
					<p class="text-red-500 text-xs mt-2 pl-2" in:fade>{ts.get.auth.email_error}</p>
				{/if}
			</label>
			<label class="label">
				<span class="label-text text-surface-700 dark:text-white text-sm font-bold mb-2">{ts.get.auth.password}</span>
				<input type="password"  class="input dark:text-white" placeholder={ts.get.auth.password_placeholder} bind:value={password} />
				{#if passwordError}
					<p class="text-red-500 text-xs mt-2 pl-2" in:fade>{ts.get.auth.password_error}</p>
				{/if}
			</label>
			<div class="flex items-center justify-between">
				<button class="btn preset-filled-primary-500" type="submit">
					{ts.get.auth.sign_in}
				</button>
			</div>
		</form>
		<div class="text-center text-gray-500 text-xs flex items-center justify-between px-8">
			<a class="inline-block align-baseline font-bold text-sm text-primary-500 hover:text-primary-800" href="#">
				{ts.get.auth.forgot_password}
			</a>
			<a class="inline-block align-baseline font-bold text-sm text-primary-500 hover:text-primary-800" href={urls.register}>
				{ts.get.auth.register}
			</a>
		</div>
	</div>
</div>
