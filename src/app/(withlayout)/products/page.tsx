"use client";
import ProductCard from "@/components/ProductCard/ProductCard";
import { useGetAllCategoryQuery } from "@/redux/api/categoriApi";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import React, { useState } from "react";

const Page = () => {
    const { data: productData, isLoading } = useGetAllProductsQuery({});
    const { data: categoryData, isLoading: isCategoryLoading } =
        useGetAllCategoryQuery({});

    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null,
    );

    const filteredProducts = productData?.filter((p: any) => {
        if (!selectedCategory) return true;
        return p.categories?.some(
            (c: any) => c.category?.id === selectedCategory,
        );
    });

    if (isLoading || isCategoryLoading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="flex flex-col items-center gap-3">
                    <span className="loading loading-spinner loading-lg text-stone-400"></span>
                    <p className="text-sm text-stone-400 tracking-wide">
                        Loading products...
                    </p>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-stone-50">
            {/* Top Header Bar */}
            <div className="bg-white border-b border-stone-200 px-4 md:px-8 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-semibold text-stone-800 tracking-tight">
                            Products
                        </h1>
                        <p className="text-sm text-stone-400 mt-0.5">
                            {filteredProducts?.length ?? 0} items
                            {selectedCategory && " in selected category"}
                        </p>
                    </div>
                    {selectedCategory && (
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className="text-xs text-stone-500 hover:text-stone-800 border border-stone-300 hover:border-stone-500 px-3 py-1.5 rounded-full transition-all duration-200"
                        >
                            Clear filter ✕
                        </button>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
                {/* ── Category Sidebar ── */}
                <aside className="w-full md:w-64  flex-shrink-0">
                    <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden sticky top-6">
                        <div className="px-4 py-3 border-b border-stone-100">
                            <span className="text-sm font-semibold text-stone-400 uppercase tracking-widest">
                                Categories
                            </span>
                        </div>

                        {/* "All" option */}
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={`w-full text-left px-4 py-3 text-lg font-medium transition-all duration-150 flex items-center justify-between group
                                ${
                                    !selectedCategory
                                        ? "bg-stone-800 text-white"
                                        : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                                }`}
                        >
                            <span>All Products</span>
                            {!selectedCategory && (
                                <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                            )}
                        </button>

                        {/* Category list */}
                        <div className="divide-y divide-stone-100">
                            {categoryData?.map((cat: any) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`w-full text-left px-4 py-3 text-lg transition-all duration-150 flex items-center justify-between group
                                        ${
                                            selectedCategory === cat.id
                                                ? "bg-stone-800 text-white font-medium"
                                                : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                                        }`}
                                >
                                    <span>{cat.name}</span>
                                    {selectedCategory === cat.id && (
                                        <span className="w-1.5 h-1.5 rounded-full bg-white/60"></span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </aside>

                {/* ── Product Grid ── */}
                <main className="flex-1 min-w-0">
                    {filteredProducts?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4">
                                <svg
                                    className="w-7 h-7 text-stone-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-stone-700 font-medium">
                                No products found
                            </h3>
                            <p className="text-stone-400 text-sm mt-1">
                                Try selecting a different category
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredProducts?.map((product: any) => (
                                <div
                                    key={product.id}
                                    className="transition-transform duration-200 hover:-translate-y-0.5"
                                >
                                    <ProductCard id={product.id} />
                                </div>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Page;
