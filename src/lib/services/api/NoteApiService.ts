import { apiRoutes } from '$lib/helpers/ApiRouteHelper';
import type {
	Note,
	NoteCategory,
	CreateNoteRequest,
	ListNotesResponse,
	UpdateNoteRequest,
	ListNoteCategoriesResponse,
	CreateNoteCategoryRequest
} from '$lib/types/note';

export default class NoteApiService {
	authToken: string | null = null;

	constructor(authToken: string) {
		this.authToken = authToken;
	}

	async list(): Promise<Array<Note> | null> {
		const res = await fetch(
			apiRoutes.notes.list,
			{
				headers: {
					'Authorization': 'Bearer ' + this.authToken,
					'Accept': 'application/json'
				}
			}
		);

		if (res.ok) {
			const json: ListNotesResponse = await res.json();
			return json.data;
		}

		return null;
	}

	async create(note: CreateNoteRequest): Promise<Note | null> {
		const res = await fetch(
			apiRoutes.notes.create,
			{
				method: 'POST',
				headers: {
					'Authorization': 'Bearer ' + this.authToken,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(note)
			}
		);

		if (res.ok) {
			const json = await res.json();
			return json.data as Note;
		}

		return null;
	}

	async update(noteId: string, request: UpdateNoteRequest): Promise<boolean> {
		const res = await fetch(
			apiRoutes.notes.update.replace('%s', noteId),
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

	async delete(noteId: string): Promise<boolean> {
		const res = await fetch(
			apiRoutes.tags.delete.replace('%s', noteId),
			{
				method: 'DELETE',
				headers: {
					'Authorization': 'Bearer ' + this.authToken,
					'Accept': 'application/json'
				}
			}
		);

		if (res.ok) {
			return Promise.resolve(true);
		}

		return Promise.resolve(false);
	}

	async listCategories(): Promise<Array<NoteCategory> | null> {
		const res = await fetch(
			apiRoutes.notes.listCategories,
			{
				headers: {
					'Authorization': 'Bearer ' + this.authToken,
					'Accept': 'application/json'
				}
			}
		);

		if (res.ok) {
			const json: ListNoteCategoriesResponse = await res.json();
			return json.data;
		}

		return null;
	}

	async createCategory(category: CreateNoteCategoryRequest): Promise<NoteCategory | null> {
		const res = await fetch(
			apiRoutes.notes.createCategory,
			{
				method: 'POST',
				headers: {
					'Authorization': 'Bearer ' + this.authToken,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(category)
			}
		);

		if (res.ok) {
			const json = await res.json();
			return json.data as NoteCategory;
		}

		return null;
	}
}