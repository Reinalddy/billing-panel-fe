import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { register, type RegisterPayload } from "../api/auth";
import { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/api";

export default function Register() {
    const [form, setForm] = useState<RegisterPayload>({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
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
            const response = await register(form);
            console.log(response);
            if(response.data.code === 201) {
                alert("Register success, silakan login");
                window.location.href = "/login";
            } else {
                setError(response.data.message);
            }

        } catch (err) {
            const error = err as AxiosError<ApiErrorResponse>;
            setError(error.response?.data?.message || "Register gagal");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Register">
            {error && (
                <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border rounded-lg"
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border rounded-lg"
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border rounded-lg"
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    className="w-full px-4 py-3 border rounded-lg"
                    onChange={handleChange}
                    required
                />

                <button
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
                >
                    {loading ? "Processing..." : "Register"}
                </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
                Sudah punya akun?{" "}
                <a href="/login" className="text-indigo-600 font-medium">
                    Login
                </a>
            </p>
        </AuthLayout>
    );
}
