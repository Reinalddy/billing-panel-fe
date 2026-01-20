import type { Invoice } from "../api/invoice";
import StatusBadge from "./StatusBadge";
import { useNavigate } from "react-router-dom";

export default function InvoiceRow({
    invoice,
}: {
    invoice: Invoice;
}) {
    const navigate = useNavigate();
    return (
        <tr className="border-b">
            <td className="py-3 px-4 font-medium">{invoice.invoice_number}</td>
            <td className="py-3 px-4">
                Rp {invoice.total.toLocaleString()}
            </td>
            <td className="py-3 px-4">
                <StatusBadge status={invoice.status} />
            </td>
            <td className="py-3 px-4 text-sm text-gray-500">
                {new Date(invoice.created_at).toLocaleDateString()}
            </td>
            <td className="py-3 px-4">
                <button className="ml-2 bg-gray-200 hover:bg-gray-300 text-gray-600 px-3 py-2 rounded-lg text-sm" onClick={() => navigate('/user/invoices/' + invoice.id )}>Detail</button>
            </td>
        </tr>
    );
}
