"use client";

import Link from "next/link";
import React from "react";
import { FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";

const ContactPage = () => {
    const whatsappUrl = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUM}?text=${encodeURIComponent(
        "Hello! I would like to get in touch with you.",
    )}`;

    const messengerUrl = `https://m.me/${process.env.NEXT_PUBLIC_FB_PAGE_USERNAME}?text=${encodeURIComponent(
        "Hello! I would like to get in touch with you.",
    )}`;

    return (
        <div className="bg-base-200 ">
            <div className="container mx-auto relative top-[65px] px-4 ">
                {/* Gradient Background */}
                <div className="bg-slate-300 rounded-3xl p-1">
                    <div className="rounded-2xl px-4 py-6">
                        {/* Main Flex (structure same) */}
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                            {/* Contact Title */}
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-blue-700">
                                    Contact Us
                                </h1>
                                <p className="text-gray-500 text-sm mt-1">
                                    We are here to help you anytime
                                </p>
                            </div>

                            {/* Phone */}
                            <div className="text-center">
                                <h1 className="font-semibold text-gray-700">
                                    Call Us
                                </h1>
                                <p className="text-blue-600 font-medium">
                                    +8801638744151
                                </p>
                            </div>

                            {/* Social Links */}
                            <div className="text-center">
                                <h1 className="font-semibold text-gray-700 mb-3">
                                    Social Links
                                </h1>

                                <div className="flex gap-3 justify-center items-center">
                                    {/* Messenger */}
                                    <Link href={messengerUrl} target="_blank">
                                        <div className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-md transition duration-300 hover:scale-105">
                                            <FaFacebookMessenger className="text-xl" />
                                        </div>
                                    </Link>

                                    {/* WhatsApp */}
                                    <Link href={whatsappUrl} target="_blank">
                                        <div className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-md transition duration-300 hover:scale-105">
                                            <FaWhatsapp className="text-xl" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
