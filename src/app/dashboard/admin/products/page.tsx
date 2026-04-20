"use client";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import Link from "next/link";
import React, { useState } from "react";

const page = () => {
    const { data: productData, isLoading } = useGetAllProductsQuery({});
    const [seacrchProduct, setSearchProduct] = useState<string | null>(null);
    // console.log("seacrchProduct", seacrchProduct);

    const filteredProducts = productData?.filter((product: any) => {
        const titleMatch = product.title
            .toLowerCase()
            .includes(seacrchProduct?.toLowerCase() || "");
        const categoryMatch = product.categories.some((cat: any) =>
            cat.category.name
                .toLowerCase()
                .includes(seacrchProduct?.toLowerCase() || ""),
        );
        return titleMatch || categoryMatch;
    });
    if (isLoading)
        return (
            <div className="flex justify-center items-center h-full">
                <LoadingSpinner size="xl" color="border-gray-500" />
            </div>
        );

    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-6">Products</h1>
                <div>
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="input input-bordered w-full max-w-xs"
                        value={seacrchProduct || ""}
                        onChange={(e) => setSearchProduct(e.target.value)}
                    />
                </div>
                <div className="flex justify-end mb-4">
                    <Link
                        href="/dashboard/admin/products/add"
                        className="inline-block bg-blue-900 text-white px-4 py-2 font-semibold rounded-lg hover:bg-blue-950 transition"
                    >
                        Add New Product
                    </Link>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Categories</th>
                            <th>Sizes</th>
                            <th>Featured</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts?.map(
                            (product: any, index: number) => (
                                <tr key={product.id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <img
                                            src={product.images[0]} // Assuming the first image is the main one
                                            alt={product.title}
                                            className="w-10 h-10 object-cover rounded-md"
                                        />
                                    </td>
                                    <td>{product.title}</td>
                                    <td>${product.basePrice}</td>
                                    <td>
                                        {product.categories
                                            .map(
                                                (cat: any) => cat.category.name,
                                            )
                                            .join(", ")}
                                    </td>
                                    <td>
                                        {product.sizes.map((size: any) => (
                                            <span
                                                key={size.id}
                                                className={`px-2 py-1 border rounded text-sm ${
                                                    size.stock === 0
                                                        ? "bg-red-100 text-red-500 border-red-300 opacity-70"
                                                        : "bg-white text-black"
                                                }`}
                                            >
                                                {size.size}
                                                {size.stock === 0 &&
                                                    " (Stock Out)"}
                                            </span>
                                        ))}
                                    </td>
                                    <td>{product.featured ? "Yes" : "No"}</td>
                                    <td>
                                        <Link
                                            href={`/dashboard/admin/products/${product.id}`}
                                            className=" bg-blue-900  hover:bg-blue-950 text-white px-3 py-2 font-semibold cursor-pointer rounded-md "
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ),
                        )}
                    </tbody>
                </table>
                <h1 className="mt-4 text-center text-gray-400 italic text-lg font-semibold ">
                    {filteredProducts?.length || 0} Products Found
                </h1>
            </div>
        </div>
    );
};

export default page;
