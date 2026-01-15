export interface User {
  id?: string;
  name?: string;
  email?: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isInitialized: boolean;
}

export interface AuthResponse {
  token: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
