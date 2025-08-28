import type { Tag } from '$lib/types/tag';
import { setContext, getContext } from 'svelte';
import { getAuth } from '$lib/state/Auth.svelte';
import TagApiService from '$lib/services/api/TagApiService';

export class Tags {
	loaded = $state<boolean>(false);
	tags = $state<Array<Tag>>([]);
	auth = getAuth();
	apiService: TagApiService;

	constructor() {
		this.apiService = new TagApiService(this.auth.getToken()!);
	}

	async load(): Promise<void> {
		const res = await this.apiService.list();
		if (res) {
			this.loaded = true;
			this.tags = res;
		}
		this.sort();
	}

	async create(name: string): Promise<Tag | null> {
		const tag = await this.apiService.create({ name });
		if (tag !== null) await this.load();
		return tag;
	}

	async delete(tagId: number): Promise<boolean> {
		const ok = await this.apiService.delete(tagId);
		if (ok) await this.load();
		return ok;
	}

	async changeColor(tag: Tag, color: string): Promise<boolean> {
		const ok = await this.apiService.update(tag.id, { color });
		if (ok) await this.load();
		return ok;
	}

	sort(): void {
		this.tags = [...this.tags].sort((a, b) => {
			return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
		});
	}
}

const TAGS_KEY = Symbol('PWA_TAGS');

export function setTags(): Tags {
	return setContext(TAGS_KEY, new Tags());
}

export function getTags(): Tags {
	return getContext<Tags>(TAGS_KEY);
}
