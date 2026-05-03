import type { Metadata } from "next";
import ProductsPageClient from "../../../../components/Product/ProductsPageClient";

interface PageProps {
    params: { id: string };
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const category = decodeURIComponent(params.id);
    const title =
        category === "all"
            ? "All Products - ELEGATIC"
            : `${category.toUpperCase()} - ELEGATIC`;

    return {
        title,
        description: "আমাদের সাইটে স্বাগতম। সেরা পণ্য সংগ্রহ করুন।",
        openGraph: {
            title,
            description: "আমাদের সাইটে স্বাগতম। সেরা পণ্য সংগ্রহ করুন।",
            url: `${process.env.NEXT_PUBLIC_UI_URL}/products/${params.id}`,
            siteName: "ELEGATIC",
            type: "website",
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_UI_URL}/products/${params.id}`,
        },
    };
}

const Page = ({ params }: PageProps) => {
    return <ProductsPageClient params={params} />;
};

export default Page;
