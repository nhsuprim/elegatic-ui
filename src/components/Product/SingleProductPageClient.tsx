"use client";

import {
    useGetAllProductsQuery,
    useGetProductByIdQuery,
} from "@/redux/api/productsApi";
import React, { useState } from "react";
import ImageSider2 from "@/components/ImageSlider/imageSlider2";
import { useAppDispatch } from "@/redux/hooks";
import { addProductToCart } from "@/redux/feature/cart/cartSlice";
import { toast } from "react-toastify";
import { useGetAllCategoryQuery } from "@/redux/api/categoriApi";
import Image from "next/image";
import {
    FaBolt,
    FaFacebookMessenger,
    FaLock,
    FaShieldAlt,
    FaUndoAlt,
    FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";
import FeaturedCarousel from "@/components/HomeComponent/FeaturedProduct/FeaturedCarousel";
import ProductDescription from "@/components/ProductDesc/ProductDesc";
import { BreadcrumbJsonLd, ProductJsonLd } from "../SEO/JsonLd";
import "animate.css";

interface PageProps {
    params: { id: string };
}

type SizeType = {
    id: string;
    size: string;
    stock: number;
};

const ProductPageClient = ({ params }: PageProps) => {
    const { data: product, isLoading } = useGetProductByIdQuery(params.id);
    const { data: products } = useGetAllProductsQuery({});
    const { data: categoryData, isLoading: isCategoryLoading } =
        useGetAllCategoryQuery({});
    const dispatch = useAppDispatch();
    const [selectedSize, setSelectedSize] = useState<SizeType | null>(null);

    const trustBadges = [
        {
            icon: <FaShieldAlt className="text-emerald-600 " />,
            iconBg: "bg-emerald-50",
            label: "100% Authentic",
            sub: "Verified original",
        },
        {
            icon: <FaLock className="text-blue-600 " />,
            iconBg: "bg-blue-50",
            label: "Secure Payment",
            sub: "Encrypted checkout",
        },
        {
            icon: <FaBolt className="text-amber-600 " />,
            iconBg: "bg-amber-50",
            label: "Fast Delivery",
            sub: "2–4 business days",
        },
        {
            icon: <FaUndoAlt className="text-emerald-600 " />,
            iconBg: "bg-emerald-50",
            label: "Easy Returns",
            sub: "7-day hassle-free",
        },
    ];

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

    const extraProduct = products?.filter((p: any) =>
        p.categories?.some(
            (cat: any) =>
                cat.category?.name?.toLowerCase() ===
                category?.name?.toLowerCase(),
        ),
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

    const productUrl = `${process.env.NEXT_PUBLIC_UI_URL}/product/${params.id}`;
    const message = `আমি এই product টি অর্ডার করতে চাই:\n🛍️ ${product.title}\n🔗 Link: ${productUrl}`;
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUM}?text=${encodeURIComponent(message)}`;
    const messengerUrl = `https://m.me/${process.env.NEXT_PUBLIC_FB_PAGE_USERNAME}?text=${encodeURIComponent(message)}`;

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
        <div className="min-h-screen bg-base-200 px-2 py-14 md:py-6">
            {/* Breadcrumb */}
            <ProductJsonLd product={product} />
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: `${process.env.NEXT_PUBLIC_UI_URL}` },
                    {
                        name: category?.name ?? "Products",
                        url: `${process.env.NEXT_PUBLIC_UI_URL}/products/all`,
                    },
                    {
                        name: product.title,
                        url: `${process.env.NEXT_PUBLIC_UI_URL}/product/${params.id}`,
                    },
                ]}
            />
            <div className="border-b">
                <div className="max-w-7xl mx-auto px-4 md:px-2 py-3">
                    <nav className="flex items-center gap-2 text-sm font-semibold italic text-stone-400">
                        <span>Home</span>
                        <span>/</span>
                        <span>{category?.name ?? "Products"}</span>
                        <span>/</span>
                        <span className="text-stone-700 line-clamp-1">
                            {product.title}
                        </span>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 rounded-2xl overflow-hidden bg-white border border-stone-200">
                <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
                    {/* Left: Image Slider */}
                    <div className="w-full lg:w-[52%] flex-shrink-0">
                        <div className="rounded-2xl overflow-hidden">
                            <ImageSider2 product={product} />
                        </div>
                    </div>

                    {/* Right: Product Info */}
                    <div className="flex-1 flex flex-col gap-5">
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
                                            : "bg-stone-200 text-stone-700 font-semibold cursor-not-allowed"
                                    }
                                `}
                            >
                                {selectedSize
                                    ? "Add to Cart"
                                    : "সাইজ সিলেক্ট করুন"}
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

                        {/* Messenger & WhatsApp */}
                        <div className="w-full text-white text-center text-lg rounded-lg font-semibold">
                            <Link
                                href={messengerUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="bg-blue-600 py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-700 transition-colors mb-4">
                                    <span className="text-2xl">
                                        <FaFacebookMessenger />
                                    </span>
                                    Messenger এ অর্ডার করুন
                                </div>
                            </Link>
                            <Link
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="bg-green-600 py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-green-700 transition-colors">
                                    <span className="text-2xl">
                                        <FaWhatsapp />
                                    </span>
                                    WhatsApp এ অর্ডার করুন
                                </div>
                            </Link>
                        </div>
                        <div className="p-2 my-2 text-center text-sm md:text-lg bg-orange-400 text-white font-semibold italic rounded-lg animate__animated animate__backInRight animate__slow">
                            <h1>
                                অর্ডার করার ২-৩ দিনের মধ্যে পণ্য ডেলিভারি
                                সম্পন্ন করা হয়।
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            {/* Description & Trust Badges */}
            <div className="max-w-7xl mx-auto mt-8">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-5">
                    <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 pb-4 border-b border-gray-100">
                        Product Description
                    </h2>
                    <ProductDescription text={product?.description} />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-2">
                    {trustBadges.map((badge) => (
                        <div
                            key={badge.label}
                            className="flex flex-col items-center text-center gap-3 bg-white border border-gray-100 shadow-sm rounded-2xl px-1 md:px-4 py-1 md:py-6 text-sm md:text-base"
                        >
                            <div
                                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-sm md:text-3xl ${badge.iconBg}`}
                            >
                                {badge.icon}
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800 leading-tight">
                                    {badge.label}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {badge.sub}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Related & New Arrival */}
            <div className="max-w-7xl mx-auto ">
                <div className="my-8">
                    <div className="flex justify-between items-center mx-2 py-4">
                        <h1 className="text-3xl font-bold">
                            You may also like
                        </h1>
                        <Link href="/products">
                            <span className="text-md font-semibold text-white bg-blue-950 hover:bg-blue-900 px-3 py-1 rounded-lg">
                                view all
                            </span>
                        </Link>
                    </div>
                    <FeaturedCarousel products={extraProduct || []} />
                </div>
                <div className="my-8">
                    <div className="flex justify-between items-center mx-2 py-4">
                        <h1 className="text-3xl font-bold">New Arrival</h1>
                        <Link href="/products">
                            <span className="text-md font-semibold text-white bg-blue-950 hover:bg-blue-900 px-3 py-1 rounded-lg">
                                view all
                            </span>
                        </Link>
                    </div>
                    <FeaturedCarousel products={products || []} />
                </div>
            </div>
        </div>
    );
};

export default ProductPageClient;
