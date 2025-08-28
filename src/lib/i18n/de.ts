import type {
	LanguageFile,
	LayoutRecords,
	NavigationRecords,
	HomeRecords,
	TodoRecords,
	AuthRecords,
	SettingsRecords,
	TrackerRecords,
	WidgetRecords,
	NoteRecords
} from '$lib/types/translation';

const layout: LayoutRecords = {
	modal_explanation: 'Drücke Enter zum Bestätigen oder Escape zum Abbrechen.',
	modal_confirm: 'Bestätigen',
	modal_cancel: 'Abbrechen'
};

const nav: NavigationRecords = {
	menu: 'Menü',
	toggle_menu: 'Aus-/einklappen',
	home: 'Startseite',
	settings: 'Einstellungen',
	todos: 'Todos',
	notes: 'Notizen',
	logout: 'Abmelden',
	profile: 'Profil',
	tracker: 'Tracker'
};

const auth: AuthRecords = {
	name: 'Name',
	name_placeholder: 'Name eingeben',
	name_error: 'Bitte gib einen Namen ein.',
	email: 'E-Mail',
	email_placeholder: 'E-Mail eingeben',
	email_error: 'Bitte gib eine gültige E-Mail ein.',
	password: 'Passwort',
	password_placeholder: '******************',
	password_error: 'Bitte gib ein Passwort mit mindestens 8 Zeichen ein.',
	password_confirmation: 'Passwort wiederholen',
	password_confirmation_placeholder: '******************',
	password_confirmation_error: 'Bitte bestätige dein Passwort.',
	register: 'Registrieren',
	login: 'Anmelden',
	logout: 'Abmelden',
	logout_success: 'Du wurdest erfolgreich abgemeldet.',
	sign_in: 'Anmelden',
	forgot_password: 'Passwort vergessen?',
	register_success: 'Du wurdest erfolgreich registriert.',
	register_error: 'Es ist ein Fehler bei der Registrierung aufgetreten.',
	login_success: 'Du wurdest erfolgreich angemeldet.',
	login_error: 'Es ist ein Fehler bei der Anmeldung aufgetreten.'
};

const home: HomeRecords = {
	slogan: 'Willkommen auf deiner Startseite.'
};

const settings: SettingsRecords = {
	tags: 'Tags',
	new_tag: 'Neuer Tag',
	categories: 'Kategorien',
	new_category: 'Neue Kategorie',
	language: 'Sprache',
	english: 'Englisch',
	german: 'Deutsch',
	nextcloud_app_token: 'Nextcloud App Token',
};

const todos: TodoRecords = {
	all_todos: 'Alle Todos',
	new_todo: 'Neues Todo',
	enter_todo: 'Todo eingeben',
	no_todos: 'Keine Todos gefunden.',
	no_todos_desc: 'Drücke Enter um eins anzulegen.',
	tags: 'Tags',
	add_tag: 'Tag hinzufügen',
	categories: 'Kategorien',
	add_category: 'Kategorie hinzufügen',
	priority: 'Priorität',
	priority_high: 'Hoch',
	priority_medium: 'Mittel',
	priority_low: 'Niedrig',
	due_at: 'Fälligkeit',
	due_today: 'Heute',
	due_tomorrow: 'Morgen',
	due_week: 'Diese Woche',
	due_overdue: 'Überfällig',
	add_due_at: 'Datum hinzufügen',
	status: 'Status',
	status_pending: 'Ausstehend',
	status_in_progress: 'In Arbeit',
	status_waiting: 'Warten',
	status_almost_done: 'Fast fertig',
	status_backlog: 'Backlog',
	effort: 'Aufwand',
	effort_low: 'Gering',
	effort_medium: 'Mittel',
	effort_high: 'Hoch',
	progress: 'Fortschritt',
	delete: 'Todo löschen',
	create_success: 'Todo wurde erfolgreich erstellt.',
	delete_success: 'Todo wurde erfolgreich gelöscht.',
	switch_view: 'Ansicht wechseln',
	delete_confirm_label: 'Todo löschen?',
	delete_confirm_message: 'Bist du sicher, dass du dieses Todo löschen möchtest?'
};

const tracker: TrackerRecords = {
	overview: 'Übersicht',
	mood: 'Gemüt',
	sports: 'Sport',
	food_quality: 'Ernährung',
	food_amount: 'Essensmenge',
	sleep: 'Schlaf',
	water: 'Wasser',
	dreams: 'Träume',
	work: 'Arbeit',
	save_success: 'Daten wurden erfolgreich gespeichert.'
};

const widgets: WidgetRecords = {
	todos_due_today: 'Heutige Todos',
	todos_due_overdue: 'Überfällige Todos',
	todos_high_priority: 'Wichtige Todos',
	tracker_daily: 'Tracker'
}

const notes: NoteRecords = {
	notebook: 'Notizbuch',
	welcome: 'Willkommen in deinem Notizbuch.',
	instruction: 'Lege eine neue Notiz an oder wähle eine aus.',
	new_note: 'Neue Notiz',
	new_folder: 'Neuer Ordner',
	delete_note: 'Notiz löschen',
	delete_folder: 'Ordner löschen',
	editor: 'Editor',
	output: 'Output',
	create_note_success: 'Die Notiz wurde erfolgreich erstellt.',
	create_folder_success: 'Der Ordner wurde erfolgreich erstellt.',
	save_note: 'Speichern',
	save_success: 'Notiz wurde erfolgreich gespeichert.'
}

export const de: LanguageFile = { layout, nav, home, auth, settings, todos, tracker, widgets, notes };