import { createContext } from "react";

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    loginSuccess: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
