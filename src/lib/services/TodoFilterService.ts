import type {
	Todo,
	TodoPriority,
	TodoStatus,
	TodoEffort,
	TodoDueAtFilter,
	TodoFilter
} from '$lib/types/todo';
import {
	isDateInThePast,
	isDateThisWeek,
	isDateToday,
	isDateTomorrow
} from '$lib/helpers/DateHelper';

export default class TodoFilterService {
	filter(request: TodoFilter, todos: Array<Todo>): Array<Todo> {
		switch (request.type) {
			case 'priority':
				return this.filterByPriority(request.value as TodoPriority, todos);
			case 'status':
				return this.filterByStatus(request.value as TodoStatus, todos);
			case 'effort':
				return this.filterByEffort(request.value as TodoEffort, todos);
			case 'due':
				return this.filterByDueDate(request.value as TodoDueAtFilter, todos);
			case 'category':
				return this.filterByCategory(Number(request.value), todos);
			case 'tag':
				return this.filterByTag(Number(request.value), todos);
			default:
				return todos;
		}
	}
	
	filterOutBacklog(todos: Array<Todo>): Array<Todo> {
		return todos.filter(t => t.status !== 'backlog');
	}
	
	filterByPriority(priority: TodoPriority, todos: Array<Todo>): Array<Todo> {
		return todos.filter(t => t.priority === priority);
	}

	filterByStatus(status: TodoStatus, todos: Array<Todo>): Array<Todo> {
		return todos.filter(t => t.status === status);
	}

	filterByEffort(effort: TodoEffort, todos: Array<Todo>): Array<Todo> {
		return todos.filter(t => t.effort === effort || (t.effort === null && effort === 'medium'));
	}

	filterByDueDate(due: TodoDueAtFilter, todos: Array<Todo>): Array<Todo> {
		switch (due) {
			case 'today':
				return todos.filter(t => {
					return t.due_at ? isDateToday(new Date(t.due_at)) : false;
				});
			case 'tomorrow':
				return todos.filter((t) => {
					return t.due_at ? isDateTomorrow(new Date(t.due_at)) : false;
				});
			case 'week':
				return todos.filter((t) => {
					return t.due_at ? isDateThisWeek(new Date(t.due_at)) : false;
				});
			case 'overdue':
				return todos.filter((t) => {
					return t.due_at ? isDateInThePast(new Date(t.due_at)) : false;
				});
			default:
				return todos;
		}
	}

	filterByCategory(categoryId: number, todos: Array<Todo>): Array<Todo> {
		return todos.filter((t) => {
			if (!t.category) return false;
			return t.category.id === categoryId;
		});
	}

	filterByTag(tagId: number, todos: Array<Todo>): Array<Todo> {
		return todos.filter((t) => {
			if (!t.tags) return false;
			return t.tags.some((tag) => tag.id === tagId);
		});
	}
}