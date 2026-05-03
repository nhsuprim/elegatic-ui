import ProductPageClient from "@/components/Product/SingleProductPageClient";
import type { Metadata } from "next";

interface PageProps {
    params: { id: string };
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`,
            { cache: "no-store" },
        );

        if (!res.ok) throw new Error("Product not found");

        const product = await res.json();

        const title = product?.title
            ? `${product.title} - ELEGATIC`
            : "Product - ELEGATIC";

        const description = product?.description
            ? product.description.replace(/[#*_>\-`]/g, "").slice(0, 155)
            : "আমাদের সাইটে স্বাগতম। সেরা পণ্য সংগ্রহ করুন।";

        const image = product?.images?.[0]?.url ?? "/default-og.jpg";
        const url = `${process.env.NEXT_PUBLIC_UI_URL}/product/${params.id}`;

        return {
            title,
            description,
            openGraph: {
                title,
                description,
                url,
                siteName: "ELEGATIC",
                images: [
                    {
                        url: image,
                        width: 800,
                        height: 600,
                        alt: product?.title ?? "Product Image",
                    },
                ],
                type: "website",
            },
            twitter: {
                card: "summary_large_image",
                title,
                description,
                images: [image],
            },
            alternates: {
                canonical: url,
            },
        };
    } catch {
        return {
            title: "Product - ELEGATIC",
            description: "আমাদের সাইটে স্বাগতম। সেরা পণ্য সংগ্রহ করুন।",
        };
    }
}

const Page = ({ params }: PageProps) => {
    return <ProductPageClient params={params} />;
};

export default Page;
