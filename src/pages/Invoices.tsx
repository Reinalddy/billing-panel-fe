import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import InvoiceRow from "../components/InvoiceRow";
import Pagination from "../components/Pagination";
import { getInvoices,type Invoice } from "../api/invoice";

export default function Invoices() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [page, setPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    const perPage = 10;

    useEffect(() => {
        const fetchInvoices = async () => {
            setLoading(true);
            try {
                const res = await getInvoices({ page, per_page: perPage });
                const p = res.data.data;
                setInvoices(p.data);
                setLastPage(p.last_page);
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, [page]);
    
    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-6">Invoices</h1>

            {loading ? (
                <div>Loading invoices...</div>
            ) : invoices.length === 0 ? (
                <div className="text-gray-500">No invoices</div>
            ) : (
                <>
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 text-left">
                                <tr>
                                    <th className="py-3 px-4">Invoice</th>
                                    <th className="py-3 px-4">Total</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Date</th>
                                    <th className="py-3 px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {invoices.map((inv) => (
                                    <InvoiceRow
                                        key={inv.id}
                                        invoice={inv}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Pagination current={page} last={lastPage} onChange={setPage} />
                </>
            )}
        </DashboardLayout>
    );
}
