import type {
	NextcloudAppToken,
	CreateNextcloudAppTokenRequest,
	UpdateNextcloudAppTokenRequest,
	GetNextcloudAppTokenResponse
} from '$lib/types/nextcloudAppToken';
import { apiRoutes } from '$lib/helpers/ApiRouteHelper';
import type { Update } from 'vite';

export default class NextcloudAppTokenApiService {
	authToken: string | null = null;

	constructor(authToken: string) {
		this.authToken = authToken;
	}

	async list(): Promise<NextcloudAppToken | null> {
		const res = await fetch(
			apiRoutes.nextcloudAppTokens.list,
			{
				headers: {
					'Authorization': 'Bearer ' + this.authToken,
					'Accept': 'application/json'
				}
			}
		);

		if (res.ok) {
			const json: GetNextcloudAppTokenResponse = await res.json();
			return json.data;
		}

		return null;
	}

	async create(request: CreateNextcloudAppTokenRequest): Promise<boolean> {
		const res = await fetch(
			apiRoutes.nextcloudAppTokens.create,
			{
				method: 'POST',
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

	async update(tokenId: number, request: UpdateNextcloudAppTokenRequest): Promise<boolean> {
		const res = await fetch(
			apiRoutes.nextcloudAppTokens.update.replace('%d', tokenId.toString()),
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

	async delete(tokenId: number): Promise<boolean> {
		const res = await fetch(
			apiRoutes.nextcloudAppTokens.delete.replace('%d', tokenId.toString()),
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