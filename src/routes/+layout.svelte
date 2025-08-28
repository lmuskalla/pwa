<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
	import DesktopNavbar from '$lib/components/layout/DesktopNavbar.svelte';
	import MobileNavbar from '$lib/components/layout/MobileNavbar.svelte';
	import LoadingIndicator from '$lib/components/LoadingIndicator.svelte';
	import Notifications from '$lib/components/Notifications.svelte';
	import { setViewPoint, getViewPoint } from '$lib/state/Viewpoint.svelte';
	import { setAuth, getAuth } from '$lib/state/Auth.svelte';
	import { setTranslation } from '$lib/state/Translation.svelte';
	import { setLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { getKeyManager, setKeyManager } from '$lib/KeyManager.svelte';
	import { setNotifications } from '$lib/state/Notifications.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { urls } from '$lib/helpers/UrlHelper';

	let { children } = $props();

	setViewPoint();
	setAuth();
	setTranslation();
	setKeyManager();
	setLoadingIndicator();
	setNotifications();

	const viewPoint = getViewPoint(),
		auth = getAuth(),
		keyManager = getKeyManager();

	let innerHeight = $state<number>(0);

	onMount(() => {
		if (!auth.loggedIn && !auth.isAuthRoute()) {
			goto(urls.login);
		}

		const updateHeight = () => {
			innerHeight = window.innerHeight;
		};

		updateHeight();
		window.addEventListener('resize', updateHeight);

		return () => window.removeEventListener('resize', updateHeight);
	});
</script>

<svelte:head>
	<title>s o l y t o</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="w-screen flex flex-col 2xl:flex-row overflow-hidden bg-s-light dark:bg-s-dark" style="height: {innerHeight}px;">
	<LoadingIndicator />
	<Notifications />
	{#if !auth.isAuthRoute()}
		{#if viewPoint.isDesktop}
			<div class="hidden 2xl:block w-16 h-full">
				<DesktopNavbar />
			</div>
		{/if}
	{/if}
	<div class="w-full h-full grow overflow-auto">
		{@render children?.()}
	</div>
	{#if !auth.isAuthRoute()}
		{#if !viewPoint.isDesktop}
			<div class="block h-16 2xl:hidden w-full">
				<MobileNavbar />
			</div>
		{/if}
	{/if}
</div>
<!-- text-orange-500 text-green-300 -->

<svelte:window bind:innerHeight onkeydown={(e) => keyManager.handleKeyDown(e)} onkeyup={(e) => keyManager.handleKeyUp(e)} />