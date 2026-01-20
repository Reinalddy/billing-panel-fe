import type { ReactNode } from "react";

interface AuthLayoutProps {
    title: string;
    children: ReactNode;
}

export default function AuthLayout({
    title,
    children,
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-600 to-purple-700">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
                    {title}
                </h1>
                <p className="text-center text-gray-500 mb-6">
                    Billing System Platform
                </p>
                {children}
            </div>
        </div>
    );
}
