export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="stat bg-base-200 rounded">
                    <div className="stat-title">Sales</div>
                    <div className="stat-value">৳50K</div>
                </div>

                <div className="stat bg-base-200 rounded">
                    <div className="stat-title">Orders</div>
                    <div className="stat-value">120</div>
                </div>

                <div className="stat bg-base-200 rounded">
                    <div className="stat-title">Customers</div>
                    <div className="stat-value">80</div>
                </div>

                <div className="stat bg-base-200 rounded">
                    <div className="stat-title">Products</div>
                    <div className="stat-value">45</div>
                </div>
            </div>
        </div>
    );
}
