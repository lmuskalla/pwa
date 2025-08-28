import { apiRoutes } from '$lib/helpers/ApiRouteHelper';
import type { Tag, ListTagsResponse, CreateTagRequest, CreateTagResponse, UpdateTagRequest } from '$lib/types/tag';

export default class TagApiService {
	authToken: string | null = null;

	constructor(authToken: string) {
		this.authToken = authToken;
	}

	async list(): Promise<Array<Tag> | null> {
		const res = await fetch(
			apiRoutes.tags.list,
			{
				headers: {
					'Authorization': 'Bearer ' + this.authToken,
					'Accept': 'application/json'
				}
			}
		);

		if (res.ok) {
			const json: ListTagsResponse = await res.json();
			return json.data;
		}

		return null;
	}

	async create(tag: CreateTagRequest): Promise<Tag | null> {
		const res = await fetch(
			apiRoutes.tags.create,
			{
				method: 'POST',
				headers: {
					'Authorization': 'Bearer ' + this.authToken,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({ name: tag.name })
			}
		);

		if (res.ok) {
			const newTag: CreateTagResponse = await res.json();
			return newTag.data as Tag;
		}

		return Promise.resolve(null);
	}

	async update(tagId: number, request: UpdateTagRequest): Promise<boolean> {
		const res = await fetch(
			apiRoutes.tags.update.replace('%d', tagId.toString()),
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

	async delete(tagId: number): Promise<boolean> {
		const res = await fetch(
			apiRoutes.tags.delete.replace('%d', tagId.toString()),
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
}