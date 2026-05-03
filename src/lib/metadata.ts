import type { Metadata } from "next";

const siteConfig = {
    name: "ELEGATIC",
    url: "https://yoursite.com",
    description: "তোমার site এর description",
    ogImage: "https://yoursite.com/og-image.jpg",
    twitterHandle: "@yourhandle",
};

export function generateSEO({
    title,
    description,
    image,
    url,
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    noIndex?: boolean;
}): Metadata {
    const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
    const metaDesc = description || siteConfig.description;
    const ogImage = image || siteConfig.ogImage;
    const canonicalUrl = url || siteConfig.url;

    return {
        title: fullTitle,
        description: metaDesc,
        metadataBase: new URL(siteConfig.url),
        alternates: {
            canonical: canonicalUrl,
        },
        robots: noIndex
            ? { index: false, follow: false }
            : { index: true, follow: true },

        // Open Graph (Facebook, WhatsApp)
        openGraph: {
            title: fullTitle,
            description: metaDesc,
            url: canonicalUrl,
            siteName: siteConfig.name,
            images: [
                { url: ogImage, width: 1200, height: 630, alt: fullTitle },
            ],
            locale: "bn_BD",
            type: "website",
        },

        // Twitter / X Card
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description: metaDesc,
            images: [ogImage],
            creator: siteConfig.twitterHandle,
        },
    };
}
