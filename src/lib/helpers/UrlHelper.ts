
interface Urls {
    home: string;
    settings: string;
    todos: string;
	editTodo: string;
	notes: string;
	note: string;
    login: string;
	logout: string;
    register: string;
	profile: string;
	tracker: string;
	trackerDate: string;
	trackerHistory: string;
}

export const urls: Urls  = {
    home: '/',
    settings: '/settings',
    todos: '/todos',
	editTodo: '/todos/edit/%s',
	notes: '/notes',
	note: '/notes/%s',
    login: '/auth/login',
	logout: '/auth/logout',
    register: '/auth/register',
	profile: '/profile',
	tracker: '/tracker',
	trackerDate: '/tracker/date/%s',
}