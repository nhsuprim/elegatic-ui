"use client";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BsEar } from "react-icons/bs";

const TopCategories = () => {
    const { data, isLoading } = useGetAllProductsQuery({});
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("beauty");

    // Set default category products ("beauty") when data is loaded
    useEffect(() => {
        if (data) {
            const defaultProducts = data.products.filter(
                (product: any) => product.category.toLowerCase() === "beauty"
            );
            setFilteredProducts(defaultProducts);
        }
    }, [data]);

    const handleClick = (category: string) => {
        setSelectedCategory(category); // Update selected category
        const filteredProducts =
            data?.products?.filter((product: any) =>
                product.category.toLowerCase().includes(category.toLowerCase())
            ) || [];
        setFilteredProducts(filteredProducts);
    };

    if (isLoading)
        return (
            <div className="flex justify-center my-8 ">
                <p className="text-xl">Loading products...</p>
            </div>
        );

    return (
        <div className="my-8">
            <div className="flex justify-between pb-14">
                <h1 className="text-xl font-semibold">Featured Categories</h1>
                <div className="flex gap-6 cursor-pointer text-lg font-mono text-gray-500 uppercase">
                    {[
                        "beauty",
                        "sunglasses",
                        "mens",
                        "womens",
                        "smartphones",
                        "groceries",
                        "laptops",
                    ].map((category) => (
                        <h1
                            key={category}
                            onClick={() => handleClick(category)}
                            className={`${
                                selectedCategory === category
                                    ? "text-blue-600 font-bold border-b-2 border-blue-600"
                                    : "text-gray-500"
                            } transition-colors duration-200`}
                        >
                            {category.charAt(0).toUpperCase() +
                                category.slice(1)}
                        </h1>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6">
                {filteredProducts.map((product: any) => (
                    <Link
                        href={`/product/${product.id}`}
                        key={product.id}
                        className="card bg-base-100 shadow-lg transition-transform transform hover:scale-105"
                    >
                        <figure className="overflow-hidden">
                            <Image
                                width={300}
                                height={300}
                                src={product.thumbnail}
                                alt={product.title}
                                className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                            />
                        </figure>
                        <div className="card-body p-4">
                            <h2 className="text-gray-700 text-lg font-semibold capitalize">
                                {product.title}
                            </h2>
                            <p className="text-gray-500">{product.category}</p>
                            <p className="text-sm text-gray-600">
                                {product.rating} ⭐
                            </p>
                            <div className="flex justify-between items-center mt-4">
                                <p className="text-lg font-bold text-green-600">
                                    ${product.price}
                                </p>
                                {product.discountPercentage > 0 && (
                                    <span className="text-red-500 font-semibold">
                                        -{product.discountPercentage}%
                                    </span>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TopCategories;
