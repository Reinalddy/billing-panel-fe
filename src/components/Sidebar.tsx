import SidebarItem from "./SidebarItem";
import { useAuth } from "../hooks/useAuth";

export default function Sidebar() {
    const { logout } = useAuth();

    return (
        <aside className="w-64 bg-white border-r min-h-screen flex flex-col">
            {/* Logo */}
            <div className="h-16 flex items-center justify-center border-b">
                <h1 className="text-xl font-bold text-indigo-600">
                    BillingSys
                </h1>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4 space-y-2">
                <SidebarItem to="/dashboard" icon="🏠" label="Dashboard" />
                <SidebarItem to="/products" icon="📦" label="Products" />
                <SidebarItem to="/services" icon="🧾" label="My Services" />
                <SidebarItem to="/invoices" icon="💳" label="Invoices" />
            </nav>

            {/* Logout */}
            <div className="p-4 border-t">
                <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium"
                >
                    🚪 Logout
                </button>
            </div>
        </aside>
    );
}
