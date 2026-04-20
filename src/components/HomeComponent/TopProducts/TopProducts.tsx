import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopProducts = () => {
    const { data, isLoading } = useGetAllProductsQuery({});
    // console.log(data);
    const filteredProducts = data?.products?.filter(
        (p: any) => p.rating >= 4.9
    );
    if (isLoading)
        return (
            <div className="flex justify-center my-8 ">
                <p className="text-xl">Loading products...</p>
            </div>
        );

    return (
        <div className="my-12">
            <h1 className="text-xl font-semibold">Top Products</h1>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-6 my-10">
                {filteredProducts?.map((product: any) => (
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

export default TopProducts;
