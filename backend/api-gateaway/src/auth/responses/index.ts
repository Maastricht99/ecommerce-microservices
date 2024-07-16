export interface LoginResponse {
    token: string;
}

export interface RegisterResponse {
    token: string;
}

export interface AuthenticateResponse {
    user_id: string;
    role: "buyer" | "seller" | "admin";
}