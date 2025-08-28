export interface AuthToken {
	token: string | null;
	token_type: string | null;
	expires_at: string | null;
}

export interface User {
	id: number;
	name: string;
	email: string;
	role: string;
	created_at: string;
	updated_at: string;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	data: {
		token: string;
		token_type: string;
		token_expires_at: string;
		user: User;
	}
}

export interface RegisterRequest {
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}