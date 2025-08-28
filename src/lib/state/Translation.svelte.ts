import { setContext, getContext } from 'svelte';
import type { LanguageFile, Language } from '$lib/types/translation';
import { en } from '$lib/i18n/en';
import { de } from '$lib/i18n/de';

export class Translation {
	locale = $state<string>('en');
	get = $state<LanguageFile>(en);

	changeLanguage(locale: Language): void {
		switch (locale) {
			case 'en':
			default:
				this.locale = 'en';
				this.get = en;
				break;
			case 'de':
				this.locale = 'de';
				this.get = de;
				break;
		}
	}
}

const TRANSLATION_KEY = Symbol('PWA_TRANSLATION');

export function setTranslation(): Translation {
	return setContext(TRANSLATION_KEY, new Translation());
}

export function getTranslation(): Translation {
	return getContext<Translation>(TRANSLATION_KEY);
}
