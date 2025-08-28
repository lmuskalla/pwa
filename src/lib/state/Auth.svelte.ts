import type { AuthToken, User, LoginRequest, LoginResponse, RegisterRequest } from '$lib/types/auth';
import { setContext, getContext } from 'svelte';
import { page } from '$app/state';
import { browser } from '$app/environment';
import { urls } from '$lib/helpers/UrlHelper';
import AuthApiService from '$lib/services/api/AuthApiService';


export class Auth {
    loggedIn = $state<boolean>(false);
    authToken = $state<AuthToken | null>(null);
    user = $state<User | null>(null);
	apiService: AuthApiService;

    constructor() {
		this.apiService = new AuthApiService();
		this.load();
	}

	private async load(): Promise<void> {
		if (!browser) return;

		const savedAuth = localStorage.getItem('auth');

		if (savedAuth) {
			const { user, authToken } = JSON.parse(savedAuth);
			const expiresAt = new Date(authToken.expires_at).getTime();

			if (expiresAt > Date.now()) {
				this.user = user;
				this.authToken = authToken;
				this.loggedIn = true;

				if (expiresAt < Date.now() + 24 * 60 * 60 * 1000) {
					await this.refresh();
				}
			} else {
				localStorage.removeItem('auth');
			}
		}
	}

	private save(): void {
		if (!browser) return;

		localStorage.setItem('auth', JSON.stringify({
			user: this.user,
			authToken: this.authToken
		}));
	}

	private clear(): void {
		if (!browser) return;

		localStorage.removeItem('auth');
		this.user = null;
		this.authToken = null;
		this.loggedIn = false;
	}

    async login(request: LoginRequest): Promise<boolean> {
        const login: LoginResponse | null = await this.apiService.login(request);

		if (login === null) {
			return Promise.resolve(false);
		}

		this.user = login.data.user;
		this.authToken = {
			token: login.data.token,
			token_type: login.data.token_type,
			expires_at: login.data.token_expires_at
		};
		this.loggedIn = true;

		this.save();

        return Promise.resolve(true);
    }

	async refresh(): Promise<boolean> {
		const refresh: LoginResponse | null = await this.apiService.refresh(this.getToken()!);

		if (refresh === null) {
			return Promise.resolve(false);
		}

		this.user = refresh.data.user;
		this.authToken = {
			token: refresh.data.token,
			token_type: refresh.data.token_type,
			expires_at: refresh.data.token_expires_at
		};
		this.loggedIn = true;

		this.save();

		return Promise.resolve(true);
	}

	logout(): void {
		this.clear();
	}

	async register(request: RegisterRequest): Promise<boolean> {
		return await this.apiService.register(request);
	}

	isAuthRoute(): boolean {
		return (page.url.pathname == urls.login || page.url.pathname == urls.register);
	}

	getToken(): string | null {
		return this.authToken?.token ?? null;
	}
}

const AUTH_KEY = Symbol('PWA_AUTH');

export function setAuth(): Auth {
    return setContext(AUTH_KEY, new Auth());
}

export function getAuth(): Auth {
    return getContext<Auth>(AUTH_KEY);
}
