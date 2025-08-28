import type { LoginRequest, LoginResponse, RegisterRequest } from '$lib/types/auth';
import { apiRoutes } from '$lib/helpers/ApiRouteHelper';

export default class AuthApiService {
	async login(request: LoginRequest): Promise<LoginResponse | null> {
		const res = await fetch(apiRoutes.auth.login, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			body: JSON.stringify({
				email: request.email,
				password: request.password
			})
		});

		if (!res.ok) {
			return Promise.resolve(null);
		}

		return await res.json();
	}

	async refresh(authToken: string): Promise<LoginResponse | null> {
		const res = await fetch(apiRoutes.auth.refresh, {
			method: 'POST',
			headers: {
				'Authorization': 'Bearer ' + authToken,
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			}
		});

		if (!res.ok) {
			return Promise.resolve(null);
		}

		return await res.json();
	}

	async register(request: RegisterRequest): Promise<boolean> {
		const res = await fetch(
			apiRoutes.auth.register,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				body: JSON.stringify({
					name: request.name,
					email: request.email,
					password: request.password,
					password_confirmation: request.passwordConfirmation
				})
			}
		);

		return Promise.resolve(res.ok);
	}
}