import DashboardLayout from "../components/DashboardLayout";
import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <DashboardLayout>
            <h1 className="text-2xl font-bold mb-6">
                Dashboard
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 shadow">
                    <p className="text-gray-500">Welcome</p>
                    <h2 className="text-lg font-semibold">
                        {user?.name}
                    </h2>
                </div>

                <div className="bg-white rounded-xl p-6 shadow">
                    <p className="text-gray-500">Active Services</p>
                    <h2 className="text-3xl font-bold text-indigo-600">
                        0
                    </h2>
                </div>

                <div className="bg-white rounded-xl p-6 shadow">
                    <p className="text-gray-500">Unpaid Invoices</p>
                    <h2 className="text-3xl font-bold text-red-500">
                        0
                    </h2>
                </div>
            </div>
        </DashboardLayout>
    );
}
