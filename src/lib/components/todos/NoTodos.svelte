<script lang="ts">
	import { getTranslation } from '$lib/state/Translation.svelte';

	const ts = getTranslation();
</script>

<div class="w-full text-left px-8">
	<span class="text-2xl">{ts.get.todos.no_todos}</span>
	<br><br>
	{ts.get.todos.no_todos_desc}
</div>