import type { Tag } from './tag';

export interface Note {
	id: string;
	title: string;
	content: string;
	category_id: number | null;
	tags: Array<Tag>;
	created_at: string;
	updated_at: string;
}

export interface ListNotesResponse {
	data: Array<Note>
}

export interface CreateNoteRequest {
	title: string;
	category_id?: number | null;
	tags?: Array<number>;
}

export interface UpdateNoteRequest {
	title?: string;
	content?: string;
	category_id?: number | null;
	tags?: Array<number>;
}

export interface NoteCategory {
	id: number;
	title: string;
	parent_id: number | null;
	sort_order: number;
	created_at: string;
	updated_at: string;
	children: Array<NoteCategory>;
}

export interface ListNoteCategoriesResponse {
	data: Array<NoteCategory>
}

export interface CreateNoteCategoryRequest {
	title: string;
	parent_id?: number | null;
}