export interface TrackerNavigationItem {
	url: string;
	label: string;
}

export type TrackerType = 'mood' | 'sports' | 'water' | 'sleep' | 'dreams' | 'work' | 'food_quality' | 'food_amount';

export interface Tracker {
	id: number;
	date: string;
	mood: number | null;
	sports: number | null;
	water: number | null;
	sleep: number | null;
	dreams: number | null;
	work: number | null;
	food_quality: number | null;
	food_amount: number | null;
	created_at: string;
	updated_at: string;
}

export interface ListTrackersResponse {
	data: Array<Tracker>
}

export interface CreateTrackerRequest {
	date: string;
	mood?: number | null;
	sports?: number | null;
	water?: number | null;
	sleep?: number | null;
	dreams?: number | null;
	work?: number | null;
	food_quality?: number | null;
	food_amount?: number | null;
}