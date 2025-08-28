import type { Notification, NotificationRequest } from '$lib/types/notification';
import { setContext, getContext } from 'svelte';
import { v4 as uuid } from 'uuid';

export class Notifications {
	queue = $state<Array<Notification>>([]);
	defaultTimeout: number = 5000;

	add(request: NotificationRequest): void {
		const notification: Notification = {
			id: uuid(),
			...request,
		}

		this.queue.push(notification);

		setTimeout(() => {
			this.queue = this.queue.filter((n) => n.id !== notification.id);
		}, notification.timeout ? notification.timeout : this.defaultTimeout);
	}

	clear(): void {
		this.queue = [];
	}
}

const NOTIFICATIONS_KEY = Symbol('PWA_NOTIFICATIONS');

export function setNotifications(): Notifications {
	return setContext(NOTIFICATIONS_KEY, new Notifications());
}

export function getNotifications(): Notifications {
	return getContext<Notifications>(NOTIFICATIONS_KEY);
}
