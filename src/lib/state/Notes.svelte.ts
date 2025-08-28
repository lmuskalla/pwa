import type { Note, NoteCategory } from '$lib/types/note';
import type { Tag } from '$lib/types/tag';
import { setContext, getContext } from 'svelte';
import { getAuth } from '$lib/state/Auth.svelte';
import NoteApiService from '$lib/services/api/NoteApiService'
import { page } from '$app/state';
import type { Todo } from '$lib/types/todo';

export class NotesSvelte {
	loaded = $state<boolean>(false);
	notes = $state<Array<Note>>([]);
	categories = $state<Array<NoteCategory>>([]);
	activeCategory = $state<NoteCategory | null>(null);
	collapsedCategories = $state<Array<number>>([]);
	activeNote = $state<Note | null>(null);
	auth = getAuth();
	view = $state<'both' | 'html' | 'editor'>('both');
	apiService: NoteApiService;

	constructor() {
		this.apiService = new NoteApiService(this.auth.getToken()!);
	}

	async load(): Promise<void> {
		const res = await this.apiService.list();
		if (res) {
			this.loaded = true;
			this.notes = res;
			this.checkUrlForActiveNote();
		}
	}

	checkUrlForActiveNote(): void {
		if (page.params.id) {
			this.selectNote(page.params.id);
		}
	}

	async loadCategories(): Promise<void> {
		const res = await this.apiService.listCategories();
		if (res) {
			this.categories = res;
		}
	}

	toggleCollapseCategory(categoryId: number): void {
		if (this.collapsedCategories.includes(categoryId)) {
			this.collapsedCategories = this.collapsedCategories.filter(c => c !== categoryId);
		} else {
			this.collapsedCategories.push(categoryId);
		}
	}

	isCategoryCollapsed(categoryId: number): boolean {
		return this.collapsedCategories.includes(categoryId);
	}

	getNotesForCategory(categoryId: number | null): Array<Note> {
		return this.notes.filter(n => n.category_id === categoryId);
	}

	selectNote(noteId: string): void {
		this.activeNote = this.notes.filter(n => n.id === noteId)[0];
	}

	switchView(): void {
		switch (this.view) {
			case 'both': this.view = 'html'; break;
			case 'html': this.view = 'editor'; break;
			case 'editor': this.view = 'both'; break;
		}
	}

	async create(title: string): Promise<Note | null> {
		const note = await this.apiService.create({ title });
		if (note) await this.load();
		return note;
	}

	async createCategory(title: string): Promise<NoteCategory | null> {
		const category = await this.apiService.createCategory({ title });
		if (category) await this.loadCategories();
		return category;
	}

	async saveContent(): Promise<boolean> {
		const ok = await this.apiService.update(this.activeNote!.id, { content: this.activeNote!.content });
		if (ok) await this.load();
		return ok;
	}

	async addTag(tagId: number): Promise<boolean> {
		const tagIds = this.activeNote!.tags.map(t => t.id);
		const ok = await this.apiService.update(this.activeNote!.id, {
			tags: tagIds.concat([tagId])
		})
		if (ok) await this.load();
		return ok;
	}

	async removeTag(tagId: number): Promise<boolean> {
		const tagIds = this.activeNote!.tags.map(t => t.id);
		const ok = await this.apiService.update(this.activeNote!.id, {
			tags: tagIds.filter(id => id != tagId)
		});
		if (ok) await this.load();
		return ok;
	}

	async delete(noteId: string): Promise<boolean> {
		const ok = await this.apiService.delete(noteId);
		if (ok) await this.load();
		return ok;
	}
}

const NOTES_KEY = Symbol('PWA_NOTES');

export function setNotes(): NotesSvelte {
	return setContext(NOTES_KEY, new NotesSvelte());
}

export function getNotes(): NotesSvelte {
	return getContext<NotesSvelte>(NOTES_KEY);
}
