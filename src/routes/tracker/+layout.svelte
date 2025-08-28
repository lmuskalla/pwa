<script lang="ts">
	import TrackerNavigation from '$lib/components/tracker/TrackerNavigation.svelte';
	let { children } = $props();
	import { setTrackerData } from '$lib/state/TrackerData.svelte';

	setTrackerData();
</script>

<div class="flex flex-col p-2 xl:p-8">
	<TrackerNavigation />
	{@render children?.()}
</div>