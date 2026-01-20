import api from "./axios";

export interface RenewDuration {
    id: number;
    month: number;
}

export const getRenewOptions = (serviceId: number) =>
    api.get(`/user/services/${serviceId}/renew-options`);

export const renewPreview = (
    serviceId: number,
    productDurationId: number
) =>
    api.post(`/user/services/${serviceId}/renew-preview`, {
        product_duration_id: productDurationId,
    });

export const renewService = (
    serviceId: number,
    productDurationId: number
) =>
    api.post(`/user/services/${serviceId}/renew`, {
        product_duration_id: productDurationId,
    });
