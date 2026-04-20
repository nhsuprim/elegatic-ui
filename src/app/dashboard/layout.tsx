"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
    FaTachometerAlt,
    FaBoxOpen,
    FaTags,
    FaShoppingCart,
    FaUsers,
    FaMoneyBillWave,
    FaTruck,
    FaTicketAlt,
    FaCog,
    FaUserCircle,
    FaSignOutAlt,
} from "react-icons/fa";
import { IoIosArrowDown, IoIosNotificationsOutline } from "react-icons/io";

const menuItems = [
    { name: "Dashboard", icon: FaTachometerAlt, path: "/dashboard" },
    { name: "Products", icon: FaBoxOpen, path: "/dashboard/admin/products" },
    { name: "Categories", icon: FaTags, path: "/dashboard/admin/categories" },
    { name: "Orders", icon: FaShoppingCart, path: "/dashboard/admin/orders" },
    { name: "Customers", icon: FaUsers, path: "/dashboard/admin/customers" },
    {
        name: "Payments",
        icon: FaMoneyBillWave,
        path: "/dashboard/admin/payments",
    },
    { name: "Shipping", icon: FaTruck, path: "/dashboard/admin/shipping" },
    { name: "Coupons", icon: FaTicketAlt, path: "/dashboard/admin/coupons" },
    { name: "Settings", icon: FaCog, path: "/dashboard/admin/settings" },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout, loading } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Route protection
    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setSidebarOpen(false);
    }, [pathname]);

    // Prevent body scroll when sidebar is open on mobile
    useEffect(() => {
        if (sidebarOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [sidebarOpen]);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-950">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-neutral-400 text-sm font-medium tracking-widest uppercase">
                        Loading
                    </p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    const currentPageName =
        menuItems.find((item) => item.path === pathname)?.name || "Dashboard";

    return (
        <div className="flex h-screen bg-neutral-100 font-sans overflow-hidden">
            {/* ── MOBILE OVERLAY ── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ── SIDEBAR ── */}
            <aside
                className={`
                    fixed top-0 left-0 h-full w-64 z-50 flex flex-col
                    bg-slate-950 border-r border-slate-800
                    transform transition-transform duration-300 ease-in-out
                    lg:translate-x-0 lg:static lg:z-auto
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Brand */}
                <div className="flex items-center gap-3 px-6 h-16 border-b border-slate-800 shrink-0">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0">
                        <FaBoxOpen size={15} className="text-slate-950" />
                    </div>
                    <span className="text-white text-base font-bold tracking-tight">
                        ELEGATIC
                    </span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 px-3">
                    <p className="text-neutral-600 text-[10px] font-bold uppercase tracking-widest px-3 mb-3">
                        Main Menu
                    </p>
                    <ul className="space-y-0.5">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className={`
                                            flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                                            ${
                                                isActive
                                                    ? "bg-white text-slate-950"
                                                    : "text-neutral-400 hover:text-white hover:bg-slate-800"
                                            }
                                        `}
                                    >
                                        <Icon
                                            size={15}
                                            className={
                                                isActive
                                                    ? "text-white-950"
                                                    : "text-white-500"
                                            }
                                        />
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Bottom user card */}
                <div className="px-3 pb-4 shrink-0 border-t border-slate-800 pt-4">
                    <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-slate-900">
                        <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center shrink-0">
                            <span className="text-xs font-bold text-white">
                                {user.email[0].toUpperCase()}
                            </span>
                        </div>
                        <div className="overflow-hidden flex-1">
                            <p className="text-white text-[11px] font-semibold truncate">
                                {user.email}
                            </p>
                            <p className="text-slate-500 text-[10px] uppercase tracking-wider">
                                {user.role}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="mt-2 w-full flex items-center gap-2 px-3 py-2 text-neutral-500 hover:text-red-400 hover:bg-slate-900 rounded-lg text-xs font-medium transition-all"
                    >
                        <FaSignOutAlt size={12} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* ── MAIN AREA ── */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* ── TOPBAR ── */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 lg:px-6 gap-4 shrink-0 z-30">
                    {/* Mobile hamburger */}
                    <button
                        className="lg:hidden p-2 rounded-lg text-neutral-500 hover:text-slate-900 hover:bg-neutral-100 transition-colors"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open sidebar"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.8}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>
                    </button>

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm flex-1">
                        <span className="text-neutral-400 hidden sm:block">
                            Admin
                        </span>
                        <span className="text-neutral-300 hidden sm:block">
                            /
                        </span>
                        <span className="font-semibold text-neutral-800">
                            {currentPageName}
                        </span>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        {/* Notification bell */}
                        <button className="relative p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-neutral-100 transition-colors">
                            <IoIosNotificationsOutline size={20} />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-slate-900"></span>
                        </button>

                        {/* Divider */}
                        <div className="w-px h-6 bg-slate-200 mx-1"></div>

                        {/* User dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                            >
                                <div className="w-7 h-7 rounded-full bg-slate-900 flex items-center justify-center shrink-0">
                                    <span className="text-xs font-bold text-white">
                                        {user.email[0].toUpperCase()}
                                    </span>
                                </div>
                                <div className="hidden md:block text-left">
                                    <p className="text-[11px] font-bold text-slate-900 leading-none">
                                        {user.role}
                                    </p>
                                    <p className="text-[10px] text-neutral-400 mt-0.5 leading-none max-w-[120px] truncate">
                                        {user.email}
                                    </p>
                                </div>
                                <IoIosArrowDown
                                    size={14}
                                    className={`text-neutral-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl border border-neutral-200 shadow-xl shadow-black/10 py-1.5 z-50">
                                    <div className="px-4 py-2.5 border-b border-neutral-100 mb-1">
                                        <p className="text-xs font-semibold text-neutral-800 truncate">
                                            {user.email}
                                        </p>
                                        <p className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">
                                            {user.role}
                                        </p>
                                    </div>
                                    <Link
                                        href="/dashboard/admin/profile"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                                    >
                                        <FaUserCircle
                                            size={13}
                                            className="text-neutral-400"
                                        />
                                        Profile Settings
                                    </Link>
                                    <Link
                                        href="/dashboard/admin/settings"
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 transition-colors"
                                    >
                                        <FaCog
                                            size={13}
                                            className="text-neutral-400"
                                        />
                                        System Settings
                                    </Link>
                                    <div className="border-t border-neutral-100 mt-1 pt-1">
                                        <button
                                            onClick={() => {
                                                logout();
                                                setDropdownOpen(false);
                                            }}
                                            className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                                        >
                                            <FaSignOutAlt size={13} />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* ── PAGE CONTENT ── */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-5 md:p-8">{children}</div>
                </main>

                {/* ── FOOTER ── */}
                <footer className="h-10 bg-white border-t border-neutral-200 flex items-center justify-center shrink-0">
                    <p className="text-[11px] text-neutral-400 font-medium">
                        © {new Date().getFullYear()} FullStack MERN Inventory
                        System
                    </p>
                </footer>
            </div>
        </div>
    );
}
