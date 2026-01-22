import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Invoices from "../pages/Invoices";
import InvoiceDetailPage from "../pages/InvoiceDetail";

import { useAuth } from "../hooks/useAuth";
import Services from "../pages/Services";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;

    return children;
}

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                <Route
                    path="/user/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user/products"
                    element={
                        <ProtectedRoute>
                            <Products />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user/invoices"
                    element={
                        <ProtectedRoute>
                            <Invoices />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/user/invoices/:id"
                    element={
                        <ProtectedRoute>
                            <InvoiceDetailPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/user/services"
                    element={
                        <ProtectedRoute>
                            <Services />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}
