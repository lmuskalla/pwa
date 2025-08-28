<script lang="ts">
	import IconPizza from '@lucide/svelte/icons/pizza';

	let { fill } = $props<{ fill: 0 | 25 | 50 | 75 | 100 }>();
</script>

<div class="size-16 text-yellow-500 flex items-end relative rounded-full border-2 border-yellow-700 scale-80 translate-x-[-3px] translate-y-[-4px]">
	{#if fill === 0}
		<IconPizza class="size-8 absolute top-[-1px] left-[-1px]" />
	{:else if fill === 25}
		<IconPizza class="size-8 absolute top-[-1px] left-[-1px]" />
		<IconPizza class="size-8 absolute top-[-6px] left-[18px] rotate-[60deg]" />
		<IconPizza class="size-8 absolute top-[8px] right-[-5px] rotate-[120deg]" />
	{:else if fill === 50}
		<IconPizza class="size-8 absolute top-[-1px] left-[-1px]" />
		<IconPizza class="size-8 absolute top-[-6px] left-[19px] rotate-[60deg]" />
		<IconPizza class="size-8 absolute top-[8px] right-[-5px] rotate-[120deg]" />
		<IconPizza class="size-8 absolute bottom-0 right-[-1px] rotate-[180deg]" />
	{:else if fill === 75}
		<IconPizza class="size-8 absolute top-[-1px] left-[-1px]" />
		<IconPizza class="size-8 absolute top-[-6px] left-[19px] rotate-[60deg]" />
		<IconPizza class="size-8 absolute top-[8px] right-[-5px] rotate-[120deg]" />
		<IconPizza class="size-8 absolute bottom-0 right-[-1px] rotate-[180deg]" />
		<IconPizza class="size-8 absolute bottom-[-6px] left-[9px] rotate-[240deg]" />
		<IconPizza class="size-8 absolute bottom-[8px] left-[-6px] rotate-[300deg]" />
	{:else if fill === 100}
		<div class="w-full h-full absolute top-[-11px] left-[-10px] bg-white rounded-full scale-50">
			<IconPizza class="size-8 absolute top-[-1px] left-[-1px]" />
			<IconPizza class="size-8 absolute top-[-6px] left-[19px] rotate-[60deg]" />
			<IconPizza class="size-8 absolute top-[8px] right-[-5px] rotate-[120deg]" />
			<IconPizza class="size-8 absolute bottom-0 right-[-1px] rotate-[180deg]" />
			<IconPizza class="size-8 absolute bottom-[-6px] left-[9px] rotate-[240deg]" />
			<IconPizza class="size-8 absolute bottom-[8px] left-[-6px] rotate-[300deg]" />
		</div>
		<div class="w-full h-full absolute top-[12px] left-[-8px] bg-white rounded-full scale-50">
			<IconPizza class="size-8 absolute top-[-1px] left-[-1px]" />
			<IconPizza class="size-8 absolute top-[-6px] left-[19px] rotate-[60deg]" />
			<IconPizza class="size-8 absolute top-[8px] right-[-5px] rotate-[120deg]" />
			<IconPizza class="size-8 absolute bottom-0 right-[-1px] rotate-[180deg]" />
			<IconPizza class="size-8 absolute bottom-[-6px] left-[9px] rotate-[240deg]" />
			<IconPizza class="size-8 absolute bottom-[8px] left-[-6px] rotate-[300deg]" />
		</div>
		<div class="w-full h-full absolute top-[3px] right-[-14px] bg-white rounded-full scale-50">
			<IconPizza class="size-8 absolute top-[-1px] left-[-1px]" />
			<IconPizza class="size-8 absolute top-[-6px] left-[19px] rotate-[60deg]" />
			<IconPizza class="size-8 absolute top-[8px] right-[-5px] rotate-[120deg]" />
			<IconPizza class="size-8 absolute bottom-0 right-[-1px] rotate-[180deg]" />
			<IconPizza class="size-8 absolute bottom-[-6px] left-[9px] rotate-[240deg]" />
			<IconPizza class="size-8 absolute bottom-[8px] left-[-6px] rotate-[300deg]" />
		</div>
	{/if}
</div>

