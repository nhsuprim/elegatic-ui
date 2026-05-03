"use client";
import Cart from "@/components/Cart/Cart";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaBars, FaShopify, FaShoppingCart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import Logo from "../../../images/logo/Elegatic_logo.png";

const NavBar2 = () => {
    const { products } = useAppSelector((state) => state.cart);
    const [searchItem, setSearchItem] = useState("");
    const { data, isLoading, error } = useGetAllProductsQuery({});

    const searchData = data?.filter((p: any) =>
        p.title.toLowerCase().includes(searchItem.toLowerCase()),
    );

    return (
        <div className="">
            <div className="">
                <div className="navbar ">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <button
                                tabIndex={0}
                                className="btn btn-ghost lg:hidden"
                                aria-label="Menu"
                            >
                                <FaBars className="h-6 w-6 text-gray-600" />
                            </button>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-white rounded-lg shadow-lg mt-3 w-52 p-2"
                            >
                                <li>
                                    <Link
                                        href="/products/all"
                                        className="hover:text-red-500"
                                    >
                                        All Products
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/products/T-Shirt"
                                        className="hover:text-red-500"
                                    >
                                        T-Shirt
                                    </Link>
                                </li>
                                <li tabIndex={0}>
                                    <Link
                                        href="/products/Pant"
                                        className="hover:text-red-500"
                                    >
                                        Pant
                                    </Link>
                                    {/* <ul className="p-2 bg-white">
                                        <li>
                                            <Link
                                                href=""
                                                className="hover:text-red-500"
                                            >
                                                Submenu 1
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href=""
                                                className="hover:text-red-500"
                                            >
                                                Submenu 2
                                            </Link>
                                        </li>
                                    </ul> */}
                                </li>
                                <li>
                                    <Link
                                        href="/products/Jersey"
                                        className="hover:text-red-500"
                                    >
                                        Jersey
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <Link href="/" className="text-xl">
                            <div className="flex items-center gap-3">
                                <div className="">
                                    <Image
                                        src={Logo}
                                        alt="Elegatic Logo"
                                        width={250}
                                        height={150}
                                        className="rounded-full object-cover"
                                    />
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="navbar-center hidden lg:flex">
                        <div className="relative w-[600px] mt-2">
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200 ease-in-out"
                                placeholder="Search for products..."
                                onChange={(e) => setSearchItem(e.target.value)}
                                value={searchItem}
                            />
                            <FiSearch className="absolute right-4 top-3 h-5 w-5 text-gray-400" />

                            {searchItem && (
                                <ul className="absolute z-30 left-0 right-0 mt-1 bg-white shadow-lg rounded-lg max-h-60 overflow-auto">
                                    {searchData?.length > 0 ? (
                                        searchData.map((product: any) => (
                                            <li
                                                key={product.id}
                                                className="p-2 hover:bg-gray-100"
                                            >
                                                <Link
                                                    href={`/product/${product.id}`}
                                                    onClick={() =>
                                                        setSearchItem("")
                                                    }
                                                >
                                                    <div className="flex justify-between items-center">
                                                        <div className="flex justify-center items-center">
                                                            <Image
                                                                src={
                                                                    product
                                                                        .images[0]
                                                                }
                                                                alt=""
                                                                width={50}
                                                                height={50}
                                                            />
                                                            <h3 className="text-lg pl-2 font-bold text-gray-700">
                                                                {product.title}
                                                            </h3>
                                                        </div>
                                                        <div className="font-semibold">
                                                            ৳
                                                            {
                                                                product.discountPrice
                                                            }
                                                        </div>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))
                                    ) : (
                                        <li className="p-2 text-gray-500">
                                            No products found
                                        </li>
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="navbar-end space-x-5">
                        <div className="">
                            <div className="drawer drawer-end">
                                <input
                                    id="my-drawer-4"
                                    type="checkbox"
                                    className="drawer-toggle"
                                />
                                <div className="drawer-content">
                                    <label
                                        htmlFor="my-drawer-4"
                                        className="drawer-button py-2"
                                    >
                                        <div className="flex gap-2">
                                            <div className="indicator">
                                                <span className="absolute -top-4 -right-4 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-1">
                                                    {products.length}
                                                </span>
                                                <p className="text-2xl font-semibold text-gray-700 hover:text-red-500 transition-colors pt-1">
                                                    <FaShoppingCart />
                                                </p>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                                <div className="drawer-side">
                                    <label
                                        htmlFor="my-drawer-4"
                                        aria-label="close sidebar"
                                        className="drawer-overlay"
                                    ></label>
                                    <Cart />
                                </div>
                            </div>
                        </div>
                        <Link
                            href="/signin"
                            className="text-4xl pl-2 font-semibold text-gray-700 hover:text-red-500 transition-colors"
                        >
                            <CgProfile />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavBar2;
