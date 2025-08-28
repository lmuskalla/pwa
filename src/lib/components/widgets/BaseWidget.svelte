<script lang="ts">
	let { label, children } = $props();
</script>

<div class="w-full h-auto md:w-110p-4">
	{#if label !== null}
		<div class="text-xl mb-2 border-b-2 pb-2 border-secondary-100 text-secondary-800 dark:text-white">{label}</div>
	{/if}
	{@render children?.()}
</div>