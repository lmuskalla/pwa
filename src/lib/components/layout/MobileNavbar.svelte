<script lang="ts">
	import { Navigation } from '@skeletonlabs/skeleton-svelte';

	import IconMenu from '@lucide/svelte/icons/menu';
	import IconHouse from '@lucide/svelte/icons/house';
	import IconCheckCheck from '@lucide/svelte/icons/check-check';
	import IconSettings from '@lucide/svelte/icons/settings';
	import IconLogout from '@lucide/svelte/icons/log-out';
	import IconGoal from '@lucide/svelte/icons/goal';
	import IconNotebook from '@lucide/svelte/icons/notebook';

	import { urls } from '$lib/helpers/UrlHelper';
	import { getTranslation } from '$lib/state/Translation.svelte';
	import { page } from '$app/state';
	import { onMount } from 'svelte';

	const ts = getTranslation();

	onMount(() => {
		const pathname = page.url.pathname.substring(1),
			section = pathname.split('/');

		if (section[0] !== '') {
			value = section[0];
		}
	});

	let value = $state<string>('home');
</script>

<Navigation.Bar width="w-full h-full" {value} background="bg-primary-100/10" onValueChange={(newValue) => (value = newValue)}>
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
	<Navigation.Tile labelExpanded={ts.get.nav.settings} href={urls.settings} title={ts.get.nav.settings} id="settings">
		<IconSettings />
	</Navigation.Tile>
</Navigation.Bar>
