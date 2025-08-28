import type {
	Todo,
	ListTodosResponse,
	GetTodoResponse,
	CreateTodoRequest,
	ListTodoCategoriesResponse,
	TodoCategory,
	CreateTodoCategoryRequest,
	UpdateTodoRequest
} from '$lib/types/todo';
import { apiRoutes } from '$lib/helpers/ApiRouteHelper';

export default class TodoApiService {
	authToken: string | null = null;

	constructor(authToken: string) {
		this.authToken = authToken;
	}
	
	async list(): Promise<Array<Todo> | null> {
		const res = await fetch(
			apiRoutes.todos.list,
			{
				headers: {
					'Authorization': 'Bearer ' + this.authToken,
					'Accept': 'application/json'
				}
			}
		);

		if (res.ok) {
			const json: ListTodosResponse = await res.json();

			return json.data;
		}

		return null;
	}

	async get(todoId: string): Promise<Todo | null> {
		const res = await fetch(
			apiRoutes.todos.get.replace('%s', todoId),
			{
				headers: {
					'Authorization': 'Bearer ' + this.authToken,
					'Accept': 'application/json'
				}
			}
		);

		if (res.ok) {
			const json: GetTodoResponse = await res.json();

			return json.data;
		}

		return null;
	}

	async create(todo: CreateTodoRequest): Promise<boolean> {
		const res = await fetch(
			apiRoutes.todos.create,
			{
				method: 'POST',
				headers: {
					'Authorization': 'Bearer ' + this.authToken,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({
					title: todo.title,
					tags: todo.tags,
					category_id: todo.category_id,
					due_at: todo.due_at
				})
			}
		);

		if (res.ok) {
			return Promise.resolve(true);
		}

		return Promise.resolve(false);
	}

	async delete(todoId: string): Promise<boolean> {
		const res = await fetch(
			apiRoutes.todos.delete.replace('%s', todoId),
			{
				method: 'DELETE',
				headers: {
					'Authorization': 'Bearer ' + this.authToken,
					'Accept': 'application/json'
				},
			}
		);

		if (res.ok) {
			return Promise.resolve(true);
		}

		return Promise.resolve(false);
	}

	async update(todoId: string, request: UpdateTodoRequest): Promise<boolean> {
		const res = await fetch(
			apiRoutes.todos.update.replace('%s', todoId),
			{
				method: 'PUT',
				headers: {
					'Authorization': 'Bearer ' + this.authToken,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(request)
			}
		);

		if (res.ok) {
			return Promise.resolve(true);
		}

		return Promise.resolve(false);
	}

	async listCategories(): Promise<Array<TodoCategory> | null> {
		const res = await fetch(
			apiRoutes.todos.listCategories,
			{
				headers: {
					'Authorization': 'Bearer ' + this.authToken,
					'Accept': 'application/json'
				}
			}
		);

		if (res.ok) {
			const json: ListTodoCategoriesResponse = await res.json();

			return json.data;
		}

		return null;
	}

	async createCategory(request: CreateTodoCategoryRequest): Promise<boolean> {
		const res = await fetch(
			apiRoutes.todos.createCategory,
			{
				method: 'POST',
				headers: {
					'Authorization': 'Bearer ' + this.authToken,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({ title: request.title })
			}
		);

		if (res.ok) {
			return Promise.resolve(true);
		}

		return Promise.resolve(false);
	}

	async deleteCategory(categoryId: number): Promise<boolean> {
		const res = await fetch(
			apiRoutes.todos.deleteCategory.replace('%d', categoryId.toString()),
			{
				method: 'DELETE',
				headers: {
					'Authorization': 'Bearer ' + this.authToken,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
			}
		);

		if (res.ok) {
			return Promise.resolve(true);
		}

		return Promise.resolve(false);
	}
}