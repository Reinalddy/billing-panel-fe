import api from "./axios";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export const login = (data: LoginPayload) =>
    api.post("/login", data);

export const register = (data: RegisterPayload) =>
    api.post("/register", data);

export const getMe = () =>
    api.get("/user/me");

export const forgotPassword = (email: string) =>
    api.post("/auth/forgot-password", { email });

export const resetPassword = (payload: {
    email: string;
    token: string;
    password: string;
    password_confirmation: string;
}) =>
    api.post("/auth/reset-password", payload);