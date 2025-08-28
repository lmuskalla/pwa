export type Language = 'en' | 'de';

export interface LayoutRecords {
	modal_explanation: string;
	modal_confirm: string;
	modal_cancel: string;
}

export interface NavigationRecords {
	menu: string;
	toggle_menu: string;
	home: string;
	settings: string;
	todos: string;
	notes: string;
	logout: string;
	profile: string;
	tracker: string;
}

export interface HomeRecords {
	slogan: string;
}

export interface SettingsRecords {
	tags: string;
	new_tag: string;
	categories: string;
	new_category: string;
	language: string;
	english: string;
	german: string;
	nextcloud_app_token: string;
}

export interface AuthRecords {
	name: string;
	name_placeholder: string;
	name_error: string;
	email: string;
	email_placeholder: string;
	email_error: string;
	password: string;
	password_placeholder: string;
	password_error: string;
	password_confirmation: string;
	password_confirmation_placeholder: string;
	password_confirmation_error: string;
	register: string;
	login: string;
	logout: string;
	logout_success: string;
	sign_in: string;
	forgot_password: string;
	register_success: string;
	register_error: string;
	login_success: string;
	login_error: string;
}

export interface TodoRecords {
	all_todos: string;
	new_todo: string;
	enter_todo: string;
	no_todos: string;
	no_todos_desc: string;
	tags: string;
	add_tag: string;
	categories: string;
	add_category: string;
	priority: string;
	priority_high: string;
	priority_medium: string;
	priority_low: string;
	due_at: string;
	due_today: string;
	due_tomorrow: string;
	due_week: string;
	due_overdue: string;
	add_due_at: string;
	status: string;
	status_pending: string;
	status_in_progress: string;
	status_waiting: string;
	status_almost_done: string;
	status_backlog: string;
	effort: string;
	effort_low: string;
	effort_medium: string;
	effort_high: string;
	progress: string;
	delete: string;
	create_success: string;
	delete_success: string;
	switch_view: string;
	delete_confirm_label: string;
	delete_confirm_message: string;
}

export interface TrackerRecords {
	overview: string;
	mood: string;
	sports: string;
	food_quality: string;
	food_amount: string;
	water: string;
	sleep: string;
	dreams: string;
	work: string;
	save_success: string;
}

export interface WidgetRecords {
	todos_due_today: string;
	todos_due_overdue: string;
	todos_high_priority: string;
	tracker_daily: string;
}

export interface NoteRecords {
	notebook: string;
	welcome: string;
	instruction: string;
	new_note: string;
	new_folder: string;
	delete_note: string;
	delete_folder: string;
	editor: string;
	output: string;
	create_note_success: string;
	create_folder_success: string;
	save_note: string;
	save_success: string;
}

export interface LanguageFile {
	layout: LayoutRecords;
	nav: NavigationRecords;
	auth: AuthRecords;
	home: HomeRecords;
	settings: SettingsRecords;
	todos: TodoRecords;
	tracker: TrackerRecords;
	widgets: WidgetRecords;
	notes: NoteRecords;
}