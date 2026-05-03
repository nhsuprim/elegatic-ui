/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ["image/webp"], // faster than avif in most cases
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.dummyjson.com",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "https",
                hostname: "example.com",
            },
        ],
        minimumCacheTTL: 60 * 60 * 24 * 30, // cache images for 30 days
    },
    compress: true,
    poweredByHeader: false,
};

export default nextConfig;
