import { dev } from '$app/environment';

const API_URL: string = dev ? 'http://127.0.0.1:8000/api/v1' : 'https://api.solyto.de/api/v1';

interface AuthRoutes {
	login: string;
	refresh: string;
	register: string;
}

interface TodoRoutes {
	list: string;
	get: string;
	create: string;
	update: string;
	delete: string;
	listCategories: string;
	createCategory: string;
	deleteCategory: string;
}

interface TagRoutes {
	list: string;
	create: string;
	update: string;
	delete: string;
}

interface TrackerRoutes {
	list: string;
	create: string;
	update: string;
}

interface NoteRoutes {
	list: string;
	get: string;
	create: string;
	update: string;
	delete: string;
	listCategories: string;
	createCategory: string;
}

interface NextcloudAppTokenRoutes {
	list: string;
	create: string;
	update: string;
	delete: string;
}

interface ApiRoutes {
	auth: AuthRoutes;
	todos: TodoRoutes;
	tags: TagRoutes;
	tracker: TrackerRoutes;
	notes: NoteRoutes;
	nextcloudAppTokens: NextcloudAppTokenRoutes;
}

export const apiRoutes: ApiRoutes = {
	auth: {
		login: API_URL + '/auth/login',
		refresh: API_URL + '/auth/refresh',
		register: API_URL + '/auth/register',
	},
	todos: {
		list: API_URL + '/todos',
		get: API_URL + '/todos/%s',
		create: API_URL + '/todos',
		update: API_URL + '/todos/%s',
		delete: API_URL + '/todos/%s',
		listCategories: API_URL + '/todos/categories',
		createCategory: API_URL + '/todos/categories',
		deleteCategory: API_URL + '/todos/categories/%d',
	},
	tags: {
		list: API_URL + '/tags',
		create: API_URL + '/tags',
		update: API_URL + '/tags/%d',
		delete: API_URL + '/tags/%d'
	},
	tracker: {
		list: API_URL + '/tracker',
		create: API_URL + '/tracker',
		update: API_URL + '/tracker/%s',
	},
	notes: {
		list: API_URL + '/notes',
		get: API_URL + '/notes/%s',
		create: API_URL + '/notes',
		update: API_URL + '/notes/%s',
		delete: API_URL + '/notes/%s',
		listCategories: API_URL + '/notes/categories',
		createCategory: API_URL + '/notes/categories'
	},
	nextcloudAppTokens: {
		list: API_URL + '/nextcloud-app-tokens',
		create: API_URL + '/nextcloud-app-tokens',
		update: API_URL + '/nextcloud-app-tokens/%d',
		delete: API_URL + '/nextcloud-app-tokens/%d',
	}
}
