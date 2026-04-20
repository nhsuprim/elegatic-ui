"use client";
import { useGetAllCategoryQuery } from "@/redux/api/categoriApi";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import Link from "next/link";
import React, { useState } from "react";

const Categories = () => {
    const { data, isLoading } = useGetAllCategoryQuery({});

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Extract unique categories
    const uniqueCategories = data
        ? [...new Set(data?.map((c: any) => c.name))]
        : [];

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="relative">
            {isLoading ? (
                "Loading..."
            ) : (
                <div className="relative">
                    <button
                        onClick={toggleDropdown}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Browse Categories
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute z-50 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg max-h-72 overflow-y-auto">
                            {uniqueCategories.map((category: any) => (
                                <div
                                    key={category}
                                    className="px-4 py-2 hover:bg-gray-100"
                                >
                                    <Link
                                        href={`/products/${category}`}
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        {category}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Categories;
