import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../api/auth";
import AuthLayout from "../components/AuthLayout";

export default function ResetPassword() {
    const navigate = useNavigate();

    const params = new URLSearchParams(
        window.location.search
    );

    const token = params.get("token");
    const email = params.get("email");

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    if (!token || !email) {
        return (
            <AuthLayout title="Reset Password">
                <p className="text-red-600 text-center">
                    Link reset tidak valid
                </p>
            </AuthLayout>
        );
    }

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await resetPassword({
                email,
                token,
                password,
                password_confirmation: confirm,
            });

            navigate("/login");
        } catch (err: any) {
            setError(
                err.response?.data?.message ??
                "Gagal reset password"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Reset Password">
            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <input
                    type="password"
                    required
                    placeholder="Password baru"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    className="w-full border rounded-lg p-3"
                />

                <input
                    type="password"
                    required
                    placeholder="Konfirmasi password"
                    value={confirm}
                    onChange={(e) =>
                        setConfirm(e.target.value)
                    }
                    className="w-full border rounded-lg p-3"
                />

                {error && (
                    <p className="text-red-600 text-sm text-center">
                        {error}
                    </p>
                )}

                <button
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg disabled:opacity-50"
                >
                    {loading ? "Memproses..." : "Reset Password"}
                </button>
            </form>
        </AuthLayout>
    );
}