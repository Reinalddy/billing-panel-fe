import api from "./axios";

export type ServiceStatus =
    | "pending"
    | "active"
    | "expired"
    | "suspended"
    | "cancelled";

export interface Service {
    id: number;
    service_name: string;
    price: number;
    status: ServiceStatus;
    start_date: string | null;
    end_date: string | null;
}

export const getServices = (params: {
    page: number;
    per_page: number;
}) => api.get("/user/services", { params });