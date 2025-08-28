import type { GroupedTodos, Todo } from '$lib/types/todo.ts';

export default class TodoGroupingService {
	groupByStatus(todos: Array<Todo>): Array<GroupedTodos> {
		const pending: Array<Todo> = [],
			inProgress: Array<Todo> = [],
			waiting: Array<Todo> = [],
			almostDone: Array<Todo> = [];

		for (const todo of todos) {
			switch (todo.status) {
				case 'pending':
					pending.push(todo);
					break;
				case 'in-progress':
					inProgress.push(todo);
					break;
				case 'waiting':
					waiting.push(todo);
					break;
				case 'almost-done':
					almostDone.push(todo);
					break;
			}
		}

		return [
			{ status: 'pending', todos: pending },
			{ status: 'in-progress', todos: inProgress },
			{ status: 'waiting', todos: waiting },
			{ status: 'almost-done', todos: almostDone }
		];
	}
}