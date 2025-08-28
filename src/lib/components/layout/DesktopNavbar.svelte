<script lang="ts">
    import { Navigation } from '@skeletonlabs/skeleton-svelte';

    import IconMenu from '@lucide/svelte/icons/menu';
    import IconHouse from '@lucide/svelte/icons/house';
    import IconCheckCheck from '@lucide/svelte/icons/check-check';
	import IconSettings from '@lucide/svelte/icons/settings';
	import IconLogout from '@lucide/svelte/icons/log-out';
	import IconGoal from '@lucide/svelte/icons/goal';
	import IconNotebook from '@lucide/svelte/icons/notebook';

	import { page } from '$app/state';
    import { urls } from '$lib/helpers/UrlHelper';
	import { getAuth } from '$lib/state/Auth.svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';
	import { onMount } from 'svelte';

	const auth = getAuth(),
		ts = getTranslation();

	onMount(() => {
		const pathname = page.url.pathname.substring(1),
			section = pathname.split('/');

		if (section[0] !== '') {
			value = section[0];
		}
	});

	let value = $state<string>('home');
</script>

<Navigation.Rail width="w-full" background="bg-primary-100/20" classes="shadow-lg" {value} onValueChange={(newValue) => (value = newValue)}>
    {#snippet tiles()}
        <Navigation.Tile labelExpanded={ts.get.nav.home} href={urls.home} title={ts.get.nav.home} id="home">
            <IconHouse />
        </Navigation.Tile>
        <Navigation.Tile labelExpanded={ts.get.nav.todos} href={urls.todos} title={ts.get.nav.todos} id="todos">
            <IconCheckCheck />
        </Navigation.Tile>
		<Navigation.Tile labelExpanded={ts.get.nav.notes} href={urls.notes} title={ts.get.nav.notes} id="notes">
			<IconNotebook />
		</Navigation.Tile>
		<Navigation.Tile labelExpanded={ts.get.nav.tracker} href={urls.tracker} title={ts.get.nav.tracker} id="tracker">
			<IconGoal />
		</Navigation.Tile>
    {/snippet}
    {#snippet footer()}
		<Navigation.Tile labelExpanded={ts.get.nav.settings} href={urls.settings} title={ts.get.nav.settings} id="settings">
			<IconSettings />
		</Navigation.Tile>
		<Navigation.Tile labelExpanded={ts.get.nav.profile} href={urls.profile} title={ts.get.nav.profile} id="profile">
			<div class="rounded-full bg-surface-200/40 size-10 flex items-center justify-center text-black">
				{auth.user?.name?.[0]?.toUpperCase()}
			</div>
		</Navigation.Tile>
		<Navigation.Tile labelExpanded={ts.get.nav.logout} href={urls.logout} title={ts.get.nav.logout} id="logout">
			<IconLogout />
		</Navigation.Tile>
    {/snippet}
</Navigation.Rail>
