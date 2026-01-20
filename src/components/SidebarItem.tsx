import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

interface SidebarItemProps {
    to: string;
    icon: ReactNode;
    label: string;
}

export default function SidebarItem({
    to,
    icon,
    label,
}: SidebarItemProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition
         ${isActive
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`
            }
        >
            <span className="text-xl">{icon}</span>
            <span className="font-medium">{label}</span>
        </NavLink>
    );
}
