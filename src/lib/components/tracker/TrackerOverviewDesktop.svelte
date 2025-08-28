<script lang="ts">
	import type { TrackerType } from '$lib/types/tracker';
	import { getTrackerData, TrackerData } from '$lib/state/TrackerData.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { formatDate, getUrlFormat } from '$lib/helpers/DateHelper';
	import { onMount } from 'svelte';
	import { urls } from '$lib/helpers/UrlHelper';
	import OverviewTrackerIcon from '$lib/components/tracker/OverviewTrackerIcon.svelte';
	import { goto } from '$app/navigation';

	let { dates, trackers } = $props<{
		dates: Array<Date>,
		trackers: Array<object>,
	}>();

	const trackerData = getTrackerData(),
		loadingIndicator = getLoadingIndicator();

	onMount(async() => {
		loadingIndicator.start();
		await trackerData.load();
		loadingIndicator.stop();
	});

	function getData(date: string, type: TrackerType): number | null {
		const dayData = trackerData.getDayData(date);
		if (!dayData) return null;
		return dayData[type];
	}
</script>

<div class="bg-secondary-100/10 shadow-xs rounded-2xl p-4 flex flex-col pt-8">
	<div class="flex flex-row space-x-2 p-4">
		<div class="w-32 flex items-center justify-center">
			<p></p>
		</div>
		{#each dates as date}
			<div class="w-8 flex items-center justify-center pb-8">
				<button type="button" class="rotate-90 text-xs hover:font-bold" onclick={() => goto(urls.trackerDate.replace('%s', getUrlFormat(new Date(date))))}>
					{formatDate(date)}
				</button>
			</div>
		{/each}
	</div>
	{#each trackers as tracker (tracker.type)}
		<div class="flex flex-row space-x-2 p-4">
			<div class="w-32 flex items-center justify-start font-bold">
				<p>{tracker.label}</p>
			</div>
			{#each dates as date}
				<div class="w-8 flex items-center justify-center">
					<OverviewTrackerIcon type={tracker.type} value={getData(getUrlFormat(new Date(date)), tracker.type)} />
				</div>
			{/each}
		</div>
	{/each}
</div>