"use client";

import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import { useGetProductByIdQuery } from "@/redux/api/productsApi";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { id: string } }) => {
    const id = params.id;
    const { data: productData, isLoading } = useGetProductByIdQuery(id);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState<any>(null);

    // unified image state (old + new)
    const [images, setImages] = useState<
        { type: "old" | "new"; url: string; file?: File }[]
    >([]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    // ── Token helper ──────────────────────────────────────────────
    const getToken = () =>
        document.cookie
            .split("; ")
            .find((row) => row.startsWith("accessToken="))
            ?.split("=")[1];

    // ── INIT DATA ──
    useEffect(() => {
        if (productData) {
            setForm({
                title: productData.title,
                description: productData.description,
                basePrice: productData.basePrice,
                discountPrice: productData.discountPrice,
                brand: productData.brand,
                color: productData.color,
                featured: productData.featured || false,
                sizes: productData.sizes || [],
            });

            setImages(
                (productData.images || []).map((img: string) => ({
                    type: "old",
                    url: img,
                })),
            );
        }
    }, [productData]);

    // ── INPUT CHANGE ──
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // ── FEATURED TOGGLE ──
    const handleFeatured = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, featured: e.target.checked });
    };

    // ── SIZE HANDLERS ──
    const handleSizeChange = (index: number, field: string, value: any) => {
        const updated = [...form.sizes];
        updated[index] = { ...updated[index], [field]: value };
        setForm({ ...form, sizes: updated });
    };

    const handleAddSize = () => {
        setForm({
            ...form,
            sizes: [...form.sizes, { size: "", stock: 0 }],
        });
    };

    const handleRemoveSize = (index: number) => {
        const updated = form.sizes.filter((_: any, i: number) => i !== index);
        setForm({ ...form, sizes: updated });
    };

    // ── IMAGE HANDLERS ──
    const handleNewImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        const newImgs = files.map((file) => ({
            type: "new" as const,
            url: URL.createObjectURL(file),
            file,
        }));

        setImages((prev) => [...prev, ...newImgs]);
    };

    const handleRemoveImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    // ── SUBMIT ──
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();

        const existingImages = images
            .filter((img) => img.type === "old")
            .map((img) => img.url);

        const newFiles = images
            .filter((img) => img.type === "new" && img.file)
            .map((img) => img.file as File);

        const productData = {
            title: form.title,
            description: form.description,
            brand: form.brand,
            basePrice: Number(form.basePrice),
            discountPrice: Number(form.discountPrice),
            color: form.color,
            featured: form.featured,
            sizes: form.sizes,
            existingImages,
        };

        formData.append("data", JSON.stringify(productData));

        newFiles.forEach((file) => {
            formData.append("files", file);
        });

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}product/${id}`,
            {
                method: "PATCH",
                body: formData,
                headers: { Authorization: ` ${getToken()}` },
            },
        );

        if (!res.ok) {
            toast.error("❌ Failed to update product");
            setIsSubmitting(false);
            return;
        }

        await res.json();

        toast.success("✅ Product updated successfully");

        setIsSubmitting(false);
        router.push("/dashboard/admin/products");
    };

    // ── LOADING ──
    if (isLoading || !form)
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner size="xl" color="border-gray-500" />
            </div>
        );

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <div className="">
                <h1 className="text-2xl font-bold">
                    ✏️ Edit {productData.title}
                </h1>
                <h1 className="font-italic ml-10 font-semibold text-sm">
                    {productData?.categories
                        .map((c: any) => c.category.name)
                        .join(", ")}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* ── BASIC INFO ── */}
                <div className="bg-white p-5 shadow rounded-xl space-y-4">
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        placeholder="Title"
                    />

                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                        placeholder="Description"
                    />

                    <div className="grid grid-cols-2 gap-3">
                        <input
                            name="basePrice"
                            type="number"
                            value={form.basePrice}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                        <input
                            name="discountPrice"
                            type="number"
                            value={form.discountPrice}
                            onChange={handleChange}
                            className="input input-bordered"
                        />
                    </div>

                    <input
                        name="brand"
                        value={form.brand}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        placeholder="Brand"
                    />

                    <input
                        name="color"
                        value={form.color}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        placeholder="Color"
                    />

                    {/* FEATURED */}
                    <label className="flex items-center gap-3 mt-2">
                        <input
                            type="checkbox"
                            checked={form.featured}
                            onChange={handleFeatured}
                            className="checkbox"
                        />
                        <span>Featured Product</span>
                    </label>
                </div>

                {/* ── IMAGES ── */}
                <div className="bg-white p-5 shadow rounded-xl space-y-3">
                    <div className="flex flex-wrap gap-3">
                        {images.map((img, index) => (
                            <div
                                key={index}
                                className="relative w-24 h-24 rounded overflow-hidden border"
                            >
                                <Image
                                    src={img.url}
                                    alt=""
                                    fill
                                    className="object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveImage(index)}
                                    className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="btn btn-sm"
                    >
                        Add Images
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        hidden
                        onChange={handleNewImages}
                    />
                </div>

                {/* ── SIZES ── */}
                <div className="bg-white p-5 shadow rounded-xl space-y-3">
                    <button
                        type="button"
                        onClick={handleAddSize}
                        className="btn btn-sm"
                    >
                        + Add Size
                    </button>

                    {form.sizes.map((s: any, i: number) => (
                        <div key={i} className="flex gap-2">
                            <input
                                value={s.size}
                                onChange={(e) =>
                                    handleSizeChange(i, "size", e.target.value)
                                }
                                className="input input-bordered"
                                placeholder="Size"
                            />
                            <input
                                type="number"
                                value={s.stock}
                                onChange={(e) =>
                                    handleSizeChange(
                                        i,
                                        "stock",
                                        Number(e.target.value),
                                    )
                                }
                                className="input input-bordered"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveSize(i)}
                                className="btn btn-error btn-sm"
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                {/* SUBMIT */}
                <button
                    disabled={isSubmitting}
                    className="btn btn-primary w-full"
                >
                    {isSubmitting ? "Updating..." : "Update Product"}
                </button>
            </form>
        </div>
    );
};

export default Page;
