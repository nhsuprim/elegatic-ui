"use client";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { useGetProductByIdQuery } from "@/redux/api/productsApi";
import React, { useEffect, useState } from "react";

const Page = ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const { data: productData, isLoading } = useGetProductByIdQuery(id);

    const [formData, setFormData] = useState<any>(null);

    // ✅ Set initial data
    useEffect(() => {
        if (productData) {
            setFormData({
                title: productData.title,
                description: productData.description,
                basePrice: productData.basePrice,
                discountPrice: productData.discountPrice,
                brand: productData.brand,
                color: productData.color,
                sizes: productData.sizes || [],
                categories: productData.categories || [],
            });
        }
    }, [productData]);

    // ✅ Input change handler
    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // ✅ Size change handler
    const handleSizeChange = (index: number, field: string, value: any) => {
        const updatedSizes = [...formData.sizes];
        updatedSizes[index][field] = value;

        setFormData({
            ...formData,
            sizes: updatedSizes,
        });
    };

    // ✅ Submit handler
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const res = await fetch(
                `http://localhost:8000/api/v1/product/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                },
            );

            const result = await res.json();
            console.log("Updated:", result);
            alert("Product updated সফল হয়েছে ✅");
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading || !formData)
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner size="xl" color="border-gray-500" />
            </div>
        );

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    placeholder="Title"
                />

                {/* Description */}
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="textarea textarea-bordered w-full"
                />

                {/* Price */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="number"
                        name="basePrice"
                        value={formData.basePrice}
                        onChange={handleChange}
                        className="input input-bordered"
                        placeholder="Base Price"
                    />
                    <input
                        type="number"
                        name="discountPrice"
                        value={formData.discountPrice}
                        onChange={handleChange}
                        className="input input-bordered"
                        placeholder="Discount Price"
                    />
                </div>

                {/* Brand + Color */}
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="input input-bordered"
                        placeholder="Brand"
                    />
                    <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="input input-bordered"
                        placeholder="Color"
                    />
                </div>

                {/* Sizes */}
                <div>
                    <h2 className="font-semibold mb-2">Sizes</h2>
                    {formData.sizes.map((size: any, index: number) => (
                        <div key={size.id} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={size.size}
                                onChange={(e) =>
                                    handleSizeChange(
                                        index,
                                        "size",
                                        e.target.value,
                                    )
                                }
                                className="input input-bordered w-1/2"
                            />
                            <input
                                type="number"
                                value={size.stock}
                                onChange={(e) =>
                                    handleSizeChange(
                                        index,
                                        "stock",
                                        e.target.value,
                                    )
                                }
                                className="input input-bordered w-1/2"
                            />
                        </div>
                    ))}
                </div>

                {/* Categories */}
                <div>
                    <h2 className="font-semibold mb-2">Categories</h2>
                    <p className="text-gray-600">
                        {formData.categories
                            .map((cat: any) => cat.category.name)
                            .join(", ")}
                    </p>
                </div>

                {/* Submit */}
                <button className="btn btn-primary w-full">
                    Update Product
                </button>
            </form>
        </div>
    );
};

export default Page;
