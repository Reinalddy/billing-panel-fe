import type { ServiceStatus } from "../api/service";

const MAP: Record<ServiceStatus, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    active: "bg-green-100 text-green-700",
    expired: "bg-gray-100 text-gray-700",
    suspended: "bg-red-100 text-red-700",
    cancelled: "bg-gray-200 text-gray-600",
};

export default function ServiceStatusBadge({
    status,
}: {
    status: ServiceStatus;
}) {
    return (
        <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${MAP[status]}`}
        >
            {status.toUpperCase()}
        </span>
    );
}