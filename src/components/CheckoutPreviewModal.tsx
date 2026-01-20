import { useEffect, useState } from "react";
import type { ProductDuration } from "../api/checkout";
import {
    getProductDurations,
    checkoutPreview,
    checkoutFinal,
} from "../api/checkout";
import DurationOption from "./DurationOption";
import type { ApiErrorResponse } from "../types/api";
import type { AxiosError } from "axios";

import { useNavigate } from "react-router-dom";

interface CheckoutPreviewModalProps {
    productId: number;
    productName: string;
    onClose: () => void;
}

export default function CheckoutPreviewModal({
    productId,
    productName,
    onClose,
}: CheckoutPreviewModalProps) {
    const navigate = useNavigate();

    const [durations, setDurations] = useState<ProductDuration[]>([]);
    const [selectedDuration, setSelectedDuration] =
        useState<ProductDuration | null>(null);

    const [total, setTotal] = useState<number | null>(null);
    const [loadingPreview, setLoadingPreview] = useState<boolean>(false);
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    // Load durations
    useEffect(() => {
        const fetchDurations = async () => {
            const res = await getProductDurations(productId);
            setDurations(res.data.data);
        };

        fetchDurations();
    }, [productId]);

    // Preview handler
    const handleSelectDuration = async (duration: ProductDuration) => {
        setSelectedDuration(duration);
        setError("");
        setLoadingPreview(true);

        try {
            const res = await checkoutPreview({
                product_id: productId,
                product_duration_id: duration.id,
            });

            setTotal(res.data.data.total);
        } catch {
            setError("Gagal memuat preview harga");
        } finally {
            setLoadingPreview(false);
        }
    };

    //CHECKOUT FINAL
    const handleCheckout = async () => {
        if (!selectedDuration) return;

        setSubmitting(true);
        setError("");

        try {
            await checkoutFinal({
                product_id: productId,
                product_duration_id: selectedDuration.id,
            });

            // sukses → tutup modal & redirect
            onClose();
            navigate("/user/dashboard"); // atau "/services"
        } catch (err) {
            const axiosError = err as AxiosError<ApiErrorResponse>;
            setError(
                axiosError.response?.data?.message ?? "Checkout gagal"
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-2xl w-full max-w-lg p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{productName}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-3 text-sm text-red-600 bg-red-100 p-3 rounded">
                        {error}
                    </div>
                )}

                {/* Durations */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {durations.map((d) => (
                        <DurationOption
                            key={d.id}
                            label={`${d.duration_month} Bulan`}
                            price={d.price_per_month}
                            selected={selectedDuration?.id === d.id}
                            onClick={() => handleSelectDuration(d)}
                        />
                    ))}
                </div>

                {/* Total */}
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-2xl font-bold text-indigo-600">
                        {loadingPreview
                            ? "Loading..."
                            : total
                                ? `Rp ${total.toLocaleString()}`
                                : "-"}
                    </p>
                </div>

                {/* Action */}
                <button
                    onClick={handleCheckout}
                    disabled={!selectedDuration || submitting}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white py-3 rounded-xl font-semibold"
                >
                    {submitting ? "Processing..." : "Checkout"}
                </button>
            </div>
        </div>
    );
}