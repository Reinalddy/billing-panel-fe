import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { getInvoiceDetail,type InvoiceDetail } from "../api/invoice";
import StatusBadge from "../components/StatusBadge";
import { payInvoice } from "../api/invoice";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/api";


export default function InvoiceDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [invoice, setInvoice] = useState<InvoiceDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [paying, setPaying] = useState(false);
    const [error, setError] = useState<string>("");

    const handlePay = async () => {
        if (!invoice) return;

        setPaying(true);
        setError("");

        try {
            await payInvoice(invoice.id);

            // refresh invoice detail
            const res = await getInvoiceDetail(invoice.id);
            setInvoice(res.data.data);
        } catch (err) {
            const axiosError = err as AxiosError<ApiErrorResponse>;
            setError(
                axiosError.response?.data?.message ?? "Gagal membayar invoice"
            );
        } finally {
            setPaying(false);
        }
    };



    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const res = await getInvoiceDetail(Number(id));
                setInvoice(res.data.data);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoice();
    }, [id]);

    if (loading) {
        return (
            <DashboardLayout>
                <div>Loading invoice...</div>
            </DashboardLayout>
        );
    }

    if (!invoice) {
        return (
            <DashboardLayout>
                <div className="text-red-500">Invoice not found</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <button
                onClick={() => navigate(-1)}
                className="text-sm text-gray-500 mb-4"
            >
                ← Back
            </button>

            <h1 className="text-2xl font-bold mb-6">
                Invoice {invoice.invoice_number}
            </h1>

            <div className="bg-white rounded-xl shadow p-6 mb-6">
                <div className="flex justify-between mb-4">
                    <div>
                        <p className="text-gray-500">Service</p>
                        <p className="font-semibold">{invoice.service.service_name}</p>
                    </div>

                    <StatusBadge status={invoice.status} />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">Duration</p>
                        <p>{invoice.duration_month} Bulan</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Created At</p>
                        <p>
                            {new Date(invoice.created_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 mb-6">
                <h2 className="font-semibold mb-4">Items</h2>

                <table className="w-full text-sm">
                    <thead className="text-left border-b">
                        <tr>
                            <th className="py-2">Description</th>
                            <th className="py-2">Price</th>
                            <th className="py-2">Qty</th>
                            <th className="py-2">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((item) => (
                            <tr key={item.id} className="border-b">
                                <td className="py-2">{item.description}</td>
                                <td className="py-2">
                                    Rp {item.unit_price.toLocaleString()}
                                </td>
                                <td className="py-2">{item.quantity}</td>
                                <td className="py-2 font-medium">
                                    Rp {item.total_price.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 flex justify-between items-center">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-indigo-600">
                    Rp {invoice.total.toLocaleString()}
                </span>
            </div>

            {error && (
                <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded">
                    {error}
                </div>
            )}

            {invoice.status === "unpaid" && (
                <button
                    onClick={handlePay}
                    disabled={paying}
                    className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white py-3 rounded-xl font-semibold"
                >
                    {paying ? "Processing..." : "Pay Now"}
                </button>
            )}

        </DashboardLayout>
    );
}