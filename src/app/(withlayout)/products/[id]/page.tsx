"use client";
import PromotionalOffers from "@/components/HomeComponent/PromotionalOffer/PromoOffer";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface PageProps {
    params: {
        id: string;
    };
}

const Page = ({ params }: PageProps) => {
    const { data, isLoading } = useGetAllProductsQuery({});
    const [priceRange, setPriceRange] = useState<number>(0); // Default price range
    const [ratingFilter, setRatingFilter] = useState<number | null>(null); // Default rating filter

    // Get all products in the selected category
    const filteredProducts =
        data?.products?.filter(
            (product: any) => product.category === params.id,
        ) || [];

    // Calculate maximum price and set it to maxPrice + 10
    const maxPrice =
        filteredProducts.length > 0
            ? Math.max(
                  ...filteredProducts.map((product: any) => product.price),
              ) + 10
            : 10; // Default to 10 if no products are available

    // Set initial price range to maxPrice if it's greater than zero
    useEffect(() => {
        if (maxPrice > 0) {
            setPriceRange(maxPrice);
        }
    }, [maxPrice]);

    const displayedProducts = filteredProducts
        .filter((product: any) => product.price <= priceRange)
        .filter(
            (product: any) =>
                ratingFilter ? product.rating >= ratingFilter : true, // Apply rating filter if set
        );

    if (isLoading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="container mx-auto min-h-screen p-6 space-y-10">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
                Products in{" "}
                {params.id.charAt(0).toUpperCase() + params.id.slice(1)}{" "}
                Category
            </h1>

            <div className="flex gap-8">
                {/* Left Sidebar: Filters */}
                <div className="w-72 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">
                        Filters
                    </h2>

                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-700 mb-2">
                            Price Range
                        </h3>
                        <input
                            type="range"
                            min="0"
                            max={maxPrice}
                            step="1"
                            value={priceRange}
                            onChange={(e) =>
                                setPriceRange(Number(e.target.value))
                            }
                            className="range range-xs w-full mb-2"
                        />
                        <p className="text-gray-600">
                            Max Price: ${priceRange}
                        </p>
                    </div>

                    {/* Rating Filter */}
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-700 mb-2">
                            Minimum Rating
                        </h3>
                        <div className="flex flex-col space-y-2">
                            {[1, 2, 3, 4].map((rating) => (
                                <label
                                    key={rating}
                                    className="flex items-center text-gray-600"
                                >
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={rating}
                                        checked={ratingFilter === rating}
                                        onChange={() => setRatingFilter(rating)}
                                        className="mr-2"
                                    />
                                    <span>{rating} ⭐ & Up</span>
                                </label>
                            ))}
                            <label className="flex items-center text-gray-600">
                                <input
                                    type="radio"
                                    name="rating"
                                    value="all"
                                    checked={ratingFilter === null}
                                    onChange={() => setRatingFilter(null)}
                                    className="mr-2"
                                />
                                <span>Show All Ratings</span>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {displayedProducts.map((product: any) => (
                            <Link
                                href={`/product/${product.id}`}
                                key={product.id}
                                className="card bg-white shadow-xl rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                            >
                                <figure className="overflow-hidden relative">
                                    <Image
                                        width={300}
                                        height={300}
                                        src={product.thumbnail}
                                        alt={product.title}
                                        className="object-cover w-full h-48 transition-all duration-300 ease-in-out hover:scale-110"
                                    />
                                </figure>
                                <div className="card-body p-4">
                                    <h2 className="text-gray-800 text-lg font-semibold capitalize">
                                        {product.title}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {product.category}
                                    </p>
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
            </div>

            {/* Optional: Promotional Offers Section */}
            {/* <div className="pt-8">
        <PromotionalOffers />
      </div> */}
        </div>
    );
};

export default Page;
