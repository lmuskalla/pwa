<script lang="ts">
	import { page } from '$app/state';
	import { urls } from '$lib/helpers/UrlHelper';
	import { getTranslation } from '$lib/state/Translation.svelte';

	const ts = getTranslation();

	let loginActive = $derived(page.url.pathname == urls.login);
	let registerActive = $derived(page.url.pathname == urls.register);
</script>

<nav class="absolute top-0 flex justify-between items-center space-x-8 p-4">
	<a href={urls.login} class="text-2xl" class:font-bold={loginActive}>{ts.get.auth.login}</a>
	<a href={urls.register} class="text-2xl" class:font-bold={registerActive}>{ts.get.auth.register}</a>
</nav>
