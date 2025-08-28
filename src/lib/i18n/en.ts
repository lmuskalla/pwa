import type {
	LanguageFile,
	LayoutRecords,
	NavigationRecords,
	HomeRecords,
	TodoRecords,
	AuthRecords,
	SettingsRecords,
	TrackerRecords, WidgetRecords, NoteRecords
} from '$lib/types/translation';

const layout: LayoutRecords = {
	modal_explanation: 'Press Enter to Confirm, Escape to Cancel.',
	modal_confirm: 'Confirm',
	modal_cancel: 'Cancel'
};

const nav: NavigationRecords = {
	menu: 'Menu',
	toggle_menu: 'Toggle Menu',
	home: 'Home',
	settings: 'Settings',
	todos: 'Todos',
	notes: 'Notes',
	logout: 'Logout',
	profile: 'Profile',
	tracker: 'Tracker',
};

const auth: AuthRecords = {
	name: 'Name',
	name_placeholder: 'Enter name',
	name_error: 'Please enter a name.',
	email: 'Email',
	email_placeholder: 'Enter email',
	email_error: 'Please enter a valid email address.',
	password: 'Password',
	password_placeholder: '******************',
	password_error: 'Please enter a password with at least 8 characters.',
	password_confirmation: 'Repeat Password',
	password_confirmation_placeholder: '******************',
	password_confirmation_error: 'Please repeat your password.',
	register: 'Register',
	login: 'Login',
	logout: 'Log out',
	logout_success: 'You were successfully logged out.',
	sign_in: 'Sign In',
	forgot_password: 'Forgot Password?',
	register_success: 'You were successfully registered.',
	register_error: 'There was an error with the registration.',
	login_success: 'You were successfully logged in.',
	login_error: 'There was an error with the login.'
};

const home: HomeRecords = {
	slogan: 'Welcome to your homepage.'
};

const settings: SettingsRecords = {
	tags: 'Tags',
	new_tag: 'New Tag',
	categories: 'Categories',
	new_category: 'New Category',
	language: 'Language',
	english: 'English',
	german: 'German',
	nextcloud_app_token: 'Nextcloud App Token',
};

const todos: TodoRecords = {
	all_todos: 'All Todos',
	new_todo: 'New Todo',
	enter_todo: 'Enter Todo',
	no_todos: 'No Todos found.',
	no_todos_desc: 'Press Enter to add one.',
	tags: 'Tags',
	add_tag: 'Add Tag',
	categories: 'Categories',
	add_category: 'Add Category',
	priority: 'Priority',
	priority_high: 'High',
	priority_medium: 'Medium',
	priority_low: 'Low',
	due_at: 'Due at',
	due_today: 'Today',
	due_tomorrow: 'Tomorrow',
	due_week: 'This week',
	due_overdue: 'Overdue',
	add_due_at: 'Add due date',
	status: 'Status',
	status_pending: 'Pending',
	status_in_progress: 'In Progress',
	status_waiting: 'Waiting',
	status_almost_done: 'Almost done',
	status_backlog: 'Backlog',
	effort: 'Effort',
	effort_low: 'Low',
	effort_medium: 'Medium',
	effort_high: 'High',
	progress: 'Progress',
	delete: 'Delete Todo',
	create_success: 'Todo was successfully created.',
	delete_success: 'Todo was successfully deleted.',
	switch_view: 'Switch View',
	delete_confirm_label: 'Delete Todo?',
	delete_confirm_message: 'Are you sure you want to delete this Todo?'
};

const tracker: TrackerRecords = {
	overview: 'Overview',
	mood: 'Mood',
	sports: 'Sports',
	food_quality: 'Food Quality',
	food_amount: 'Food Amount',
	sleep: 'Sleep',
	water: 'Water',
	dreams: 'Dreams',
	work: 'Work',
	save_success: 'Data was successfully saved.',
};

const widgets: WidgetRecords = {
	todos_due_today: 'Todos: Today',
	todos_due_overdue: 'Todos: Overdue',
	todos_high_priority: 'Todos: High Priority',
	tracker_daily: 'Daily Tracker'
}

const notes: NoteRecords = {
	notebook: 'Notebook',
	welcome: 'Welcome to your notebook.',
	instruction: 'Start by creating a new note or selecting one.',
	new_note: 'New Note',
	new_folder: 'New Folder',
	delete_note: 'Delete Note',
	delete_folder: 'Delete Folder',
	editor: 'Editor',
	output: 'Output',
	create_note_success: 'Note was successfully created.',
	create_folder_success: 'Folder was successfully created.',
	save_note: 'Save',
	save_success: 'Note was successfully saved.',
}

export const en: LanguageFile = { layout, nav, home, auth, settings, todos, tracker, widgets, notes };