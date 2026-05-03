import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaXTwitter,
    FaPinterestP,
} from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import Logo from "../../../images/logo/Elegatic_logo.png";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavSection {
    title: string;
    links: { label: string; href: string }[];
}

interface SocialLink {
    label: string;
    href: string;
    icon: React.ReactNode;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_SECTIONS: NavSection[] = [
    {
        title: "Services",
        links: [
            { label: "Branding", href: "#" },
            { label: "Design", href: "#" },
            { label: "Marketing", href: "#" },
            { label: "Advertisement", href: "#" },
            { label: "Consulting", href: "#" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About Us", href: "#" },
            { label: "Contact", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Press Kit", href: "#" },
            { label: "Blog", href: "#" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Terms of Use", href: "#" },
            { label: "Privacy Policy", href: "#" },
            { label: "Cookie Policy", href: "#" },
            { label: "Returns", href: "#" },
            { label: "Shipping Info", href: "#" },
        ],
    },
];

const SOCIAL_LINKS: SocialLink[] = [
    { label: "Facebook", href: "#", icon: <FaFacebookF size={15} /> },
    { label: "Instagram", href: "#", icon: <FaInstagram size={15} /> },
    { label: "X / Twitter", href: "#", icon: <FaXTwitter size={15} /> },
    { label: "Pinterest", href: "#", icon: <FaPinterestP size={15} /> },
];

const PAYMENT_METHODS = ["Visa", "Mastercard", "PayPal", "bKash"] as const;

// ─── Sub-components ───────────────────────────────────────────────────────────

const BrandColumn = () => (
    <div className="lg:col-span-2 flex flex-col gap-5">
        <Link href="/" className="flex items-center gap-3 w-fit">
            <Image
                src={Logo}
                alt="Elegatic Logo"
                width={200}
                height={100}
                className="rounded-full object-cover"
            />
        </Link>

        <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
            Your ultimate style sanctuary — where fashion meets elegance.
            Discover curated collections that define your unique identity.
        </p>

        <ul className="flex gap-3 mt-2" aria-label="Social media links">
            {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <li key={label}>
                    <Link
                        href={href}
                        aria-label={label}
                        className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:border-amber-500 hover:text-amber-400 transition-all duration-200"
                    >
                        {icon}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

const NavColumn = ({ title, links }: NavSection) => (
    <nav aria-label={title}>
        <h6 className="text-xs font-bold tracking-[0.2em] uppercase text-amber-400 mb-5">
            {title}
        </h6>
        <ul className="flex flex-col gap-4">
            {links.map(({ label, href }) => (
                <li key={label}>
                    <Link
                        href={href}
                        className="text-sm text-zinc-400 hover:text-white hover:translate-x-1 transition-all duration-150 inline-block"
                    >
                        {label}
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
);

const BottomBar = () => (
    <div className="border-t border-zinc-800 mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-zinc-600 text-xs tracking-wide">
            &copy; {new Date().getFullYear()} Elegatic. All rights reserved.
        </p>
        <ul
            className="flex items-center gap-3"
            aria-label="Accepted payment methods"
        >
            {PAYMENT_METHODS.map((method) => (
                <li key={method}>
                    <span className="text-xs font-semibold text-zinc-500 border border-zinc-800 rounded px-2 py-1">
                        {method}
                    </span>
                </li>
            ))}
        </ul>
    </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const Footer = () => (
    <footer className="bg-zinc-950 text-white pt-16">
        <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                <BrandColumn />
                {NAV_SECTIONS.map((section) => (
                    <NavColumn key={section.title} {...section} />
                ))}
            </div>
            <BottomBar />
        </div>
    </footer>
);

export default Footer;
