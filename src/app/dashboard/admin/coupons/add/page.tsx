"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Page = () => {
    const router = useRouter();

    const [formData, setFormData] = useState({
        code: "",
        discountMode: "PERCENTAGE",
        discountAmount: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // ✅ Fix 2: Client এ cookie থেকে token এভাবে নাও
            const token = document.cookie
                .split("; ")
                .find((row) => row.startsWith("accessToken="))
                ?.split("=")[1];

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/coupons`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${token}`,
                    },
                    // ✅ Fix 1: credentials: "include" সরিয়ে দাও
                    body: JSON.stringify({
                        code: formData.code,
                        discountMode: formData.discountMode,
                        discountAmount: Number(formData.discountAmount),
                    }),
                },
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }
            toast.success("Coupons Add Successfully");

            router.push("/dashboard/admin/coupons");
        } catch (err: any) {
            setError(err.message);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };
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
        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6">Add Coupon</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 font-medium">
                        Coupon Code
                    </label>
                    <input
                        type="text"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        placeholder="e.g. SAVE10"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">
                        Discount Type
                    </label>
                    <select
                        name="discountMode"
                        value={formData.discountMode}
                        onChange={handleChange}
                        className="select select-bordered w-full"
                    >
                        <option value="PERCENTAGE">Percentage (%)</option>
                        <option value="FIXED">Fixed Amount</option>
                    </select>
                </div>

                <div>
                    <label className="block mb-1 font-medium">
                        Discount Amount
                    </label>
                    <input
                        type="number"
                        name="discountAmount"
                        value={formData.discountAmount}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        placeholder="Enter amount"
                        required
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-950 transition disabled:opacity-50"
                >
                    {loading ? "Adding..." : "Add Coupon"}
                </button>
            </form>
        </div>
    );
};

export default Page;
