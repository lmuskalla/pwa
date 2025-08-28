import type {
	Todo,
	TodoCategory,
	TodoFilter,
	TodoPriority,
	CreateTodoRequest,
	TodoEffort,
	TodoStatus,
	GroupedTodos,
	TodoFilterType
} from '$lib/types/todo';
import type { Tag } from '$lib/types/tag';
import { setContext, getContext } from 'svelte';
import { getAuth } from '$lib/state/Auth.svelte';
import { page } from '$app/state';
import TodoApiService from '$lib/services/api/TodoApiService';
import TodoFilterService from '$lib/services/TodoFilterService';
import TodoGroupingService from '$lib/services/TodoGroupingService';
import { Tags } from '$lib/state/Tags.svelte';

export class Todos {
	loaded = $state<boolean>(false);
	todos = $state<Array<Todo>>([]);
	filteredTodos = $state<Array<Todo>>([]);
	groupedTodos = $state<Array<GroupedTodos>>([]);
	categories = $state<Array<TodoCategory>>([]);
	activeFilters = $state<Array<TodoFilter>>([]);
	view = $state<'list' | 'kanban' | 'card'>('list');
	auth = getAuth();
	apiService: TodoApiService;
	filterService: TodoFilterService;
	groupingService = new TodoGroupingService();

	constructor() {
		this.apiService = new TodoApiService(this.auth.getToken()!);
		this.filterService = new TodoFilterService();
		this.groupingService = new TodoGroupingService();
	}

	async load(): Promise<void> {
		const res = await this.apiService.list();

		if (res) {
			this.loaded = true;
			this.todos = res;
			this.filteredTodos = this.todos;
			this.checkUrlForFilter();
		}

		this.sort();
		this.groupByStatus();
	}

	async loadCategories(): Promise<void> {
		const res = await this.apiService.listCategories();

		if (res) this.categories = res;
		this.sortCategories();
	}

	sort(): void {
		const order = ['high', 'medium', 'low'] as const;
		const rank = (p: unknown) => {
			const i = order.indexOf(String(p).toLowerCase() as (typeof order)[number]);
			return i === -1 ? order.length : i; // unknown priorities go last
		};

		this.filteredTodos = [...this.filteredTodos].sort((a, b) => {
			if (a.is_completed !== b.is_completed) {
				return Number(a.is_completed) - Number(b.is_completed); // incomplete first
			}
			return rank(a.priority) - rank(b.priority); // high -> medium -> low
		});
	}
	
	sortCategories(): void {
		this.categories = [...this.categories].sort((a, b) => {
			return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
		});
	}

	changeView(): void {
		if (this.view === 'list') {
			this.view = 'kanban';
		} else {
			this.view = 'list';
		}
	}

	groupByStatus(): void {
		this.groupedTodos = this.groupingService.groupByStatus(this.filteredTodos);
	}

	checkUrlForFilter(): void {
		const type = page.url.searchParams.get('filterType'),
			value: string | number | null = page.url.searchParams.get('filterValue');

		if (type && value) {
			this.addFilter({ type: type as TodoFilterType, value });
		}
		
		this.useFilters(this.activeFilters);
	}

	useFilters(filters: Array<TodoFilter>): void {
		this.filteredTodos = this.todos;
		
		if (!filters.some(f => f.type === 'status' && f.value === 'backlog')) {
			this.filteredTodos = this.filterService.filterOutBacklog(this.filteredTodos);
		}
		
		for (const filter of filters) {
			this.filteredTodos = this.filterService.filter(filter, this.filteredTodos);
		}

		this.activeFilters = filters;
		this.sort();
		this.groupByStatus();
	}

	addFilter(filter: TodoFilter): void {
		this.activeFilters.push(filter);
	}

	removeFilter(filter: TodoFilter): void {
		this.activeFilters = this.activeFilters.filter(f => f !== filter);
	}

	clearFilters(): void {
		this.activeFilters = [];
	}

	isFilterActive(filter: TodoFilter): boolean {
		return this.activeFilters.some(f => f.type === filter.type && f.value === filter.value);
	}

	isCategoryFilterActive(): boolean {
		return this.activeFilters.some(f => f.type === 'category');
	}

	isTagFilterActive(): boolean {
		return this.activeFilters.some(f => f.type === 'tag');
	}

	async quickCreate(input: string, tags: Tags): Promise<boolean> {
		const tagIds: Array<number> = [];
		let category: number | null = null;
		let dueDate = '';
		let title = input;

		const tagMatches = input.match(/#[\w-]+/g);
		if (tagMatches) {
			for (const tag of tagMatches) {
				const tagId = tags.tags.find((t) => t.name.toLowerCase() === tag.substring(1).toLowerCase())?.id;

				if (tagId) {
					tagIds.push(tagId);
					title = title.replace(tag, '').trim();
				} else {
					const newTag = await tags.create(tag.substring(1));
					if (newTag) {
						tagIds.push(newTag.id);
					}
				}
			}
		}

		if (tagIds.length === 0 && this.activeFilters.some(f => f.type === 'tag')) {
			tagIds.push(this.activeFilters.find(f => f.type === 'tag')?.value as number);
		}

		const categoryMatch = input.match(/\/[\w-]+/);
		if (categoryMatch) {
			const categoryTitle = categoryMatch[0].substring(1);
			const foundCategory = this.categories.find((c) => c.title.toLowerCase() === categoryTitle.toLowerCase());

			if (foundCategory) {
				category = foundCategory.id;
				title = title.replace(categoryMatch[0], '').trim();
			}
		}

		if (category === null && this.activeFilters.some(f => f.type === 'category')) {
			category = this.activeFilters.find(f => f.type === 'category')?.value as number;
		}

		const dueDateMatch = input.match(/due:[\w.-]+/);
		if (dueDateMatch) {
			dueDate = dueDateMatch[0].substring(4);
			title = title.replace(/due:[\w.-]+/, '').trim();
		}

		const todo: CreateTodoRequest = {
			title,
			tags: tagIds,
			category_id: category,
			due_at: dueDate
		};
	
		const ok = await this.apiService.create(todo);

		if (ok) {
			await this.load();
			return Promise.resolve(true);
		}

		return Promise.resolve(false);
	}

	async delete(todo: Todo): Promise<boolean> {
		const ok = await this.apiService.delete(todo.id);
		if (ok) await this.load();
		return ok;
	}

	async createCategory(title: string): Promise<boolean> {
		const ok = await this.apiService.createCategory({ title });
		if (ok) await this.loadCategories();
		return ok;
	}

	async deleteCategory(category: TodoCategory): Promise<boolean> {
		const ok = await this.apiService.deleteCategory(category.id);
		if (ok) await this.loadCategories();
		return ok;
	}

	async changePriority(todo: Todo, priority: TodoPriority): Promise<boolean> {
		const ok = await this.apiService.update(todo.id, { priority });
		if (ok) await this.load();
		return ok;
	}

	async addTag(todo: Todo, tagId: number): Promise<boolean> {
		const tagIds = todo.tags.map(t => t.id);
		const ok = await this.apiService.update(todo.id, {
			tags: tagIds.concat([tagId])
		})

		if (ok) await this.load();
		return ok;
	}

	async removeTag(todo: Todo, tag: Tag): Promise<boolean> {
		const tagIds = todo.tags.map(t => t.id);
		const ok = await this.apiService.update(todo.id, {
			tags: tagIds.filter(id => id != tag.id)
		});

		if (ok) await this.load();
		return ok;
	}

	async addCategory(todo: Todo, categoryId: number): Promise<boolean> {
		const ok = await this.apiService.update(todo.id, {
			category_id: categoryId
		});

		if (ok) await this.load();
		return ok;
	}

	async changeCompleted(todo: Todo, checked: boolean): Promise<boolean> {
		const ok = await this.apiService.update(todo.id, {
			is_completed: checked
		});

		if (ok) await this.load();
		return ok;
	}

	async changeEffort(todo: Todo, effort: TodoEffort): Promise<boolean> {
		const ok = await this.apiService.update(todo.id, { effort });
		if (ok) await this.load();
		return ok;
	}

	async changeStatus(todo: Todo, status: TodoStatus): Promise<boolean> {
		const ok = await this.apiService.update(todo.id, { status });
		if (ok) await this.load();
		return ok;
	}

	async changeProgress(todo: Todo, progress: number): Promise<boolean> {
		const ok = await this.apiService.update(todo.id, { progress });
		if (ok) await this.load();
		return ok;
	}

	async changeDue(todo: Todo, due_at: string): Promise<boolean> {
		const ok = await this.apiService.update(todo.id, { due_at });
		if (ok) await this.load();
		return ok;
	}

	async changeTitle(todo: Todo, title: string): Promise<boolean> {
		const ok = await this.apiService.update(todo.id, { title });
		if (ok) await this.load();
		return ok;
	}

	async changeDescription(todo: Todo, description: string): Promise<boolean> {
		const ok = await this.apiService.update(todo.id, { description });
		if (ok) await this.load();
		return ok;
	}
}

const TODOS_KEY = Symbol('PWA_TODOS');

export function setTodos(): Todos {
	return setContext(TODOS_KEY, new Todos());
}

export function getTodos(): Todos {
	return getContext<Todos>(TODOS_KEY);
}
