import React from "react";
import FeaturedCarousel from "./FeaturedCarousel";

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
        <div>
            <FeaturedCarousel products={featuredProducts || []} />
        </div>
    );
};

export default FeaturedProduct;
