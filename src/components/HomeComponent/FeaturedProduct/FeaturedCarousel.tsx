"use client";

import React, { useRef } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const FeaturedCarousel = ({ products }: { products: any[] }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;

        const scrollAmount = 300;

        scrollRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth",
        });
    };

    return (
        <div className="relative w-full">
            {/* Left Arrow */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-sm bg-white shadow"
            >
                <FaChevronLeft />
            </button>

            {/* Right Arrow */}
            <button
                onClick={() => scroll("right")}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 btn btn-circle btn-sm bg-white shadow"
            >
                <FaChevronRight />
            </button>

            {/* Scroll Container */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scroll-smooth px-10 py-4 scrollbar-hide"
                style={{ scrollSnapType: "x mandatory" }}
            >
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="min-w-[250px] md:min-w-[280px] lg:min-w-[300px] scroll-snap-align-start"
                    >
                        <ProductCard id={product.id} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedCarousel;
