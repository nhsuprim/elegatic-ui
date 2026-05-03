"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
    const [searchOrders, setSearchOrdes] = useState("");
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-100 text-yellow-700";
            case "SUCCESSFUL":
                return "bg-green-100 text-green-700";
            case "SHIPPED":
                return "bg-blue-100 text-blue-700";
            case "DELIVERED":
                return "bg-purple-100 text-purple-700";
            case "CANCELLED":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // ✅ cookie থেকে token নাও
                const token = document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("accessToken="))
                    ?.split("=")[1];

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/orders`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    },
                );
                const data = await res.json();
                setOrders(data.data || []);
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const filteredOrders = orders.filter((order) => {
        const search = searchOrders.toLowerCase();

        return (
            order.customerPhn?.toString().includes(search) ||
            order.status?.toLowerCase().includes(search)
        );
    });
    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="flex flex-col items-center gap-3">
                    <span className="loading loading-spinner loading-lg text-stone-400"></span>
                    <p className="text-sm text-stone-400 tracking-wide">
                        Loading orders...
                    </p>
                </div>
            </div>
        );

    return (
        <div>
            <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
                <h1 className="text-2xl font-bold">Order</h1>

                <input
                    type="text"
                    placeholder="Search Orders..."
                    className="input input-bordered w-full max-w-xs"
                    value={searchOrders}
                    onChange={(e) => setSearchOrdes(e.target.value)}
                />
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : filteredOrders.length === 0 ? (
                <p>No coupons found</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="uppercase text-center">
                                <th>#</th>
                                <th>ID</th>
                                <th>customerName</th>
                                <th>customerPhn</th>
                                <th>Order createdAt</th>
                                <th>Order Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order, index) => (
                                <tr
                                    key={order.id}
                                    className="text-center font-bold"
                                >
                                    <th>{index + 1}</th>
                                    <td>{order.id}</td>
                                    <td>{order.customerName}</td>
                                    <td>{order.customerPhn}</td>
                                    <td>
                                        {new Date(
                                            order.createdAt,
                                        ).toLocaleString()}
                                    </td>
                                    <td
                                        className={` m-1  
                                            ${getStatusColor(order.status)}`}
                                    >
                                        {order.status}
                                    </td>
                                    <td>
                                        <Link
                                            href={`/dashboard/admin/orders/${order.id}`}
                                            className="bg-blue-900 hover:bg-blue-950 text-white px-3 py-2 font-semibold rounded-md"
                                        >
                                            Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Page;
