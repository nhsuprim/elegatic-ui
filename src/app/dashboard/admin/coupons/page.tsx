"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

const Page = () => {
    const [searchCoupons, setSearchCoupons] = useState("");
    const [coupons, setCoupons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                // ✅ cookie থেকে token নাও
                const token = document.cookie
                    .split("; ")
                    .find((row) => row.startsWith("accessToken="))
                    ?.split("=")[1];

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/coupons`,
                    {
                        headers: {
                            Authorization: `${token}`,
                        },
                    },
                );
                const data = await res.json();
                setCoupons(data.data || []);
            } catch (error) {
                console.error("Failed to fetch coupons", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCoupons();
    }, []);

    const filteredCoupons = coupons.filter((coupon) =>
        coupon.code.toLowerCase().includes(searchCoupons.toLowerCase()),
    );

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="flex flex-col items-center gap-3">
                    <span className="loading loading-spinner loading-lg text-stone-400"></span>
                    <p className="text-sm text-stone-400 tracking-wide">
                        Loading Coupons...
                    </p>
                </div>
            </div>
        );

    return (
        <div>
            <div className="flex justify-between items-center mb-6 gap-4 flex-wrap">
                <h1 className="text-2xl font-bold">Coupons</h1>

                <input
                    type="text"
                    placeholder="Search coupons..."
                    className="input input-bordered w-full max-w-xs"
                    value={searchCoupons}
                    onChange={(e) => setSearchCoupons(e.target.value)}
                />

                <Link
                    href="/dashboard/admin/coupons/add"
                    className="bg-blue-900 text-white px-4 py-2 font-semibold rounded-lg hover:bg-blue-950 transition"
                >
                    Add New Coupon
                </Link>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : filteredCoupons.length === 0 ? (
                <p>No coupons found</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr className="uppercase text-center">
                                <th>#</th>
                                <th>Code</th>
                                <th>Discount Mode</th>
                                <th>Discount Amount</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCoupons.map((coupon, index) => (
                                <tr
                                    key={coupon.id}
                                    className="text-center font-bold"
                                >
                                    <th>{index + 1}</th>
                                    <td>{coupon.code}</td>
                                    <td>{coupon.discountMode}</td>
                                    <td>{coupon.discountAmount}</td>
                                    <td>
                                        <span
                                            className={`px-3 py-1.5 text-white text-xs rounded-md ${coupon.isActive ? "bg-green-600" : "bg-red-600"}`}
                                        >
                                            {coupon.isActive
                                                ? "ACTIVE"
                                                : "INACTIVE"}
                                        </span>
                                    </td>
                                    <td>
                                        <Link
                                            href={`/dashboard/admin/coupons/${coupon.id}`}
                                            className="bg-blue-900 hover:bg-blue-950 text-white px-3 py-2 font-semibold rounded-md"
                                        >
                                            Edit
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
