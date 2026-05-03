"use client";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import DeleteCategoriesModal from "@/components/Modal/Categories/DeleteCategoriesModal";
import { useGetAllCategoryQuery } from "@/redux/api/categoriApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

const Page = () => {
    // const { data: categoryData, isLoading } = useGetAllCategoryQuery({});

    const [categoryData, setCategoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    // ── Token helper ──────────────────────────────────────────────
    const getToken = () =>
        document.cookie
            .split("; ")
            .find((row) => row.startsWith("accessToken="))
            ?.split("=")[1];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/category`,
                    {
                        headers: { Authorization: ` ${getToken()}` },
                    },
                );
                const data = await res.json();
                setCategoryData(data.data);
            } catch (error) {
                toast.error("Error fetching categories");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, [openModal]);

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/category/${id}`,
                {
                    method: "DELETE",
                    headers: { Authorization: ` ${getToken()}` },
                },
            );

            if (res.ok) {
                toast.success("Category deleted successfully");
                setOpenModal(false);
            } else {
                toast.error("Failed to delete category");
            }
        } catch (error) {
            toast.error("Error deleting category");
        }
    };

    if (isLoading)
        return (
            <div className="min-h-screen flex items-center justify-center bg-stone-50">
                <div className="flex flex-col items-center gap-3">
                    <span className="loading loading-spinner loading-lg text-stone-400"></span>
                    <p className="text-sm text-stone-400 tracking-wide">
                        Loading orders...
                    </p>
                </div>
            </div>
        );

    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold ">Categories</h1>
                <Link
                    href="/dashboard/admin/categories/add"
                    className=" bg-blue-900  hover:bg-blue-950 text-white px-3 py-2 font-semibold cursor-pointer rounded-md"
                >
                    Add Category
                </Link>
            </div>

            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {categoryData?.map((category: any, index: number) => (
                        <tr key={category.id}>
                            <td>{index + 1}</td>

                            <td>
                                {!category.image ? (
                                    <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center">
                                        No Image
                                    </div>
                                ) : (
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        width={40}
                                        height={40}
                                        className="rounded-md"
                                    />
                                )}
                            </td>

                            <td>{category.name}</td>

                            <td
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setOpenModal(true);
                                }}
                                className="text-2xl text-red-500 cursor-pointer"
                            >
                                <MdDelete />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* ✅ Modal */}
            <DeleteCategoriesModal
                open={openModal}
                setOpen={setOpenModal}
                category={selectedCategory}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default Page;
