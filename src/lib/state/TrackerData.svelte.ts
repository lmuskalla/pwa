import type { CreateTrackerRequest, Tracker } from '$lib/types/tracker';
import { setContext, getContext } from 'svelte';
import { getAuth } from '$lib/state/Auth.svelte';
import TrackerApiService from '$lib/services/api/TrackerApiService';
import { getUrlFormat } from '$lib/helpers/DateHelper';
import { page } from '$app/state';

export class TrackerData {
	loaded = $state<boolean>(false);
	data = $state<Array<Tracker>>([]);
	auth = getAuth();
	apiService: TrackerApiService;
	selectedDate = $derived(page.params.date);

	constructor() {
		this.apiService = new TrackerApiService(this.auth.getToken()!);
	}

	async load(): Promise<void> {
		const res = await this.apiService.list(this.auth.getToken()!);

		if (res) {
			this.loaded = true;
			this.data = res;
		}
	}

	async save(request: CreateTrackerRequest): Promise<void> {
		console.log(request);
		const ok = await this.apiService.create(request, this.auth.getToken()!);

		if (ok) await this.load();
	}

	getDayData(day?: string): Tracker | null {
		if (!day) return this.data.find((t) => t.date === getUrlFormat(new Date(this.selectedDate))) ?? null;

		return this.data.find((t) => t.date === day) ?? null;
	}
}

const TRACKER_KEY = Symbol('PWA_TRACKER');

export function setTrackerData(): TrackerData {
	return setContext(TRACKER_KEY, new TrackerData());
}

export function getTrackerData(): TrackerData {
	return getContext<TrackerData>(TRACKER_KEY);
}
