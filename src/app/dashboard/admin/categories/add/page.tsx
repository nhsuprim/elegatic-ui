"use client";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

const Page = () => {
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [sizeImage, setSizeImage] = useState(null);
    const [sizePreview, setSizePreview] = useState<string | null>(null);

    const router = useRouter();

    // ── Token helper ──────────────────────────────────────────────
    const getToken = () =>
        document.cookie
            .split("; ")
            .find((row) => row.startsWith("accessToken="))
            ?.split("=")[1];

    // ✅ handle image preview
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file as any);
            setPreview(URL.createObjectURL(file));
        }
    };

    // ✅ handle size image preview
    const handleSizeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSizeImage(file as any);
            setSizePreview(URL.createObjectURL(file));
        }
    };

    // ✅ remove image
    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
    };
    // ✅ remove size image
    const handleRemoveSizeImage = () => {
        setSizeImage(null);
        setSizePreview(null);
    };

    const handleSubmit = async () => {
        try {
            if (!name || !image) {
                toast.error("Please provide name and image");
                return;
            }

            const formData = new FormData();

            const nameData = { name };

            formData.append("data", JSON.stringify(nameData));
            formData.append("file", image);
            if (sizeImage) {
                formData.append("sizeChart", sizeImage);
            }

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/category`,
                {
                    method: "POST",
                    body: formData,
                    headers: { Authorization: ` ${getToken()}` },
                },
            );

            if (res.ok) {
                toast.success("Category created successfully");

                setName("");
                setImage(null);
                setPreview(null);
                setSizeImage(null);
                setSizePreview(null);
                //redirect to category list page
                router.push("/dashboard/admin/categories");
            } else {
                toast.error("Failed to create category");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div className="min-h-screen p-6">
            {/* Top */}
            <div className="max-w-3xl mx-auto mb-6">
                <Link
                    href="/dashboard/admin/categories"
                    className="inline-block  bg-blue-900  hover:bg-blue-950 text-white px-3 py-2 font-semibold cursor-pointer rounded-md transition"
                >
                    ← Back to Categories
                </Link>
            </div>

            {/* Card */}
            <div className="max-w-3xl mx-auto bg-gray-100 shadow-lg rounded-2xl p-8">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Add New Category
                </h1>

                {/* Image Upload */}
                <div className="mb-6">
                    <label className="font-semibold block mb-2">
                        Upload Category Image
                    </label>

                    {!preview ? (
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full"
                            onChange={handleImageChange}
                        />
                    ) : (
                        <div className="relative w-40 h-40">
                            <Image
                                src={preview}
                                alt="preview"
                                fill
                                className="object-cover rounded-lg border"
                            />

                            {/* Remove Button */}
                            <button
                                onClick={handleRemoveImage}
                                className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600"
                            >
                                <MdDelete size={16} />
                            </button>
                        </div>
                    )}
                </div>
                <div className="mb-6">
                    <label className="font-semibold block mb-2">
                        Upload Size-Chart Image
                    </label>

                    {!sizePreview ? (
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full"
                            onChange={handleSizeImageChange}
                        />
                    ) : (
                        <div className="relative w-40 h-40">
                            <Image
                                src={sizePreview}
                                alt="preview"
                                fill
                                className="object-cover rounded-lg border"
                            />

                            {/* Remove Button */}
                            <button
                                onClick={handleRemoveSizeImage}
                                className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600"
                            >
                                <MdDelete size={16} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Name Input */}
                <div className="mb-6">
                    <label className="font-semibold block mb-2">
                        Category Name
                    </label>
                    <input
                        type="text"
                        className="input input-bordered w-full"
                        placeholder="Enter category name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {/* Submit */}
                <button
                    onClick={handleSubmit}
                    className=" bg-blue-900  hover:bg-blue-950 text-white px-3 py-2 font-semibold cursor-pointer rounded-mdwhite w-1/2 justify-center text-lg rounded-lg transition"
                >
                    Add Category
                </button>
            </div>
        </div>
    );
};

export default Page;
