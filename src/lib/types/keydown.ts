export type KeyDownPriority = 1 | 2 | 3;

export type HelperKey = 'Control' | 'Alt' | 'Shift';

export interface KeyDownHandlerRequest {
	key: 'Enter' | 'Escape' | 'e';
	handler: (event: KeyboardEvent) => void | Promise<void>;
	priority: KeyDownPriority;
	preventDefault: boolean;
	preventOthers: boolean;
	withHelperKey?: HelperKey;
}

export interface KeyDownHandler extends KeyDownHandlerRequest {
	id: string
}