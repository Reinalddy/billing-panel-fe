import api from "./axios";

export interface ProductDuration {
    id: number;
    duration_month: number;
    price_per_month: number;
}

export interface CheckoutPreviewResponse {
    product_id: number;
    duration_month: number;
    price_per_month: number;
    total: number;
}

export interface CheckoutFinalPayload {
    product_id: number;
    product_duration_id: number;
}

export interface CheckoutFinalResponse {
    service_id: number;
    invoice_id: number;
    invoice_number: string;
    duration_month: number;
    total: number;
    status: "unpaid" | "paid";
}


export const getProductDurations = (productId: number) =>
    api.get(`/user/services/products/${productId}/durations`);

export const checkoutPreview = (payload: {
    product_id: number;
    product_duration_id: number;
}) =>
    api.post("/user/services/checkout-preview", payload);

export const checkoutFinal = (payload: CheckoutFinalPayload) =>
    api.post("/user/services/checkout", payload);
