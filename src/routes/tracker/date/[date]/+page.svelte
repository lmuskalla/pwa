<script lang="ts">
	import type { CreateTrackerRequest, TrackerType } from '$lib/types/tracker';
	import DailyTracker from '$lib/components/tracker/DailyTracker.svelte';
	import IconChevronLeft from '@lucide/svelte/icons/chevron-left';
	import IconChevronRight from '@lucide/svelte/icons/chevron-right';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { formatDate, getUrlFormat, getNextDay, getPrevDay, isDateInTheFuture, isDateToday, isDateYesterday } from '$lib/helpers/DateHelper';
	import { getTrackerData } from '$lib/state/TrackerData.svelte';
	import { getLoadingIndicator } from '$lib/state/LoadingIndicator.svelte';
	import { getNotifications } from '$lib/state/Notifications.svelte';
	import { getTranslation } from '$lib/state/Translation.svelte';
	import { onMount } from 'svelte';

	const date = $derived(page.params.date),
		trackerData = getTrackerData(),
		dayData = $derived(trackerData.getDayData()),
		ts = getTranslation(),
		loadingIndicator = getLoadingIndicator(),
		notifications = getNotifications();

	let save = $state<CreateTrackerRequest | null>(null);

	onMount(async () => {
		loadingIndicator.start();
		await trackerData.load();
		loadingIndicator.stop();
	})

	async function onChange(type: TrackerType, value: number): Promise<void> {
		if (value < 1 || value > 5 || date === undefined) {
			return;
		}

		if (save === null) {
			save = {
				date: trackerData.selectedDate,
				[type]: value,
			}
		} else {
			save[type] = value;
		}
	}

	async function onSave(): Promise<void> {
		if (save === null || save.date === null) {
			return;
		}

		loadingIndicator.start();
		await trackerData.save(save);
		loadingIndicator.stop();
		notifications.add({
			type: 'success',
			message: ts.get.tracker.save_success
		})
	}
</script>


<div class="flex-row space-y-4 mt-8 relative">
	<div class="flex flex-row w-full justify-center items-center gap-4 mb-8">
		<button type="button" onclick={() => goto(getUrlFormat(getPrevDay(new Date(date))))}>
			<IconChevronLeft />
		</button>
		<h2 class="text-xl sm:text-2xl font-bold">
			{#if isDateToday(new Date(date)) }
				Today
			{:else if isDateYesterday(new Date(date)) }
				Yesterday
			{:else}
				{formatDate(date)}
			{/if}
		</h2>
		<button
			type="button"
			class="{isDateInTheFuture(getNextDay(new Date(date))) ? 'opacity-0' : 'opacity-100'}"
			onclick={() => goto(getUrlFormat(getNextDay(new Date(date))))}
		>
			<IconChevronRight />
		</button>
	</div>
	<DailyTracker type="mood" label={ts.get.tracker.mood} currentValue={dayData?.mood} {onChange} />
	<DailyTracker type="sleep" label={ts.get.tracker.sleep} currentValue={dayData?.sleep} {onChange} />
	<DailyTracker type="dreams" label={ts.get.tracker.dreams} currentValue={dayData?.dreams} {onChange} />
	<DailyTracker type="food_quality" label={ts.get.tracker.food_quality} currentValue={dayData?.food_quality} {onChange} />
	<DailyTracker type="food_amount" label={ts.get.tracker.food_amount} currentValue={dayData?.food_amount} {onChange} />
	<DailyTracker type="water" label={ts.get.tracker.water} currentValue={dayData?.water} {onChange} />
	<DailyTracker type="sports" label={ts.get.tracker.sports} currentValue={dayData?.sports} {onChange} />
	<DailyTracker type="work" label={ts.get.tracker.work} currentValue={dayData?.work} {onChange} />
	<div class="w-full mb-8 flex justify-center sm:mb-0 sm:w-auto sm:absolute sm:top-0 sm:right-8">
		<button type="button" class="w-full sm:w-auto h-14 sm:h-auto btn preset-filled-primary-500" onclick={onSave}>Save</button>
	</div>
</div>