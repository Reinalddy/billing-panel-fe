import type { InvoiceStatus } from "../api/invoice";

const MAP: Record<InvoiceStatus, string> = {
    unpaid: "bg-yellow-100 text-yellow-700",
    paid: "bg-green-100 text-green-700",
    expired: "bg-gray-100 text-gray-700",
    cancelled: "bg-red-100 text-red-700",
};

export default function StatusBadge({ status }: { status: InvoiceStatus }) {
    return (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${MAP[status]}`}>
            {status.toUpperCase()}
        </span>
    );
}
