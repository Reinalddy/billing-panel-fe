import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { login, type LoginPayload } from "../api/auth";
import { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/api";


export default function Login() {
    const [form, setForm] = useState<LoginPayload>({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await login(form);
            if (response.data.code === 200) {
                // SAVE TOKKEN
                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.data.user));
                alert("Register success, silakan login");
                window.location.href = "/user/dashboard";
            } else {
                setError(response.data.message);
            }

            // nanti redirect ke dashboard
        } catch (err) {
            const error = err as AxiosError<ApiErrorResponse>;
            setError(error.response?.data?.message || "Login gagal");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Login">
            {error && (
                <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-indigo-200"
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border rounded-lg focus:ring focus:ring-indigo-200"
                    onChange={handleChange}
                    required
                />

                <button
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
                >
                    {loading ? "Processing..." : "Login"}
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
                Belum punya akun?{" "}
                <a href="/register" className="text-indigo-600 font-medium">
                    Register
                </a>
            </p>
        </AuthLayout>
    );
}
