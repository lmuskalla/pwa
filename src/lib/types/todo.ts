import type { Tag } from './tag';

export type TodoPriority = 'low' | 'medium' | 'high';
export type TodoStatus = 'backlog' | 'pending' | 'in-progress' | 'waiting' | 'almost-done';
export type TodoEffort = null | 'low' | 'medium' | 'high';
export type TodoDueAtFilter = 'today' | 'tomorrow' | 'week' | 'overdue';
export type TodoFilterType = 'status' | 'priority' | 'due' | 'effort' | 'category' | 'tag';

export interface TodoFilter {
	type: TodoFilterType;
	value: string | number;
}

export interface Todo {
	id: string;
	title: string;
	description: string;
	priority: TodoPriority;
	status: TodoStatus;
	effort: TodoEffort;
	progress: null | number;
	is_completed: boolean;
	due_at: string;
	category: TodoCategory | null;
	tags: Array<Tag>;
	created_at: string;
	updated_at: string;
	completed_at: string;
}

export interface GroupedTodos {
	status: TodoStatus;
	todos: Array<Todo>;
}

export interface ListTodosResponse {
	data: Array<Todo>
}

export interface GetTodoResponse {
	data: Todo
}

export interface CreateTodoRequest {
	title: string;
	tags?: Array<number>,
	category_id?: number | null;
	due_at?: string | null;
	effort?: TodoEffort | null;
}

export interface UpdateTodoRequest {
	title?: string;
	description?: string;
	tags?: Array<number>,
	category_id?: number | null;
	priority?: TodoPriority | null;
	due_at?: string | null;
	status?: TodoStatus;
	progress?: number | null;
	effort?: TodoEffort | null;
	is_completed?: boolean;
}

export interface TodoCategory {
	id: number;
	title: string;
	created_at: string;
	updated_at: string;
}

export interface ListTodoCategoriesResponse {
	data: Array<TodoCategory>
}

export interface CreateTodoCategoryRequest {
	title: string;
}

export interface TodoNavigationItem {
	filter: TodoFilter | null;
	label: string;
}

export interface TodoNavigationSection {
	header: string;
	items: Array<TodoNavigationItem>;
}