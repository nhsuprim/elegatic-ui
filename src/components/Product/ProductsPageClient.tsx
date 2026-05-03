"use client";
import ProductCard from "@/components/ProductCard/ProductCard";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { HiOutlineFilter } from "react-icons/hi";

interface PageProps {
    params: { id: string };
}

const ProductsPageClient = ({ params }: PageProps) => {
    const { data, isLoading } = useGetAllProductsQuery({});
    const router = useRouter();

    const [priceRange, setPriceRange] = useState<number>(0);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const products = data || [];
    const activeCategory = decodeURIComponent(params.id);

    const categories = useMemo(() => {
        const allCats: string[] = [];
        products.forEach((product: any) => {
            product.categories?.forEach((cat: any) => {
                if (cat.category?.name) allCats.push(cat.category.name);
            });
        });
        return [...new Set(allCats)];
    }, [products]);

    const filteredProducts = useMemo(() => {
        if (activeCategory === "all") return products;
        return products.filter((product: any) =>
            product.categories?.some(
                (cat: any) =>
                    cat.category?.name?.toLowerCase() ===
                    activeCategory.toLowerCase(),
            ),
        );
    }, [products, activeCategory]);

    const maxPrice = useMemo(() => {
        if (filteredProducts.length === 0) return 0;
        return Math.max(...filteredProducts.map((p: any) => p.discountPrice));
    }, [filteredProducts]);

    useEffect(() => {
        setPriceRange(maxPrice);
    }, [maxPrice, activeCategory]);

    const displayedProducts = filteredProducts.filter(
        (product: any) => product.discountPrice <= priceRange,
    );

    const handleCategory = (cat: string) => {
        router.push(`/products/${encodeURIComponent(cat)}`);
        setSidebarOpen(false);
    };

    if (isLoading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="min-h-screen p-4 md:p-6 py-8 md:py-10 bg-slate-50 space-y-6 md:space-y-10">
            <h1 className="text-2xl md:text-4xl font-extrabold text-center mb-6 md:mb-10 relative">
                <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                    {activeCategory === "all"
                        ? "All Products"
                        : activeCategory.toUpperCase()}
                </span>
                <span className="block w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-3 rounded-full shadow-md"></span>
            </h1>

            {/* Mobile Filter Toggle */}
            <div className="md:hidden flex justify-between items-center">
                <p className="text-sm text-gray-500">
                    {displayedProducts.length} টি product পাওয়া গেছে
                </p>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                    <HiOutlineFilter className="h-4 w-4" />
                    {sidebarOpen ? "Close Filter" : "Filter"}
                </button>
            </div>

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <div className="md:hidden bg-white shadow-lg rounded-lg p-5 space-y-5 border border-gray-100">
                    <div>
                        <h2 className="font-semibold mb-2">Price Range</h2>
                        <input
                            type="range"
                            min="0"
                            max={maxPrice}
                            value={priceRange}
                            onChange={(e) =>
                                setPriceRange(Number(e.target.value))
                            }
                            className="range range-xs w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                            <span>৳0</span>
                            <span>৳{maxPrice}</span>
                        </div>
                        <p className="mt-2 text-gray-600 font-medium">
                            Max: ৳{priceRange}
                        </p>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-3">Categories</h2>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleCategory("all")}
                                className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${
                                    activeCategory === "all"
                                        ? "bg-black text-white border-black"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                }`}
                            >
                                All
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => handleCategory(cat)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium border transition ${
                                        activeCategory === cat
                                            ? "bg-black text-white border-black"
                                            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="flex gap-6 lg:gap-8">
                {/* Desktop Sidebar */}
                <div className="hidden md:block w-1/4 lg:w-1/5 bg-white shadow-lg rounded-lg p-6 space-y-6 sticky top-12 self-start h-fit">
                    <div>
                        <h2 className="font-semibold mb-2">Price Range</h2>
                        <input
                            type="range"
                            min="0"
                            max={maxPrice}
                            value={priceRange}
                            onChange={(e) =>
                                setPriceRange(Number(e.target.value))
                            }
                            className="range range-xs w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500 mt-1">
                            <span>৳0</span>
                            <span>৳{maxPrice}</span>
                        </div>
                        <p className="mt-2 text-gray-600 font-medium">
                            Max: ৳{priceRange}
                        </p>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-3">Categories</h2>
                        <button
                            onClick={() => handleCategory("all")}
                            className={`block w-full text-left p-2 rounded transition ${
                                activeCategory === "all"
                                    ? "bg-black text-white"
                                    : "hover:bg-gray-100"
                            }`}
                        >
                            All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategory(cat)}
                                className={`block w-full text-left p-2 rounded mt-1 transition ${
                                    activeCategory === cat
                                        ? "bg-black text-white"
                                        : "hover:bg-gray-100"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="w-full md:w-3/4 lg:w-4/5">
                    <p className="hidden md:block text-sm text-gray-500 mb-4">
                        {displayedProducts.length} টি product পাওয়া গেছে
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                        {displayedProducts.length > 0 ? (
                            displayedProducts.map((product: any) => (
                                <Link
                                    href={`/product/${product.id}`}
                                    key={product.id}
                                >
                                    <ProductCard id={product.id} />
                                </Link>
                            ))
                        ) : (
                            <p className="col-span-full text-center text-gray-500 py-10">
                                No products found
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPageClient;
