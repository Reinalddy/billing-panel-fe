import api from "./axios";

export type InvoiceStatus = "unpaid" | "paid" | "expired" | "cancelled";

export interface Invoice {
    id: number;
    invoice_number: string;
    total: number;
    status: InvoiceStatus;
    created_at: string;
}

export interface InvoicePagination {
    data: Invoice[];
    current_page: number;
    last_page: number;
    total: number;
}

export interface InvoiceItem {
    id: number;
    description: string;
    unit_price: number;
    quantity: number;
    total_price: number;
}

export interface InvoiceDetail {
    id: number;
    invoice_number: string;
    status: "unpaid" | "paid" | "expired" | "cancelled";
    duration_month: number;
    subtotal: number;
    total: number;
    created_at: string;
    service: {
        id: number;
        service_name: string;
        status: string;
    };
    items: InvoiceItem[];
}

export const getInvoices = (params: {
    page: number;
    per_page: number;
}) => api.get("/user/invoices", { params });

export const getInvoiceDetail = (id: number) =>
    api.get(`/user/invoices/${id}`);

export const payInvoice = (id: number) =>
    api.post(`/user/invoices/${id}/pay`);

