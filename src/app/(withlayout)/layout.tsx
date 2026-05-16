import type { Metadata } from "next";
import NavBar from "@/components/Shared/Header/NavBar";
import Footer from "@/components/Shared/Footer/page";
import ContactPage from "@/components/ContactPage/ContactPage";

export const metadata: Metadata = {
    title: "Elegatic",
    description:
        "Elegatic is a leading e-commerce platform for all your shopping needs.",
};

export default function WithLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavBar />
            {children}
            <ContactPage />
            <Footer />
        </>
    );
}
