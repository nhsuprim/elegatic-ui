"use client";

import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import Select, { MultiValue } from "react-select";
import { useGetAllCategoryQuery } from "@/redux/api/categoriApi";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";

// ✅ Types
type Size = {
    size: string;
    stock: number;
};

type ProductForm = {
    title: string;
    description: string;
    basePrice: number | "";
    discountPrice: number | "";
    brand: string;
    color: string;
    featured: boolean;
    categories: string[];
};

type CategoryOption = {
    value: string;
    label: string;
};

const Page: React.FC = () => {
    const { data: categoryData, isLoading } = useGetAllCategoryQuery({});

    const [form, setForm] = useState<ProductForm>({
        title: "",
        description: "",
        basePrice: "",
        discountPrice: "",
        brand: "",
        color: "",
        featured: false,
        categories: [],
    });

    const [sizes, setSizes] = useState<Size[]>([{ size: "M", stock: 0 }]);
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    // ✅ Category options
    const categoryOptions: CategoryOption[] =
        categoryData?.map((cat: any) => ({
            value: cat.id,
            label: cat.name,
        })) || [];

    // ✅ Handle input changes
    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // ✅ Handle sizes
    const handleSizeChange = (
        index: number,
        field: keyof Size,
        value: string,
    ) => {
        const updated = [...sizes];
        if (field === "stock") {
            updated[index][field] = Number(value) || 0; // always default to 0
        } else {
            updated[index][field] = value;
        }
        setSizes(updated);
    };

    const addSize = () => {
        setSizes([...sizes, { size: "", stock: 0 }]);
    };

    const removeSize = (index: number) => {
        setSizes(sizes.filter((_, i) => i !== index));
    };

    // ✅ Handle image upload
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImages((prev) => [...prev, ...files]);

        const previews = files.map((file) => URL.createObjectURL(file));
        setPreviewImages((prev) => [...prev, ...previews]);
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
        setPreviewImages(previewImages.filter((_, i) => i !== index));
    };

    // ✅ Handle submit
    const handleSubmit = async () => {
        try {
            if (!form.title || images.length === 0) {
                toast.error("Title & Image are required");
                return;
            }

            const formData = new FormData();

            const productData = {
                ...form,
                basePrice: Number(form.basePrice),
                discountPrice: Number(form.discountPrice),
                sizes,
            };

            formData.append("data", JSON.stringify(productData));
            images.forEach((img) => formData.append("files", img));

            const res = await fetch("http://localhost:8000/api/v1/product", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                toast.success("✅ Product created successfully");
                // reset form
                setForm({
                    title: "",
                    description: "",
                    basePrice: "",
                    discountPrice: "",
                    brand: "",
                    color: "",
                    featured: false,
                    categories: [],
                });
                setSizes([{ size: "M", stock: 0 }]);
                setImages([]);
                setPreviewImages([]);
            } else {
                toast.error("❌ Failed to create product");
            }
        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner size="xl" color="border-gray-500" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                Add Product
            </h1>

            {/* Inputs */}
            <div className="grid grid-cols-2 gap-4">
                <input
                    name="title"
                    placeholder="Title"
                    className="input input-bordered w-full"
                    value={form.title}
                    onChange={handleChange}
                />
                <input
                    name="brand"
                    placeholder="Brand"
                    className="input input-bordered w-full"
                    value={form.brand}
                    onChange={handleChange}
                />
                <input
                    name="basePrice"
                    placeholder="Base Price"
                    type="number"
                    className="input input-bordered w-full"
                    value={form.basePrice}
                    onChange={handleChange}
                />
                <input
                    name="discountPrice"
                    placeholder="Discount Price"
                    type="number"
                    className="input input-bordered w-full"
                    value={form.discountPrice}
                    onChange={handleChange}
                />
                <input
                    name="color"
                    placeholder="Color"
                    className="input input-bordered w-full"
                    value={form.color}
                    onChange={handleChange}
                />
            </div>

            <textarea
                name="description"
                placeholder="Description"
                className="textarea textarea-bordered w-full mt-4"
                value={form.description}
                onChange={handleChange}
            />

            {/* Featured */}
            <div className="mt-4 flex items-center gap-2">
                <input
                    type="checkbox"
                    name="featured"
                    checked={form.featured}
                    onChange={handleChange}
                    className="checkbox checkbox-primary"
                />
                <label className="font-medium text-gray-700">
                    Featured Product
                </label>
            </div>

            {/* Categories */}
            <div className="mt-4">
                <label className="font-semibold mb-2 block text-gray-700">
                    Select Categories
                </label>
                <Select
                    options={categoryOptions}
                    isMulti
                    value={categoryOptions.filter((opt) =>
                        form.categories.includes(opt.value),
                    )}
                    onChange={(selected: MultiValue<CategoryOption>) => {
                        const values = selected.map((item) => item.value);
                        setForm({ ...form, categories: values });
                    }}
                    className="text-black"
                />
            </div>

            {/* Sizes */}
            <div className="mt-6">
                <h2 className="font-bold mb-2 text-gray-800">Sizes</h2>
                {sizes.map((s, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                        <input
                            placeholder="Size"
                            value={s.size}
                            onChange={(e) =>
                                handleSizeChange(index, "size", e.target.value)
                            }
                            className="input input-bordered w-1/2"
                        />
                        <input
                            type="number"
                            placeholder="Stock"
                            value={s.stock}
                            onChange={(e) =>
                                handleSizeChange(index, "stock", e.target.value)
                            }
                            className="input input-bordered w-1/2"
                        />
                        <button
                            onClick={() => removeSize(index)}
                            className="btn btn-error btn-square"
                        >
                            <MdDelete size={20} />
                        </button>
                    </div>
                ))}
                <button onClick={addSize} className="btn btn-sm btn-primary">
                    + Add Size
                </button>
            </div>

            {/* Images */}
            <div className="mt-6">
                <input
                    type="file"
                    multiple
                    className="file-input w-full"
                    onChange={handleImageChange}
                />
                <div className="flex gap-4 mt-4 flex-wrap">
                    {previewImages.map((img, i) => (
                        <div
                            key={i}
                            className="relative w-28 h-28 rounded overflow-hidden shadow-md"
                        >
                            <Image
                                src={img}
                                alt="preview"
                                fill
                                className="object-cover"
                            />
                            <button
                                onClick={() => removeImage(i)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow"
                            >
                                <MdDelete size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Submit */}
            <button
                onClick={handleSubmit}
                className="btn btn-primary mt-6 w-full text-lg"
            >
                Add Product
            </button>
        </div>
    );
};

export default Page;
