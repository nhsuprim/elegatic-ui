"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";

const Page = () => {
    const router = useRouter();
    const { id } = useParams();

    const [coupon, setCoupon] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");

    // ── Token helper ──────────────────────────────────────────────
    const getToken = () =>
        document.cookie
            .split("; ")
            .find((row) => row.startsWith("accessToken="))
            ?.split("=")[1];

    // ── Fetch existing coupon ─────────────────────────────────────
    useEffect(() => {
        const fetchCoupon = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/coupons/${id}`,
                    { headers: { Authorization: ` ${getToken()}` } },
                );
                const data = await res.json();
                if (!res.ok) throw new Error(data.message);
                setCoupon(data.data);
            } catch (err: any) {
                setError(err.message || "Failed to load coupon");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchCoupon();
    }, [id]);

    // ── Update ────────────────────────────────────────────────────
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");

        const form = e.currentTarget;

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/coupons/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${getToken()}`,
                    },
                    body: JSON.stringify({
                        code: (
                            form.elements.namedItem("code") as HTMLInputElement
                        ).value,
                        discountMode: (
                            form.elements.namedItem(
                                "discountMode",
                            ) as HTMLSelectElement
                        ).value,
                        discountAmount: Number(
                            (
                                form.elements.namedItem(
                                    "discountAmount",
                                ) as HTMLInputElement
                            ).value,
                        ),
                        isActive: (
                            form.elements.namedItem(
                                "isActive",
                            ) as HTMLInputElement
                        ).checked,
                    }),
                },
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Update failed");
            toast.success("Coupon updated successfully!");
            router.push("/dashboard/admin/coupons");
            setCoupon(data.data);
        } catch (err: any) {
            toast.error(err.message);
            setError(err.message);
        } finally {
            setSubmitting(false);
        }
    };

    // ── Delete ────────────────────────────────────────────────────
    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this coupon?")) return;
        setDeleting(true);
        setError("");

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/coupons/${id}`,
                {
                    method: "DELETE",
                    headers: { Authorization: `${getToken()}` },
                },
            );

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Delete failed");
            toast.success("Coupons Deleted");
            router.push("/dashboard/admin/coupons");
        } catch (err: any) {
            setError(err.message);
            toast.error(err.message);
            setDeleting(false);
        }
    };

    // ── Loading skeleton ──────────────────────────────────────────
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

    if (!coupon && !loading) {
        return (
            <div className="max-w-lg mx-auto p-6 text-center">
                <p className="text-red-500 font-semibold">Coupon not found.</p>
            </div>
        );
    }

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Edit Coupon</h2>
                <span
                    className={`badge ${coupon.isActive ? "badge-success" : "badge-error"} badge-lg`}
                >
                    {coupon.isActive ? "ACTIVE" : "INACTIVE"}
                </span>
            </div>

            {/* Alerts */}
            {error && (
                <div className="alert alert-error mb-4 text-sm">
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
                {/* Code */}
                <div>
                    <label className="block mb-1 font-medium">
                        Coupon Code
                    </label>
                    <input
                        type="text"
                        name="code"
                        defaultValue={coupon.code}
                        className="input input-bordered w-full"
                        placeholder="e.g. SAVE10"
                        required
                    />
                </div>

                {/* Discount Mode */}
                <div>
                    <label className="block mb-1 font-medium">
                        Discount Type
                    </label>
                    <select
                        name="discountMode"
                        defaultValue={coupon.discountMode}
                        className="select select-bordered w-full"
                    >
                        <option value="PERCENTAGE">Percentage (%)</option>
                        <option value="FIXED">Fixed Amount</option>
                    </select>
                </div>

                {/* Discount Amount */}
                <div>
                    <label className="block mb-1 font-medium">
                        Discount Amount
                    </label>
                    <input
                        type="number"
                        name="discountAmount"
                        defaultValue={coupon.discountAmount}
                        className="input input-bordered w-full"
                        placeholder="Enter amount"
                        required
                    />
                </div>

                {/* isActive toggle */}
                <div className="flex items-center justify-between p-4 border border-base-200 rounded-lg">
                    <div>
                        <p className="font-medium">Active Status</p>
                        <p className="text-sm text-gray-400">
                            Enable or disable this coupon
                        </p>
                    </div>
                    <input
                        type="checkbox"
                        name="isActive"
                        defaultChecked={coupon.isActive}
                        className="toggle toggle-success"
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-950 transition disabled:opacity-50 font-semibold"
                    >
                        {submitting ? "Saving..." : "Save Changes"}
                    </button>

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={deleting}
                        className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition disabled:opacity-50 font-semibold"
                    >
                        {deleting ? "Deleting..." : "Delete Coupon"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Page;
