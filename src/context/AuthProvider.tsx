import { useEffect, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { AuthContext,type User } from "./AuthContext";
import { getMe } from "../api/auth";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    //useCallback FIX dependency warning
    const fetchUser = useCallback(async () => {
        try {
            const res = await getMe();
            console.log(res);
            setUser(res.data.data);
        } catch {
            logout();
        } finally {
            setLoading(false);
        }
    }, []);

    const loginSuccess = (token: string) => {
        localStorage.setItem("token", token);
        fetchUser();
    };

    useEffect(() => {
        if (localStorage.getItem("token")) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, [fetchUser]);

    return (
        <AuthContext.Provider
            value={{ user, loading, loginSuccess, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}