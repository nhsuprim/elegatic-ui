import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // ✅ Products fetch করা
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        cache: "no-store",
    });
    const products = await res.json();

    // ✅ Categories fetch করা
    const catRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/categories`,
        { cache: "no-store" },
    );
    const categories = await catRes.json();

    // ✅ Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: `${process.env.NEXT_PUBLIC_UI_URL}`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${process.env.NEXT_PUBLIC_UI_URL}/products/all`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
    ];

    // ✅ Dynamic product pages
    const productPages: MetadataRoute.Sitemap =
        products?.map((product: any) => ({
            url: `${process.env.NEXT_PUBLIC_UI_URL}/product/${product.id}`,
            lastModified: new Date(product.updatedAt ?? new Date()),
            changeFrequency: "weekly" as const,
            priority: 0.8,
        })) ?? [];

    // ✅ Dynamic category pages
    const categoryPages: MetadataRoute.Sitemap =
        categories?.map((cat: any) => ({
            url: `${process.env.NEXT_PUBLIC_UI_URL}/products/${encodeURIComponent(cat.name)}`,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 0.7,
        })) ?? [];

    return [...staticPages, ...productPages, ...categoryPages];
}
