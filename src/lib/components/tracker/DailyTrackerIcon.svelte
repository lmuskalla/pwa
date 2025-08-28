<script lang="ts">
	import IconFrown from '@lucide/svelte/icons/frown';
	import IconAngry from '@lucide/svelte/icons/angry';
	import IconMeh from '@lucide/svelte/icons/meh';
	import IconSmile from '@lucide/svelte/icons/smile';
	import IconLaugh from '@lucide/svelte/icons/laugh';
	import IconDumbbell from '@lucide/svelte/icons/dumbbell';
	import IconBike from '@lucide/svelte/icons/bike';
	import IconMountain from '@lucide/svelte/icons/mountain';
	import IconWavesLadder from '@lucide/svelte/icons/waves-ladder';
	import IconFootprints from '@lucide/svelte/icons/footprints';
	import IconSparkles from '@lucide/svelte/icons/sparkles';
	import IconBedSingle from '@lucide/svelte/icons/bed-single';
	import IconApple from '@lucide/svelte/icons/apple';
	import IconBriefcaseBusiness from '@lucide/svelte/icons/briefcase-business';
	import IconWater from '$lib/components/icons/IconWater.svelte';
	import IconPlate from '$lib/components/icons/IconPlate.svelte';
	import type { TrackerType } from '$lib/types/tracker';

	let {
		type,
		index,
		onSelect,
		isHighlighted
	} = $props<{
		type: TrackerType,
		index: number,
		onSelect: (index: number) => void,
		isHighlighted: (index: number) => boolean
	}>();

	function getFillForIndex(index: number): 0 | 25 | 50 | 75 | 100 {
		switch (index) {
			case 1: default: return 0;
			case 2: return 25;
			case 3: return 50;
			case 4: return 75;
			case 5: return 100;
		}
	}

	function getColor(index: number): string {
		switch (index) {
			case 1: default: return 'red-500';
			case 2: return 'orange-500';
			case 3: return 'blue-500';
			case 4: return 'green-300';
			case 5: return 'green-500';
		}
	}

	const color = getColor(index),
		fill = getFillForIndex(index);
</script>

<button class="size-22 p-4 group rounded-lg cursor-pointer text-{color} hover:bg-surface-100/40 {isHighlighted(index) ? 'bg-surface-100/40' : ''}" onclick={() => onSelect(index)}>
	{#if type === 'water'}
		<IconWater fill={fill} />
	{:else if type === 'sleep'}
		<IconBedSingle class="size-full" />
	{:else if type === 'dreams'}
		<IconSparkles class="size-full" />
	{:else if type === 'work'}
		<IconBriefcaseBusiness class="size-full" />
	{:else if type === 'food_quality'}
		<IconApple class="size-full" />
	{:else if type === 'food_amount'}
		<IconPlate fill={fill} />
	{:else if type === 'sports'}
		{#if index === 1}
			<IconDumbbell class="size-full" />
		{:else if index === 2}
			<IconBike class="size-full" />
		{:else if index === 3}
			<IconMountain class="size-full" />
		{:else if index === 4}
			<IconFootprints class="size-full" />
		{:else if index === 5}
			<IconWavesLadder class="size-full" />
		{/if}
	{:else}
		{#if index === 1}
			<IconAngry class="size-full" />
		{:else if index === 2}
			<IconFrown class="size-full" />
		{:else if index === 3}
			<IconMeh class="size-full" />
		{:else if index === 4}
			<IconSmile class="size-full" />
		{:else if index === 5}
			<IconLaugh class="size-full" />
		{/if}
	{/if}
</button>