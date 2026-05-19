"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaBoxOpen, FaHome } from "react-icons/fa";

const OrderSuccessPage = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");

    const [visible, setVisible] = useState(false);

    // ✅ Animation trigger
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 100);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="min-h-screen bg-base-200 flex justify-center px-4 py-16">
            <div
                className={`bg-white rounded-2xl shadow-xl p-10 max-w-md w-full text-center transition-all duration-700 ease-out ${
                    visible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                }`}
            >
                {/* ✅ Success Icon */}
                <div className="flex justify-center mb-6">
                    <FaCheckCircle className="text-green-500 text-7xl animate-bounce" />
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    অর্ডার সফল হয়েছে! 🎉
                </h1>
                <p className="text-gray-500 mb-6">
                    আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। আমরা শীঘ্রই আপনার
                    সাথে যোগাযোগ করব।
                </p>

                {/* ✅ Order ID */}
                {orderId && (
                    <div className="bg-gray-100 rounded-xl px-4 py-3 mb-8">
                        <p className="text-sm text-gray-500 mb-1">
                            অর্ডার আইডি
                        </p>
                        <p className="font-mono text-sm font-semibold text-gray-700 break-all">
                            {orderId}
                        </p>
                    </div>
                )}

                {/* ✅ Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link href="/" className="btn btn-outline gap-2 flex-1">
                        <FaHome />
                        হোমে যান
                    </Link>
                    <Link
                        href="/products"
                        className="btn btn-primary gap-2 flex-1"
                    >
                        <FaBoxOpen />
                        আরো কিনুন
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
