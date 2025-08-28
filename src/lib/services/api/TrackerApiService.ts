import type {
	CreateTrackerRequest,
	ListTrackersResponse,
	Tracker
} from '$lib/types/tracker';
import { apiRoutes } from '$lib/helpers/ApiRouteHelper';
import { getUrlFormat } from '$lib/helpers/DateHelper';

export default class TrackerApiService {
	authToken: string | null = null;

	constructor(authToken: string) {
		this.authToken = authToken;
	}

	async list(authToken: string): Promise<Array<Tracker> | null> {
		const res = await fetch(
			apiRoutes.tracker.list,
			{
				headers: {
					'Authorization': 'Bearer ' + authToken,
					'Accept': 'application/json'
				}
			}
		);

		if (res.ok) {
			const json: ListTrackersResponse = await res.json();
			return json.data;
		}

		return null;
	}

	async create(tracker: CreateTrackerRequest, authToken: string): Promise<boolean> {
		const res = await fetch(
			apiRoutes.tracker.create,
			{
				method: 'POST',
				headers: {
					'Authorization': 'Bearer ' + authToken,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(tracker)
			}
		);

		if (res.ok) {
			return Promise.resolve(true);
		}

		return Promise.resolve(false);
	}

	async update(tracker: UpdateTrackerRequest, date: Date, authToken: string): Promise<boolean> {
		const res = await fetch(
			apiRoutes.tracker.update.replace('%s', getUrlFormat(date)),
			{
				method: 'PUT',
				headers: {
					'Authorization': 'Bearer ' + authToken,
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify(tracker)
			}
		);

		if (res.ok) {
			return Promise.resolve(true);
		}

		return Promise.resolve(false);
	}
}