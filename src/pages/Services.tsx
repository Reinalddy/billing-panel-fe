import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import Pagination from "../components/Pagination";
import ServiceStatusBadge from "../components/ServiceStatusBadge";
import { getServices, type Service } from "../api/service";
import RenewServiceModal from "../components/RenewServiceModal";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Services() {
    const [services, setServices] = useState<Service[]>([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedService, setSelectedService] = useState<{
        id: number;
        name: string;
    } | null>(null);

    const perPage = 10;

    const navigate = useNavigate();

    const openGamePanel = async () => {
        try {
            const res = await api.post("/sso/token");
            console.log(res);
            const gamepPanelUrl = res.data.data.url;
            if (res.data.code !== 200) {
                alert(res.data.message);
                return;
            }

            const token = res.data.data.token;

            const fullUrl = `${gamepPanelUrl}?token=${token}`;

            // redirect ke Game Panel
            window.open(fullUrl, "_blank");
        } catch (err) {
            console.error(err);
            alert("Gagal membuka Game Panel");
        }
    };

    useEffect(() => {
        const fetchServices = async () => {
            setLoading(true);
            try {
                const res = await getServices({ page, per_page: perPage });
                const p = res.data.data;
                setServices(p.data);
                setLastPage(p.last_page);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [page]);

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-6">My Services</h1>

            {loading ? (
                <div>Loading services...</div>
            ) : services.length === 0 ? (
                <div className="text-gray-500">No active services</div>
            ) : (
                <>
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 text-left">
                                <tr>
                                    <th className="py-3 px-4">Service</th>
                                    <th className="py-3 px-4">Price</th>
                                    <th className="py-3 px-4">Status</th>
                                    <th className="py-3 px-4">Period</th>
                                    <th className="py-3 px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {services.map((svc) => (
                                    <tr key={svc.id} className="border-b">
                                        <td className="py-3 px-4 font-medium">
                                            {svc.service_name}
                                        </td>
                                        <td className="py-3 px-4">
                                            Rp {svc.price.toLocaleString()}
                                        </td>
                                        <td className="py-3 px-4">
                                            <ServiceStatusBadge status={svc.status} />
                                        </td>
                                        <td className="py-3 px-4 text-sm text-gray-500">
                                            {svc.start_date && svc.end_date
                                                ? `${svc.start_date} → ${svc.end_date}`
                                                : "-"}
                                        </td>
                                        <td className="py-3 px-4">
                                            {/* svc.status === "active" || */}
                                            {svc.status === "expired" ? (
                                                <button
                                                    onClick={() =>
                                                        setSelectedService({
                                                            id: svc.id,
                                                            name: svc.service_name,
                                                        })
                                                    }
                                                    className="text-indigo-600 hover:underline text-sm"
                                                >
                                                    Renew
                                                </button>
                                            ) : (
                                                ''
                                            )}

                                            {svc.status === "active" ? (
                                                <button
                                                    onClick={() =>
                                                        openGamePanel()
                                                    }
                                                    className="text-blue-400 hover:underline text-sm"
                                                >
                                                    Game Panel
                                                </button>
                                            ) : (
                                                ''
                                            )}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <Pagination
                        current={page}
                        last={lastPage}
                        onChange={setPage}
                    />
                </>
            )}

            {selectedService && (
                <RenewServiceModal
                    serviceId={selectedService.id}
                    serviceName={selectedService.name}
                    onClose={() => setSelectedService(null)}
                    onSuccess={() => {
                        setSelectedService(null);
                        navigate("/user/invoices");
                    }}
                />
            )}

        </DashboardLayout>
    );
}