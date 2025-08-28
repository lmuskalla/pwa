<script lang="ts">
	import type { Language } from '$lib/types/translation';
	import { getTranslation } from '$lib/state/Translation.svelte';
	import { getTags } from '$lib/state/Tags.svelte';
	import { onMount } from 'svelte';
	import CreateTag from '$lib/components/tags/CreateTag.svelte';
	import TodoEditTag from '$lib/components/todos/TodoEditTag.svelte';
	import TodoEditCategory from '$lib/components/todos/TodoEditCategory.svelte';
	import CreateCategory from '$lib/components/todos/CreateCategory.svelte';
	import ManageNextcloudAppToken from '$lib/components/nextcloudAppTokens/ManageNextcloudAppToken.svelte';
	import { getTodos } from '$lib/state/Todos.svelte';

	const ts = getTranslation(),
		tags = getTags(),
		todos = getTodos();

	onMount(async () => {
		await tags.load();
		await todos.loadCategories();
	});

	function onChangeLanguage(language: Language) {
		ts.changeLanguage(language);
	}
</script>

<div class="p-8">
	<div class="text-3xl xl:text-6xl mb-8">{ts.get.settings.tags}</div>
	<CreateTag />
	<div class="flex flex-row flex-wrap gap-2 py-4">
		{#each tags.tags as tag (tag.id)}
			<TodoEditTag {tag} />
		{/each}
	</div>
	<div class="text-3xl xl:text-6xl my-8">{ts.get.settings.categories}</div>
	<CreateCategory />
	<div class="flex flex-row flex-wrap gap-2 py-4">
		{#each todos.categories as category (category.id)}
			<TodoEditCategory {category} />
		{/each}
	</div>
	<div class="text-3xl xl:text-6xl my-8">{ts.get.settings.language}</div>
	<select class="select w-48" onchange={(e) => onChangeLanguage(e.target.value as Language)}>
		<option value="en" selected={ts.locale === 'en' ? 'selected' : ''}>{ts.get.settings.english}</option>
		<option value="de" selected={ts.locale === 'de' ? 'selected' : ''}>{ts.get.settings.german}</option>
	</select>
<!--	<div class="text-3xl xl:text-6xl my-8 mt-12">{ts.get.settings.nextcloud_app_token}</div>-->
<!--	<ManageNextcloudAppToken />-->
</div>