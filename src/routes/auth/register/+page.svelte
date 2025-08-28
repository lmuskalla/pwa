<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { urls } from '$lib/helpers/UrlHelper';
	import { getAuth } from '$lib/state/Auth.svelte';
	import { fade } from 'svelte/transition';
	import AuthNavbar from '$lib/components/auth/AuthNavbar.svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { getNotifications } from '$lib/state/Notifications.svelte';

	onMount(() => {
		if (auth.loggedIn) {
			goto(urls.home);
		}
	});

	const auth = getAuth(),
		ts = getTranslation(),
		notifications = getNotifications(),
		loadingIndicator = getLoadingIndicator();

	let email = $state<string>(''),
		emailError = $state<boolean>(false),
		name = $state<string>(''),
		nameError = $state<boolean>(false),
		password = $state<string>(''),
		passwordError = $state<boolean>(false),
		passwordConfirmation = $state<string>(''),
		passwordConfirmationError = $state<boolean>(false);

	async function onsubmit(e: SubmitEvent): Promise<void> {
		e.preventDefault();

		if (!validateInput()) {
			return;
		}

		loadingIndicator.start();

		let success = await auth.register({ name, email, password, passwordConfirmation });

		loadingIndicator.stop();

		if (success) {
			notifications.add({
				type: 'success',
				message: ts.get.auth.register_success,
			});
			await goto(urls.login);
		} else {
			notifications.add({
				type: 'error',
				message: ts.get.auth.register_error,
			});
		}
	}

	function validateInput(): boolean {
		nameError = false;
		emailError = false;
		passwordError = false;
		passwordConfirmationError = false;
		nameError = (name === '');
		emailError = (email === '');
		passwordError = (password === '');
		passwordConfirmationError = (passwordConfirmation === '' || password !== passwordConfirmation);

		return !(nameError || emailError || passwordError || passwordConfirmationError);
	}
</script>

<div class="w-full not-dark:bg-primary-50 h-screen flex flex-row justify-center items-center">
	<AuthNavbar />
	<div class="w-full max-w-xs">
		<form class="bg-white dark:bg-surface-700 shadow-md rounded px-8 pt-6 pb-8 mb-4 space-y-4" {onsubmit}>
			<label class="label">
				<span class="label-text text-surface-700 dark:text-white text-sm font-bold mb-2">{ts.get.auth.name}</span>
				<input type="text"  class="input dark:text-white" placeholder={ts.get.auth.name_placeholder} bind:value={name} />
				{#if nameError}
					<p class="text-red-500 text-xs mt-2 pl-2" in:fade>{ts.get.auth.name_error}</p>
				{/if}
			</label>
			<label class="label">
				<span class="label-text text-surface-700 dark:text-white text-sm font-bold mb-2">{ts.get.auth.email}</span>
				<input type="text"  class="input dark:text-white" placeholder={ts.get.auth.email_placeholder} bind:value={email} />
				{#if emailError}
					<p class="text-red-500 text-xs mt-2 pl-2" in:fade>{ts.get.auth.email_error}</p>
				{/if}
			</label>
			<label class="label">
				<span class="label-text text-surface-700 dark:text-white text-sm font-bold mb-2">{ts.get.auth.password}</span>
				<input type="password"  class="input dark:text-white" placeholder={ts.get.auth.password_placeholder} bind:value={password} />
				{#if passwordError}
					<p class="text-red-500 text-xs mt-2 pl-2" in:fade>{ts.get.auth.password_error}.</p>
				{/if}
			</label>
			<label class="label">
				<span class="label-text text-surface-700 dark:text-white text-sm font-bold mb-2">{ts.get.auth.password_confirmation}</span>
				<input type="password"  class="input dark:text-white" placeholder={ts.get.auth.password_confirmation_placeholder} bind:value={passwordConfirmation} />
				{#if passwordConfirmationError}
					<p class="text-red-500 text-xs mt-2 pl-2" in:fade>{ts.get.auth.password_confirmation_error}</p>
				{/if}
			</label>
			<div class="flex items-center justify-between">
				<button class="btn preset-filled-primary-500" type="submit">
					{ts.get.auth.register}
				</button>
			</div>
		</form>
	</div>
</div>
