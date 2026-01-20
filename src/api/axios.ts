import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
    throw new Error("VITE_API_URL is not defined");
}

const api = axios.create({
    baseURL: API_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

// 🔐 Request interceptor → auto Bearer token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;