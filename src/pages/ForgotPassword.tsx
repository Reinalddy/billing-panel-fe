import { useState } from "react";
import { forgotPassword } from "../api/auth";
import AuthLayout from "../components/AuthLayout";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setMessage("");

        try {
            const res = await forgotPassword(email);
            setMessage(res.data.message);
        } catch {
            setError("Terjadi kesalahan, coba lagi");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout title="Forgot Password">
            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                <p className="text-sm text-gray-600 text-center">
                    Masukkan email Anda. Jika terdaftar,
                    kami akan mengirimkan link reset password.
                </p>

                <input
                    type="email"
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    className="w-full border rounded-lg p-3"
                />

                {message && (
                    <p className="text-green-600 text-sm text-center">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="text-red-600 text-sm text-center">
                        {error}
                    </p>
                )}

                <button
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg disabled:opacity-50"
                >
                    {loading ? "Mengirim..." : "Kirim Link Reset"}
                </button>
            </form>
        </AuthLayout>
    );
}