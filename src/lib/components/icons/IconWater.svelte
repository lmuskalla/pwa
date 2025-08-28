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

<div class="w-7/8 mx-1 h-full border-2 border-surface-700 rounded-2xl rounded-tl-none rounded-tr-none flex items-end">
	<div class="w-full {getFill()} bg-blue-300 rounded-xl rounded-tl-none rounded-tr-none"></div>
</div>

