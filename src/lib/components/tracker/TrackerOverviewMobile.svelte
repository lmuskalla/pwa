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

<div class="p-4 flex flex-col space-y-2 pt-8">
	{#each dates as date}
		<div>
			<button type="button" class="text-lg hover:font-bold" onclick={() => goto(urls.trackerDate.replace('%s', getUrlFormat(new Date(date))))}>
				{formatDate(date)}
			</button>
			<div class="flex flex-row mt-4">
				{#each trackers as tracker (tracker.type)}
					<div class="w-1/7">
						<OverviewTrackerIcon type={tracker.type} value={getData(getUrlFormat(new Date(date)), tracker.type)} />
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div>