"use client";

import { useGetProductByIdQuery } from "@/redux/api/productsApi";
import React, { useState } from "react";
import ImageSider2 from "@/components/ImageSlider/imageSlider2";
import { useAppDispatch } from "@/redux/hooks";
import { addProductToCart } from "@/redux/feature/cart/cartSlice";
import { toast } from "react-toastify";
import { useGetAllCategoryQuery } from "@/redux/api/categoriApi";
import Image from "next/image";

interface PageProps {
    params: { id: string };
}

type SizeType = {
    id: string;
    size: string;
    stock: number;
};

const ProductPage = ({ params }: PageProps) => {
    const { data: product, isLoading } = useGetProductByIdQuery(params.id);
    const { data: categoryData, isLoading: isCategoryLoading } =
        useGetAllCategoryQuery({});
    const dispatch = useAppDispatch();
    const [selectedSize, setSelectedSize] = useState<SizeType | null>(null);

    // ── Loading ──
    if (isLoading || isCategoryLoading) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <span className="loading loading-spinner loading-lg text-stone-400" />
                    <p className="text-sm text-stone-400 tracking-wide">
                        Loading product...
                    </p>
                </div>
            </div>
        );
    }

    // ── Not found ──
    if (!product) {
        return (
            <div className="min-h-screen bg-stone-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-stone-500 text-lg font-medium">
                        Product not found
                    </p>
                    <p className="text-stone-400 text-sm mt-1">
                        The item you're looking for doesn't exist.
                    </p>
                </div>
            </div>
        );
    }

    const category = categoryData?.find((cat: any) =>
        product.categories?.some((pCat: any) => pCat.category?.id === cat.id),
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

    const handleCart = () => {
        if (!selectedSize) {
            toast.error("Please select a size before adding to cart.", {
                position: "bottom-right",
            });
            return;
        }
        dispatch(addProductToCart({ ...product, size: selectedSize.size }));
        toast.success("Added to cart!", {
            position: "bottom-right",
            autoClose: 2500,
        });
    };

    return (
        <div className="min-h-screen bg-base-200 py-10 px-4">
            {/* ── Breadcrumb ── */}
            <div className=" border-b ">
                <div className="max-w-6xl mx-auto px-4 md:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm font-semibold italic text-stone-400">
                        <span>Home</span>
                        <span>/</span>
                        <span>{category?.name ?? "Products"}</span>
                        <span>/</span>
                        <span className="text-stone-700  line-clamp-1">
                            {product.title}
                        </span>
                    </nav>
                </div>
            </div>

            {/* ── Main Content ── */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 rounded-2xl overflow-hidden bg-white border border-stone-200">
                <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
                    {/* ── Left: Image Slider ── */}
                    <div className="w-full lg:w-[52%] flex-shrink-0">
                        <div className="rounded-2xl overflow-hidden">
                            <ImageSider2 product={product} />
                        </div>
                    </div>

                    {/* ── Right: Product Info ── */}
                    <div className="flex-1 flex flex-col gap-5">
                        {/* Title & Brand */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                {discountPercent && (
                                    <span className="bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                        -{discountPercent}% OFF
                                    </span>
                                )}
                                {product.featured && (
                                    <span className="bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                        Featured
                                    </span>
                                )}
                            </div>
                            <h1 className="text-2xl md:text-3xl font-semibold text-stone-900 leading-snug">
                                {product.title}
                            </h1>
                            <p className="text-sm text-stone-400 mt-1">
                                Brand:{" "}
                                <span className="text-stone-600 font-medium">
                                    {product.brand}
                                </span>
                                {product.color && (
                                    <>
                                        {" · "}Color:{" "}
                                        <span className="text-stone-600 font-medium">
                                            {product.color}
                                        </span>
                                    </>
                                )}
                            </p>
                        </div>

                        {/* Price */}
                        <div className="bg-white rounded-xl border border-stone-200 px-4 py-4">
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-bold text-stone-900">
                                    ৳
                                    {product.discountPrice ?? product.basePrice}
                                </span>
                                {hasDiscount && (
                                    <del className="text-lg text-stone-400 font-normal">
                                        ৳{product.basePrice}
                                    </del>
                                )}
                            </div>
                            {hasDiscount && (
                                <p className="text-green-600 text-sm font-medium mt-1">
                                    You save ৳
                                    {product.basePrice - product.discountPrice}
                                </p>
                            )}
                        </div>

                        <div className="border-t border-stone-200" />

                        {/* Size Selector */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-semibold text-stone-700 uppercase tracking-wider">
                                    Select Size
                                </span>
                                {selectedSize && (
                                    <span className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
                                        Selected:{" "}
                                        <strong>{selectedSize.size}</strong>
                                    </span>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {product.sizes.map((size: SizeType) => {
                                    const isSelected =
                                        selectedSize?.id === size.id;
                                    const isOut = size.stock === 0;
                                    return (
                                        <button
                                            key={size.id}
                                            onClick={() =>
                                                !isOut && setSelectedSize(size)
                                            }
                                            disabled={isOut}
                                            className={`
                                                w-14 h-11 rounded-lg border text-sm font-medium transition-all duration-150
                                                ${
                                                    isOut
                                                        ? "border-stone-200 text-stone-300 bg-stone-50 cursor-not-allowed line-through"
                                                        : isSelected
                                                          ? "border-stone-900 bg-stone-900 text-white"
                                                          : "border-stone-300 bg-white text-stone-700 hover:border-stone-900"
                                                }
                                            `}
                                        >
                                            {size.size}
                                        </button>
                                    );
                                })}
                            </div>
                            <p className="text-xs text-stone-400 mt-2">
                                Strikethrough sizes are out of stock
                            </p>
                        </div>

                        {/* Add to Cart */}
                        <div className="flex flex-col sm:flex-row gap-3 mt-2">
                            <button
                                onClick={handleCart}
                                className={`
                                    flex-1 py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200
                                    ${
                                        selectedSize
                                            ? "bg-stone-900 text-white hover:bg-stone-700 active:scale-[0.98]"
                                            : "bg-stone-200 text-stone-400 cursor-not-allowed"
                                    }
                                `}
                            >
                                {selectedSize
                                    ? "Add to Cart"
                                    : "Select a Size First"}
                            </button>
                        </div>
                        {/* Size Chart */}
                        {category?.sizeChart && (
                            <div>
                                <p className="text-sm font-semibold text-stone-700 uppercase tracking-wider mb-2">
                                    Size Chart
                                </p>
                                <div className="rounded-xl overflow-hidden border border-stone-200 inline-block">
                                    <Image
                                        src={category.sizeChart}
                                        height={300}
                                        width={400}
                                        alt="Size chart"
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="w-full md:flex justify-center items-center px-8">
                {/* Description */}
                <div className="md:w-1/2">
                    <p className="text-stone-500 text-sm leading-relaxed">
                        {product.description}
                    </p>
                </div>

                {/* Trust badges */}
                <div className="md:w-1/2 grid grid-cols-3 gap-2 pt-1">
                    {[
                        { icon: "🔄", label: "Easy Returns" },
                        { icon: "✅", label: "100% Authentic" },
                        { icon: "🚚", label: "Fast Delivery" },
                    ].map((badge) => (
                        <div
                            key={badge.label}
                            className="flex flex-col items-center gap-1 py-3 rounded-xl bg-stone-100 text-center"
                        >
                            <span className="text-base">{badge.icon}</span>
                            <span className="text-xs text-stone-500 font-medium">
                                {badge.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
