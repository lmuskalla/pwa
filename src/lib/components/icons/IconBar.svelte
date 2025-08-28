<script lang="ts">
	let { fill } = $props<{ fill: 0 | 25 | 50 | 75 | 100 }>();

	function getFill(): string {
		switch (fill) {
			case 0:
			default:
				return 'h-0';
			case 25:
				return 'h-1/4';
			case 50:
				return 'h-1/2';
			case 75:
				return 'h-3/4';
			case 100:
				return 'h-full';
		}
	}
</script>

<div class="size-16 flex items-end relative">
	<div class="absolute bottom-0 left-0 border-2 rounded-full border-surface-700 w-full h-full z-30"></div>
	<div class="absolute top-[-16px] left-[-16px] border-16 border-white rounded-full bg-transparent size-24 z-20"></div>
	<div class="absolute bottom-0 left-0 w-full {getFill()} bg-stone-500 z-10"></div>
</div>

