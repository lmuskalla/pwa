<script lang="ts">
	import { slide } from 'svelte/transition';
	import { getTranslation } from '$lib/state/Translation.svelte';
	import { getTrackerData } from '$lib/state/TrackerData.svelte';
	import { urls } from '$lib/helpers/UrlHelper';
	import { getUrlFormat } from '$lib/helpers/DateHelper';

	const ts = getTranslation(),
		trackerData = getTrackerData();

	let dateView = $derived(trackerData.selectedDate)
</script>

<div class="w-100 p-4 flex flex-row space-x-4" in:slide>
	<a href={urls.tracker}>
		<h1 class="text-2xl" class:font-bold={!dateView}>Overview</h1>
	</a>
	<a href={urls.trackerDate.replace('%s', getUrlFormat(new Date()))}>
		<h1 class="text-2xl" class:font-bold={dateView}>Daily</h1>
	</a>
</div>