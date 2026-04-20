"use client";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import NavBar2 from "./NavBar2";
import { useGetAllProductsQuery } from "@/redux/api/productsApi";
import Categories from "@/components/Categories/Categories";

const NavBar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showNavBar2, setShowNavBar2] = useState(true);
    const [scrolled, setScrolled] = useState(false);

    // let lastScrollTop = 0;

    // const { data } = useGetAllProductsQuery({});

    // // Extract unique categories
    // // const uniqueCategories = data
    // //     ? [...new Set(data.products.map((product: any) => product.category))]
    // //     : [];

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const currentScroll = window.pageYOffset;
    //         console.log(currentScroll);

    //         if (currentScroll > lastScrollTop) {
    //             setShowNavBar2(false);
    //         } else {
    //             setShowNavBar2(true);
    //         }

    //         setScrolled(currentScroll > 0);

    //         lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    //     };

    //     window.addEventListener("scroll", handleScroll);
    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    // }, []);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;
            setScrolled(currentScroll > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="bg-white shadow-lg">
            <div
                className={`transition-all duration-300 ease-in-out ${
                    showNavBar2
                        ? "max-h-[200px] opacity-100"
                        : "max-h-0 opacity-0"
                }`}
            >
                {showNavBar2 && <NavBar2 />}
            </div>

            <hr className="mt-2" />

            {/* Main NavBar: Always Fixed at the top when scrolling */}
            <div
                className={`w-full mx-auto hidden md:flex justify-between items-center px-6 py-3 text-gray-700 ${
                    scrolled
                        ? "fixed top-0 left-0 right-0 z-50 bg-white shadow-md"
                        : null
                } transition-all duration-300 ease-in-out`}
            >
                {/* Navigation Links */}
                <div className=" flex ml-10 space-x-6 text-lg">
                    <Link
                        className="flex items-center transition-colors"
                        href="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="flex items-center transition-colors"
                        href="/products/beauty"
                    >
                        Beauty
                    </Link>
                    <div className="flex items-center transition-colors">
                        <div className="dropdown dropdown-hover">
                            <div
                                tabIndex={0}
                                role="button"
                                className="flex items-center m-1"
                            >
                                Mens <IoIosArrowDown className="ml-1" />
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow capitalize"
                            >
                                <li>
                                    <Link href="/products/mens-shirts">
                                        mens-shirts
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products/mens-shoes">
                                        mens-shoes
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products/mens-watches">
                                        mens-watches
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center transition-colors">
                        <div className="dropdown dropdown-hover">
                            <div
                                tabIndex={0}
                                role="button"
                                className="flex items-center m-1"
                            >
                                Womens <IoIosArrowDown className="ml-1" />
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow capitalize"
                            >
                                <li>
                                    <Link href="/products/womens-bags">
                                        womens-bags
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products/womens-dresses">
                                        womens-dresses
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products/womens-jewellery">
                                        womens-jewellery
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products/womens-shoes">
                                        womens-shoes
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products/womens-watches">
                                        womens-watches
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="flex items-center transition-colors">
                        <div className="dropdown dropdown-hover">
                            <div
                                tabIndex={0}
                                role="button"
                                className="flex items-center m-1"
                            >
                                Accessories <IoIosArrowDown className="ml-1" />
                            </div>
                            <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow capitalize"
                            >
                                <li>
                                    <Link href="/products/kitchen-accessories">
                                        kitchen-accessories
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products/mobile-accessories">
                                        mobile-accessories
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/products/sports-accessories">
                                        sports-accessories
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <Link
                        className="flex items-center transition-colors"
                        href="/products/sunglasses"
                    >
                        Sunglasses
                    </Link>
                    <Link
                        className="flex items-center transition-colors"
                        href="/products"
                    >
                        Shop all
                    </Link>
                    <Link
                        className="flex items-center transition-colors"
                        href=""
                    >
                        Offers <IoIosArrowDown className="ml-1" />
                    </Link>
                </div>

                {/* Support Center Link */}
                <div className="font-semibold transition-colors cursor-pointer">
                    Support Center
                </div>
            </div>
        </div>
    );
};

export default NavBar;
