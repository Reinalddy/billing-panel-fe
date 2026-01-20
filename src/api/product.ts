import api from "./axios";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

export interface ProductPagination {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export const getProducts = (params: {
    page: number;
    per_page: number;
    search: string;
}) =>
    api.get("/user/services/products", { params });
