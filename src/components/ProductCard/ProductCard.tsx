"use client";
import { useGetProductByIdQuery } from "@/redux/api/productsApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type SizeType = {
    id: string;
    size: string;
    stock: number;
};

const ProductCard = ({ id }: { id: string }) => {
    const { data: product, isLoading } = useGetProductByIdQuery(id);

    if (isLoading)
        return (
            <div className="rounded-xl border border-stone-200 bg-white overflow-hidden animate-pulse">
                <div className="aspect-[4/5] w-full bg-stone-100" />
                <div className="p-3 space-y-2">
                    <div className="h-4 bg-stone-100 rounded w-3/4" />
                    <div className="h-4 bg-stone-100 rounded w-1/2" />
                    <div className="h-3 bg-stone-100 rounded w-1/3" />
                </div>
            </div>
        );

    const hasDiscount =
        product.discountPrice && product.discountPrice !== product.basePrice;

    const discountPercent = hasDiscount
        ? Math.round(
              ((product.basePrice - product.discountPrice) /
                  product.basePrice) *
                  100,
          )
        : null;

    return (
        <Link
            href={`/product/${product.id}`}
            className="group flex flex-col h-full rounded-xl border border-stone-200 bg-white overflow-hidden hover:border-stone-400 hover:shadow-md transition-all duration-200"
        >
            {/* ── Image ── */}
            <figure className="relative aspect-[4/5] w-full overflow-hidden bg-stone-50 flex-shrink-0">
                <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Discount badge */}
                {discountPercent && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                        -{discountPercent}%
                    </span>
                )}
            </figure>

            {/* ── Info ── */}
            {/* flex-1 দিয়ে নিচের অংশ সবসময় সমান height রাখা হচ্ছে */}
            <div className="flex flex-col flex-1 p-3 gap-2">
                {/* Title — সর্বোচ্চ ২ লাইন, বাকিটা ... */}
                <h2 className="text-sm md:text-base font-medium text-stone-800 capitalize leading-snug line-clamp-2 flex-1">
                    {product.title}
                </h2>

                {/* Price — সবসময় একই জায়গায় থাকবে */}
                <div className="flex items-center gap-2">
                    <span className="text-sm md:text-base font-bold text-stone-900">
                        ৳{product.discountPrice || product.basePrice}
                    </span>
                    {hasDiscount && (
                        <del className="text-xs text-stone-400">
                            ৳{product.basePrice}
                        </del>
                    )}
                </div>

                {/* Sizes */}
                <div className="flex flex-wrap gap-1">
                    {product.sizes.map((size: SizeType) => (
                        <span
                            key={size.id}
                            className={`px-2 py-0.5 border rounded text-xs font-medium
                                ${
                                    size.stock === 0
                                        ? "bg-red-50 text-red-400 border-red-200 line-through opacity-60"
                                        : "bg-stone-50 text-stone-600 border-stone-200"
                                }`}
                        >
                            {size.size}
                        </span>
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
