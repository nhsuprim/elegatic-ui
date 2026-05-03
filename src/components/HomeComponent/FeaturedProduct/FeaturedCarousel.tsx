"use client";

import React, { useRef } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const FeaturedCarousel = ({ products }: { products: any[] }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        scrollRef.current?.scrollBy({
            left: direction === "left" ? -320 : 320,
            behavior: "smooth",
        });
    };

    if (!products?.length) return null;

    return (
        <div className="relative w-full group/carousel">
            {/* Left Arrow */}
            <button
                onClick={() => scroll("left")}
                aria-label="Scroll left"
                className="
                    absolute left-2 top-1/2 -translate-y-1/2 z-20
                    w-9 h-9 flex items-center justify-center
                    rounded-full bg-white border border-stone-200
                    shadow-md text-stone-600
                    opacity-0 group-hover/carousel:opacity-100
                    hover:bg-stone-50 hover:border-stone-400 hover:text-stone-900
                    transition-all duration-200
                "
            >
                <FaChevronLeft size={13} />
            </button>

            {/* Right Arrow */}
            <button
                onClick={() => scroll("right")}
                aria-label="Scroll right"
                className="
                    absolute right-2 top-1/2 -translate-y-1/2 z-20
                    w-9 h-9 flex items-center justify-center
                    rounded-full bg-white border border-stone-200
                    shadow-md text-stone-600
                    opacity-0 group-hover/carousel:opacity-100
                    hover:bg-stone-50 hover:border-stone-400 hover:text-stone-900
                    transition-all duration-200
                "
            >
                <FaChevronRight size={13} />
            </button>

            {/* Scroll Track */}
            <div
                ref={scrollRef}
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                className="flex gap-4 overflow-x-auto scroll-smooth px-10 py-4"
            >
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="flex-shrink-0 w-[200px] sm:w-[220px] md:w-[240px] lg:w-[260px]"
                    >
                        <ProductCard id={product.id} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedCarousel;
