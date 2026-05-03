interface ProductJsonLdProps {
    product: {
        id: string;
        title: string;
        description?: string;
        basePrice: number;
        discountPrice?: number;
        brand?: string;
        images?: { url: string }[];
    };
}

export const ProductJsonLd = ({ product }: ProductJsonLdProps) => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        description: product.description ?? "",
        brand: {
            "@type": "Brand",
            name: product.brand ?? "ELEGATIC",
        },
        image: product.images?.map((img) => img.url) ?? [],
        offers: {
            "@type": "Offer",
            priceCurrency: "BDT",
            price: product.discountPrice ?? product.basePrice,
            availability: "https://schema.org/InStock",
            url: `${process.env.NEXT_PUBLIC_UI_URL}/product/${product.id}`,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};

interface WebsiteJsonLdProps {
    url?: string;
    name?: string;
}

export const WebsiteJsonLd = ({
    url = process.env.NEXT_PUBLIC_UI_URL ?? "",
    name = "ELEGATIC",
}: WebsiteJsonLdProps) => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        url,
        name,
        potentialAction: {
            "@type": "SearchAction",
            target: `${url}/products/{search_term_string}`,
            "query-input": "required name=search_term_string",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};

interface BreadcrumbJsonLdProps {
    items: {
        name: string;
        url: string;
    }[];
}

export const BreadcrumbJsonLd = ({ items }: BreadcrumbJsonLdProps) => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
};
