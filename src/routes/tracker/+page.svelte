<script lang="ts">
	import { getLast30Days } from '$lib/helpers/DateHelper';
	import { getViewPoint } from '$lib/state/Viewpoint.svelte';
	import TrackerOverviewDesktop from '$lib/components/tracker/TrackerOverviewDesktop.svelte';
	import TrackerOverviewMobile from '$lib/components/tracker/TrackerOverviewMobile.svelte';

	const viewPoint = getViewPoint();

	const dates: Array<Date> = getLast30Days(),
		trackers = [
			{ type: 'mood', label: 'Mood' },
			{ type: 'sleep', label: 'Sleep' },
			{ type: 'dreams', label: 'Dreams' },
			{ type: 'food_quality', label: 'Food Quality' },
			{ type: 'food_amount', label: 'Food Amount' },
			{ type: 'water', label: 'Waters' },
			{ type: 'sports', label: 'Sports' },
			{ type: 'work', label: 'Work' },
		];
</script>

{#if viewPoint.isDesktop}
	<div class="hidden xl:block">
		<TrackerOverviewDesktop {dates} {trackers} />
	</div>
{:else}
	<div class="block xl:hidden">
		<TrackerOverviewMobile {dates} {trackers} />
	</div>
{/if}