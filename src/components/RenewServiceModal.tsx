import { useEffect, useState } from "react";
import {
    getRenewOptions,
    renewPreview,
    renewService,
    type RenewDuration,
} from "../api/renew";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "../types/api";

export default function RenewServiceModal({
    serviceId,
    serviceName,
    onClose,
    onSuccess,
}: {
    serviceId: number;
    serviceName: string;
    onClose: () => void;
    onSuccess: () => void;
}) {
    const [durations, setDurations] = useState<RenewDuration[]>([]);
    const [selected, setSelected] = useState<RenewDuration | null>(null);
    const [total, setTotal] = useState<number | null>(null);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const res = await getRenewOptions(serviceId);

                if (res.data.code !== 200) {
                    alert(res.data.message);
                    onClose();
                    return;
                }

                setDurations(res.data.data.durations);
            } catch (err) {
                const axiosError = err as AxiosError<ApiErrorResponse>;
                alert(
                    axiosError.response?.data?.message ??
                    "Gagal memuat opsi renew"
                );
                onClose();
            }
        };

        fetchOptions();
    }, [serviceId, onClose]);


    const handleSelect = async (d: RenewDuration) => {
        setSelected(d);
        const res = await renewPreview(serviceId, d.id);
        setTotal(res.data.data.total);
    };

    const handleConfirm = async () => {
        if (!selected) return;
        await renewService(serviceId, selected.id);
        onSuccess();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-md p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold mb-4">
                        Renew {serviceName}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                    {durations.map((d) => (
                        <button
                            key={d.id}
                            onClick={() => handleSelect(d)}
                            className={`border rounded-xl p-3 ${selected?.id === d.id
                                    ? "border-indigo-600 bg-indigo-50"
                                    : ""
                                }`}
                        >
                            {d.month} Bulan
                        </button>
                    ))}
                </div>

                <div className="bg-gray-50 p-4 rounded-xl mb-4">
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="text-xl font-bold">
                        {total ? `Rp ${total.toLocaleString()}` : "-"}
                    </p>
                </div>

                <button
                    onClick={handleConfirm}
                    disabled={!selected}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white py-3 rounded-xl font-semibold"
                >
                    Create Invoice
                </button>
            </div>
        </div>
    );
}
