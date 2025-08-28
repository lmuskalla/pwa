<script lang="ts">
	import type { TrackerType } from '$lib/types/tracker';
	import DailyTrackerIcon from './DailyTrackerIcon.svelte';

	let {
		type,
		label,
		currentValue,
		onChange
	} = $props<{
		type: TrackerType,
		label: string,
		currentValue?: number | null,
		onChange: (type: TrackerType, value: number) => Promise<void>,
	}>();

	let selected = $state<number>(0);

	function onSelect(index: number): void {
		selected = index;
		onChange(type, index);
	}

	function isHighlighted(index: number): boolean {
		return selected === index || (selected === 0 && currentValue === index);
	}
</script>

<div class="flex flex-col md:flex-row justify-center items-center space-x-2 lg:space-x-16">
	<div class="text-xl w-full pl-5 md:pl-0 md:w-48 text-left md:text-right font-bold">{label}</div>
	<div class="flex flex-row justify-between w-full md:w-auto items-center gap-0 lg:gap-4">
		<DailyTrackerIcon {type} index={1} {onSelect} {isHighlighted} />
		<DailyTrackerIcon {type} index={2} {onSelect} {isHighlighted} />
		<DailyTrackerIcon {type} index={3} {onSelect} {isHighlighted} />
		<DailyTrackerIcon {type} index={4} {onSelect} {isHighlighted} />
		<DailyTrackerIcon {type} index={5} {onSelect} {isHighlighted} />
	</div>
</div>