"use client";

import { useAppSelector } from "@/redux/hooks";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// 🔥 Dhaka always first
const ALL_DISTRICTS = [
    "Dhaka (Inside Dhaka)", // 👈 top priority
    "Bagerhat",
    "Bandarban",
    "Barguna",
    "Barishal",
    "Bhola",
    "Bogura",
    "Brahmanbaria",
    "Chandpur",
    "Chapainawabganj",
    "Chattogram",
    "Chuadanga",
    "Cox's Bazar",
    "Cumilla",
    "Dinajpur",
    "Faridpur",
    "Feni",
    "Gaibandha",
    "Gazipur",
    "Gopalganj",
    "Habiganj",
    "Jamalpur",
    "Jashore",
    "Jhalokati",
    "Jhenaidah",
    "Joypurhat",
    "Khagrachhari",
    "Khulna",
    "Kishoreganj",
    "Kurigram",
    "Kushtia",
    "Lakshmipur",
    "Lalmonirhat",
    "Madaripur",
    "Magura",
    "Manikganj",
    "Meherpur",
    "Moulvibazar",
    "Munshiganj",
    "Mymensingh",
    "Naogaon",
    "Narail",
    "Narayanganj",
    "Narsingdi",
    "Natore",
    "Netrokona",
    "Nilphamari",
    "Noakhali",
    "Pabna",
    "Panchagarh",
    "Patuakhali",
    "Pirojpur",
    "Rajbari",
    "Rajshahi",
    "Rangamati",
    "Rangpur",
    "Satkhira",
    "Shariatpur",
    "Sherpur",
    "Sirajganj",
    "Sunamganj",
    "Sylhet",
    "Tangail",
    "Thakurgaon",
];

const CheckoutPage = () => {
    const { products } = useAppSelector((state) => state.cart);

    const [selectedDistrict, setSelectedDistrict] = useState("");

    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
        note: "",
    });

    const handleInput = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    // 🔥 Delivery logic
    const isInsideDhaka = selectedDistrict === "Dhaka (Inside Dhaka)";
    const deliveryCharge = selectedDistrict ? (isInsideDhaka ? 70 : 120) : null;

    const subtotal = products.reduce(
        (acc: number, p: any) =>
            acc + (p.discountPrice || p.basePrice) * p.quantity,
        0,
    );

    const total = subtotal + (deliveryCharge ?? 0);
    const canOrder = selectedDistrict && products.length > 0;

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-7xl text-center text-blue-950 font-bold mb-6">
                    Checkout
                </h1>

                {/* Products */}
                <div className="card bg-base-100 shadow my-8">
                    <div className="card-body">
                        <h2 className="card-title">
                            🛒 Items ({products.length})
                        </h2>

                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map((p: any, i: number) => (
                                        <tr key={`${p.id}-${i}`}>
                                            {/* Image */}
                                            <td>
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <Image
                                                            src={
                                                                p.images?.[0] ||
                                                                p.image
                                                            }
                                                            alt={p.title}
                                                            width={50}
                                                            height={50}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Title */}
                                            <td>
                                                <div className="font-semibold">
                                                    {p.title}
                                                </div>

                                                {p.size && (
                                                    <span className="badge badge-ghost badge-sm mt-1">
                                                        Size: {p.size}
                                                    </span>
                                                )}
                                            </td>

                                            {/* Quantity */}
                                            <td>
                                                <span className="font-medium">
                                                    {p.quantity}
                                                </span>
                                            </td>

                                            {/* Price */}
                                            <td>
                                                <span className="font-bold">
                                                    ৳
                                                    {(
                                                        (p.discountPrice ||
                                                            p.basePrice) *
                                                        p.quantity
                                                    ).toLocaleString()}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* LEFT */}

                    <div className="lg:col-span-2 space-y-6">
                        <div className="card bg-base-100 shadow">
                            <div className="card-body space-y-4">
                                <h2 className="card-title">📦 Delivery Info</h2>

                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleInput}
                                    placeholder="Full Name"
                                    className="input input-bordered w-full"
                                />

                                <input
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleInput}
                                    placeholder="Phone"
                                    className="input input-bordered w-full"
                                />

                                {/* 🔥 DaisyUI Select */}
                                <select
                                    className="select select-bordered w-full"
                                    value={selectedDistrict}
                                    onChange={(e) =>
                                        setSelectedDistrict(e.target.value)
                                    }
                                >
                                    <option value="" disabled>
                                        Select District
                                    </option>

                                    {ALL_DISTRICTS.map((d) => (
                                        <option key={d} value={d}>
                                            {d}
                                        </option>
                                    ))}
                                </select>

                                {selectedDistrict && (
                                    <div
                                        className={`badge ${
                                            isInsideDhaka
                                                ? "badge-success"
                                                : "badge-warning"
                                        }`}
                                    >
                                        {isInsideDhaka
                                            ? "Inside Dhaka — ৳70"
                                            : "Outside Dhaka — ৳120"}
                                    </div>
                                )}

                                <input
                                    name="address"
                                    value={form.address}
                                    onChange={handleInput}
                                    placeholder="Address"
                                    className="input input-bordered w-full"
                                />

                                <textarea
                                    name="note"
                                    value={form.note}
                                    onChange={handleInput}
                                    placeholder="Note (optional)"
                                    className="textarea textarea-bordered"
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div>
                        <div className="card bg-neutral text-neutral-content shadow sticky top-20 ">
                            <div className="card-body">
                                <h2 className="card-title">Order Summary</h2>

                                <p>Subtotal: ৳{subtotal}</p>
                                <p>
                                    Delivery:{" "}
                                    {deliveryCharge ?? "Select district"}
                                </p>

                                <div className="divider" />

                                <p className="text-xl font-bold">
                                    Total: ৳
                                    {selectedDistrict ? total : subtotal}
                                </p>

                                <button
                                    className="btn btn-primary w-full"
                                    disabled={!canOrder}
                                >
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
