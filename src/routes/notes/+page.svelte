<script lang="ts">
	import Typewriter from 'svelte-typewriter';
	import { getTranslation } from '$lib/state/Translation.svelte';

	const ts = getTranslation();
</script>

<div class="w-full h-full flex flex-col items-center justify-center">
	<Typewriter>
		<h1 class="text-2xl">{ts.get.notes.welcome}</h1>
	</Typewriter>
	<Typewriter delay={1200}>
		<h2 class="text-xl mt-4">{ts.get.notes.instruction}</h2>
	</Typewriter>
</div>