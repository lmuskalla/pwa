<script lang="ts">
	import type { Todo } from '$lib/types/todo';

	let { todos } = $props<{ todos: Array<Todo> }>();
</script>

<div class="w-full text-right text-xs text-surface-300 pr-2 mb-2">
	{todos.length} Todos
</div>