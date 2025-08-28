export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface NotificationRequest {
	type: NotificationType;
	message: string;
	timeout?: number;
}

export interface Notification extends NotificationRequest {
	id: string;
}