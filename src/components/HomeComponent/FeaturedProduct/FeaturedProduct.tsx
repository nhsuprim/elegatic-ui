import React from "react";
import FeaturedCarousel from "./FeaturedCarousel";
import Link from "next/link";

const FeaturedProduct = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product`, {
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    const products = await res.json();

    const featuredProducts = products?.data?.filter(
        (p: any) => p.featured === true,
    );

    return (
        <div className="my-8">
            <div className="flex justify-between items-center mx-2 py-4">
                <h1 className="text-3xl font-bold ">Featured Product</h1>
                <Link href="/products">
                    <span className="text-md font-semibold text-white bg-blue-950 hover:bg-blue-900 px-3 py-1 rounded-lg">
                        view all
                    </span>
                </Link>
            </div>
            <FeaturedCarousel products={featuredProducts || []} />
        </div>
    );
};

export default FeaturedProduct;
