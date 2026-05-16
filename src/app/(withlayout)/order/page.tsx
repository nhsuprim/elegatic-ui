"use client";

import { pixelEvent } from "@/lib/pixel";
import { clearCart } from "@/redux/feature/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ALL_DISTRICTS } from "@/utils/DistrictJsonData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type CheckoutFormValues = {
    customerName: string;
    customerPhn: string;
    customerDistrict: string;
    customerAddress: string;
    customerEmail: string;
};

const CheckoutPage = () => {
    const { products } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<CheckoutFormValues>();

    const selectedDistrict = watch("customerDistrict");
    const isInsideDhaka = selectedDistrict === "Dhaka (Inside Dhaka)";
    const deliveryCharge = selectedDistrict ? (isInsideDhaka ? 70 : 120) : 0;

    const [coupon, setCoupon] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [showCouponInput, setShowCouponInput] = useState(false);
    const [couponLoading, setCouponLoading] = useState(false);

    const subtotal = products.reduce(
        (acc: number, p: any) =>
            acc + (p.discountPrice || p.basePrice) * p.quantity,
        0,
    );

    const total = Math.round(Math.max(subtotal + deliveryCharge - discount, 0));

    // ✅ Pixel — InitiateCheckout: Page load হলে একবার fire হবে
    useEffect(() => {
        if (products.length > 0) {
            pixelEvent("InitiateCheckout", {
                value: subtotal,
                currency: "BDT",
                num_items: products.length,
                content_ids: products.map((p: any) => p.id),
            });
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleCouponApply = async () => {
        if (!coupon.trim()) return toast.error("কুপন কোড লিখুন");
        setCouponLoading(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/coupons/code/${coupon}`,
            );
            if (!res.ok) throw new Error("Invalid coupon");

            const data = await res.json();
            const c = data.data;

            if (!c.isActive) {
                toast.error("Coupon is no longer usable");
                return;
            }

            const discountValue =
                c.discountMode === "PERCENTAGE"
                    ? (subtotal * c.discountAmount) / 100
                    : c.discountAmount;

            setDiscount(discountValue);
            setAppliedCoupon(coupon);
            toast.success("Coupon applied ✅");
            setShowCouponInput(false);
        } catch {
            toast.error("Invalid coupon ❌");
        } finally {
            setCouponLoading(false);
        }
    };

    const onSubmit = async (data: CheckoutFormValues) => {
        if (products.length === 0) {
            toast.error("কার্টে কোনো পণ্য নেই");
            return;
        }

        const payload = {
            items: products.map((p: any) => ({
                productId: p.id,
                quantity: p.quantity,
            })),
            customerName: data.customerName,
            customerPhn: data.customerPhn,
            customerDistrict: data.customerDistrict,
            customerAddress: data.customerAddress,
            customerEmail: data.customerEmail,
            deliveryCharge,
            ...(appliedCoupon && { couponCode: appliedCoupon }),
        };

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/orders`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                },
            );

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Order failed");
            }

            const result = await res.json();

            // ✅ Pixel — Purchase: Order সফল হলে fire হবে
            pixelEvent("Purchase", {
                value: total,
                currency: "BDT",
                num_items: products.length,
                content_ids: products.map((p: any) => p.id),
                order_id: result?.data?.id,
            });

            dispatch(clearCart());
            toast.success("অর্ডার সফল হয়েছে! 🎉");
            router.push(`/order/order-success?orderId=${result?.data?.id}`);
        } catch (err: any) {
            toast.error(err.message || "অর্ডার করতে সমস্যা হয়েছে");
        }
    };

    if (couponLoading)
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

    useEffect(() => {
        document.title = "Order - ELEGATIC";
    }, []);

    return (
        <div className="min-h-screen bg-base-200 py-20 md:py-10 px-4">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl text-center font-bold mb-6">
                    Checkout
                </h1>

                {/* ===== Products Table ===== */}
                <div className="card bg-base-100 shadow my-8">
                    <div className="card-body">
                        <h2 className="card-title">
                            🛒 Items ({products.length})
                        </h2>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Title</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p: any, i: number) => (
                                    <tr key={i}>
                                        <td>
                                            <Image
                                                src={p.images?.[0] || p.image}
                                                alt={p.title}
                                                width={50}
                                                height={50}
                                            />
                                        </td>
                                        <td>{p.title}</td>
                                        <td>{p.quantity}</td>
                                        <td>
                                            ৳
                                            {(
                                                (p.discountPrice ||
                                                    p.basePrice) * p.quantity
                                            ).toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* ===== LEFT: Delivery Form ===== */}
                        <div className="lg:col-span-2">
                            <div className="card bg-base-100 shadow">
                                <div className="card-body space-y-4">
                                    <h2 className="card-title">
                                        📦 Delivery Info
                                    </h2>

                                    {/* customerName */}
                                    <div>
                                        <input
                                            {...register("customerName", {
                                                required: "নাম লিখুন",
                                                minLength: {
                                                    value: 3,
                                                    message:
                                                        "কমপক্ষে ৩ অক্ষর লিখুন",
                                                },
                                            })}
                                            placeholder="Full Name *"
                                            className={`input input-bordered w-full ${
                                                errors.customerName
                                                    ? "input-error"
                                                    : ""
                                            }`}
                                        />
                                        {errors.customerName && (
                                            <p className="text-error text-sm mt-1">
                                                {errors.customerName.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* customerPhn */}
                                    <div>
                                        <input
                                            {...register("customerPhn", {
                                                required: "ফোন নম্বর লিখুন",
                                                pattern: {
                                                    value: /^01[3-9]\d{8}$/,
                                                    message:
                                                        "সঠিক বাংলাদেশি নম্বর দিন (01XXXXXXXXX)",
                                                },
                                            })}
                                            placeholder="Phone * (01XXXXXXXXX)"
                                            className={`input input-bordered w-full ${
                                                errors.customerPhn
                                                    ? "input-error"
                                                    : ""
                                            }`}
                                        />
                                        {errors.customerPhn && (
                                            <p className="text-error text-sm mt-1">
                                                {errors.customerPhn.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* customerDistrict */}
                                    <div>
                                        <select
                                            {...register("customerDistrict", {
                                                required: "জেলা সিলেক্ট করুন",
                                            })}
                                            className={`select select-bordered w-full ${
                                                errors.customerDistrict
                                                    ? "select-error"
                                                    : ""
                                            }`}
                                        >
                                            <option value="">
                                                Select District *
                                            </option>
                                            {ALL_DISTRICTS.map((d) => (
                                                <option key={d}>{d}</option>
                                            ))}
                                        </select>
                                        {errors.customerDistrict && (
                                            <p className="text-error text-sm mt-1">
                                                {
                                                    errors.customerDistrict
                                                        .message
                                                }
                                            </p>
                                        )}
                                        {selectedDistrict && (
                                            <p className="text-sm text-gray-500 mt-1">
                                                {isInsideDhaka
                                                    ? "📍 Inside Dhaka — ৳70 delivery"
                                                    : "🚚 Outside Dhaka — ৳120 delivery"}
                                            </p>
                                        )}
                                    </div>

                                    {/* customerAddress */}
                                    <div>
                                        <input
                                            {...register("customerAddress", {
                                                required: "ঠিকানা লিখুন",
                                                minLength: {
                                                    value: 10,
                                                    message:
                                                        "সম্পূর্ণ ঠিকানা লিখুন",
                                                },
                                            })}
                                            placeholder="Full Address *"
                                            className={`input input-bordered w-full ${
                                                errors.customerAddress
                                                    ? "input-error"
                                                    : ""
                                            }`}
                                        />
                                        {errors.customerAddress && (
                                            <p className="text-error text-sm mt-1">
                                                {errors.customerAddress.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* customerEmail */}
                                    <div>
                                        <input
                                            {...register("customerEmail", {
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: "সঠিক ইমেইল দিন",
                                                },
                                            })}
                                            placeholder="Email (Optional)"
                                            className="input input-bordered w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ===== RIGHT: Order Summary ===== */}
                        <div>
                            <div className="card bg-neutral text-neutral-content shadow sticky top-20">
                                <div className="card-body">
                                    <h2 className="card-title">
                                        Order Summary
                                    </h2>

                                    <p>
                                        Subtotal:{" "}
                                        <span className="font-semibold">
                                            ৳{subtotal.toLocaleString()}
                                        </span>
                                    </p>
                                    <p>
                                        Delivery:{" "}
                                        <span className="font-semibold">
                                            ৳{deliveryCharge}
                                        </span>
                                    </p>

                                    {/* Coupon UI */}
                                    {!appliedCoupon && !showCouponInput && (
                                        <p
                                            onClick={() =>
                                                setShowCouponInput(true)
                                            }
                                            className="cursor-pointer text-blue-400 text-sm"
                                        >
                                            + Add Coupon
                                        </p>
                                    )}

                                    {showCouponInput && (
                                        <div className="flex flex-col gap-2">
                                            <input
                                                value={coupon}
                                                onChange={(e) =>
                                                    setCoupon(e.target.value)
                                                }
                                                placeholder="Coupon code"
                                                className="input input-bordered text-black"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleCouponApply}
                                                disabled={couponLoading}
                                                className="btn btn-primary btn-sm"
                                            >
                                                {couponLoading
                                                    ? "Checking..."
                                                    : "Apply"}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowCouponInput(false)
                                                }
                                                className="btn btn-ghost btn-sm"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}

                                    {discount > 0 && (
                                        <p className="text-green-400 text-sm">
                                            Discount: -৳
                                            {discount.toLocaleString()}
                                            <span className="ml-2 text-xs opacity-70">
                                                ({appliedCoupon})
                                            </span>
                                        </p>
                                    )}

                                    <div className="divider my-1" />

                                    <p className="text-xl font-bold">
                                        Total: ৳{total.toLocaleString()}
                                    </p>

                                    <button
                                        type="submit"
                                        disabled={
                                            isSubmitting ||
                                            products.length === 0
                                        }
                                        className="btn btn-primary w-full"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">
                                                <span className="loading loading-spinner loading-sm" />
                                                Placing...
                                            </span>
                                        ) : (
                                            "Place Order"
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
