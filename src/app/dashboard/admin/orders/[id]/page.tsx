"use client";

import OrderStatusUpdateModal from "@/components/Modal/Order/OrderStatusUpdateModal";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

enum OrderStatus {
    PENDING = "PENDING",
    SUCCESSFUL = "SUCCESSFUL",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
}

const Page = () => {
    const { id } = useParams();

    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [openModal, setOpenModal] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(
        null,
    );

    // ✅ status color
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

    // ✅ token
    const getToken = () =>
        document.cookie
            .split("; ")
            .find((row) => row.startsWith("accessToken="))
            ?.split("=")[1];

    // ✅ fetch order
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
                    {
                        headers: {
                            Authorization: `${getToken()}`,
                        },
                    },
                );

                const data = await res.json();
                if (!res.ok) throw new Error(data.message);

                setOrder(data.data);
            } catch (err: any) {
                setError(err.message || "Failed to load order");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchOrder();
    }, [id]);

    // ✅ update status
    const updateOrderStatus = async (status: OrderStatus) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${getToken()}`,
                    },
                    body: JSON.stringify({ status }),
                },
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            toast.success("Order Status Updated");

            // UI update
            setOrder((prev: any) => ({ ...prev, status }));
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="flex flex-col items-center gap-3">
                    <span className="loading loading-spinner loading-lg text-stone-400"></span>
                    <p className="text-sm text-stone-400 tracking-wide">
                        Loading order...
                    </p>
                </div>
            </div>
        );
    if (error) return <p className="p-6 text-red-500">{error}</p>;

    return (
        <div className="max-w-6xl mx-auto overflow-visible">
            {/* 🔝 Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Order Details</h1>

                {/* 🆔 Order Info */}
                <div className="bg-gray-100 p-4 rounded text-center">
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-mono font-bold">{order.id}</p>
                    <p className="text-xs text-gray-400 mt-1">
                        {new Date(order.createdAt).toLocaleString()}
                    </p>
                </div>

                {/* ✅ Dropdown FIXED */}
                <div className="dropdown dropdown-end pr-7 ">
                    <div
                        tabIndex={0}
                        role="button"
                        className={`btn m-1 ${getStatusColor(order.status)} font-semibold`}
                    >
                        {order.status}
                    </div>

                    <ul
                        tabIndex={-1}
                        className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow"
                    >
                        {Object.values(OrderStatus).map((status) => (
                            <li key={status}>
                                <button
                                    onClick={() => {
                                        setSelectedStatus(status);
                                        setOpenModal(true);
                                    }}
                                    className={`btn m-1 w-full 
                                    ${getStatusColor(status)} 
                                    `}
                                >
                                    {status}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* 🧾 Customer Info */}
            <div className="bg-white shadow rounded-lg p-5 mb-6">
                <h2 className="text-lg font-semibold mb-4">
                    Customer Information
                </h2>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <p>
                        <span className="font-medium">Name:</span>{" "}
                        {order.customerName}
                    </p>
                    <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {order.customerPhn}
                    </p>
                    <p>
                        <span className="font-medium">District:</span>{" "}
                        {order.customerDistrict}
                    </p>
                    <p>
                        <span className="font-medium">Address:</span>{" "}
                        {order.customerAddress}
                    </p>
                </div>
            </div>

            {/* 🛒 Items */}
            <div className="bg-white shadow rounded-lg p-5 mb-6">
                <h2 className="text-lg font-semibold mb-4">Order Items</h2>

                {order.items.map((item: any) => (
                    <div
                        key={item.id}
                        className="flex gap-4 items-center border-b pb-4"
                    >
                        <img
                            src={item.product.images[0]}
                            className="w-20 h-20 object-cover rounded"
                        />

                        <div className="flex-1">
                            <h3 className="font-semibold">
                                {item.product.title}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {item.product.brand} • {item.product.color}
                            </p>
                            <p className="text-sm">Quantity: {item.quantity}</p>
                        </div>

                        <div className="text-right">
                            <p className="font-medium">৳{item.price}</p>
                            <p className="text-sm text-gray-500">
                                ৳{item.price * item.quantity}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* 💰 Price */}
            <div className="bg-white shadow rounded-lg p-5">
                <h2 className="text-lg font-semibold mb-4">Price Summary</h2>

                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>৳{order.subtotal}</span>
                    </div>

                    <div className="flex justify-between">
                        <span>Delivery</span>
                        <span>৳{order.deliveryCharge}</span>
                    </div>

                    {order.discount > 0 && (
                        <div className="flex justify-between text-green-600">
                            <span>Discount ({order.couponCode})</span>
                            <span>-৳{order.discount}</span>
                        </div>
                    )}

                    <hr />

                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>৳{order.totalPrice}</span>
                    </div>
                </div>
            </div>

            {/* ✅ Modal */}
            <OrderStatusUpdateModal
                open={openModal}
                setOpen={setOpenModal}
                status={selectedStatus}
                onConfirm={() => {
                    if (selectedStatus) {
                        updateOrderStatus(selectedStatus);
                    }
                    setOpenModal(false);
                }}
            />
        </div>
    );
};

export default Page;
