import type { Metadata } from "next";

import "./globals.css";
import { Barlow } from "next/font/google";
import Providers from "@/redux/Providers";
import { ToastContainer, toast } from "react-toastify";
import { AuthProvider } from "@/context/AuthContext";
import MetaPixel from "@/components/MetaPixel/MetaPixel";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "ELEGATIC",
    description:
        "ELEGATIC is a leading e-commerce platform for all your shopping needs.",
};

const barlow = Barlow({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-barlow",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={barlow.variable}>
            <meta
                name="facebook-domain-verification"
                content={process.env.NEXT_PUBLIC_META_CONTENT}
            />
            <body>
                <Providers>
                    <AuthProvider>
                        <ToastContainer />
                        <Suspense fallback={null}>
                            <MetaPixel />
                        </Suspense>
                        {children}
                    </AuthProvider>
                </Providers>
            </body>
        </html>
    );
}
