import type { KeyDownHandler, KeyDownHandlerRequest, HelperKey } from '$lib/types/keydown';
import { setContext, getContext } from 'svelte';
import { v4 as uuid } from 'uuid';

export class KeyManager {
	handlers = $state<{
		enter: Array<KeyDownHandler>;
		escape: Array<KeyDownHandler>;
		e: Array<KeyDownHandler>;
	}>({
		enter: [],
		escape: [],
		e: []
	});
	helperKeys = $state<{
		Control: boolean,
		Shift: boolean,
		Alt: boolean
	}>({
		Control: false,
		Shift: false,
		Alt: false
	});
	handledKeys: Array<string> = ['Enter', 'Escape', 'e', 'Shift', 'Alt', 'Control'];

	constructor() {}

	registerKeyDown(request: KeyDownHandlerRequest): string {
		const handler: KeyDownHandler = {
			id: uuid(),
			...request
		};

		switch (request.key) {
			case 'Enter':
				this.handlers.enter.push(handler);
				this.handlers.enter.sort((a, b) => a.priority - b.priority);
				break;
			case 'Escape':
				this.handlers.escape.push(handler);
				this.handlers.escape.sort((a, b) => a.priority - b.priority);
				break;
			case 'e':
				this.handlers.e.push(handler);
				this.handlers.e.sort((a, b) => a.priority - b.priority);
		}

		return handler.id;
	}

	unregisterKeyDown(id: string | null): void {
		if (id === null) return;

		this.handlers.enter = this.handlers.enter.filter((h) => h.id !== id);
		this.handlers.escape = this.handlers.escape.filter((h) => h.id !== id);
		this.handlers.e = this.handlers.e.filter((h) => h.id !== id);
	}

	handleKeyDown(event: KeyboardEvent): void {
		if (!this.handledKeys.includes(event.key)) return;

		switch (event.key) {
			case 'Enter':
				this.handleEnter(event);
				break;
			case 'Escape':
				this.handleEscape(event);
				break;
			case 'e':
				this.handleE(event);
				break;
			case 'Shift':
				this.helperKeys.Shift = true;
				break;
			case 'Alt':
				this.helperKeys.Alt = true;
				break;
			case 'Control':
				this.helperKeys.Control = true;
				break;
		}
	}

	handleKeyUp(event: KeyboardEvent): void {
		if (!this.handledKeys.includes(event.key)) return;

		switch (event.key) {
			case 'Shift':
				this.helperKeys.Shift = false;
				break;
			case 'Alt':
				this.helperKeys.Alt = false;
				break;
			case 'Control':
				this.helperKeys.Control = false;
				break;
		}
	}

	handleEnter(event: KeyboardEvent): void {
		for (const handler of this.handlers.enter) {
			if (handler.withHelperKey !== null && handler.withHelperKey !== undefined) {
				if (this.helperKeys[handler.withHelperKey as HelperKey] !== true) {
					continue;
				}
			}

			if (handler.preventDefault) {
				event.preventDefault();
			}

			handler.handler(event);

			if (handler.preventOthers) {
				break;
			}
		}
	}

	handleEscape(event: KeyboardEvent): void {
		for (const handler of this.handlers.escape) {
			if (handler.preventDefault) {
				event.preventDefault();
			}

			handler.handler(event);

			if (handler.preventOthers) {
				break;
			}
		}
	}

	handleE(event: KeyboardEvent): void {
		for (const handler of this.handlers.e) {
			if (handler.withHelperKey !== null && handler.withHelperKey !== undefined) {
				if (this.helperKeys[handler.withHelperKey as HelperKey] !== true) {
					continue;
				}
			}

			if (handler.preventDefault) {
				event.preventDefault();
			}

			handler.handler(event);

			if (handler.preventOthers) {
				break;
			}
		}
	}
}

const KEY_MANAGER_KEY = Symbol('KEY_MANAGER_KEY');

export function setKeyManager(): KeyManager {
	return setContext(KEY_MANAGER_KEY, new KeyManager());
}

export function getKeyManager(): KeyManager {
	return getContext<ReturnType<typeof setKeyManager>>(KEY_MANAGER_KEY);
}
