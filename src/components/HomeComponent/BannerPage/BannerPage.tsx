import React from "react";
import {
    MdWorkspacePremium,
    MdLocalShipping,
    MdOutlineHighQuality,
    MdNewReleases,
} from "react-icons/md";

const features = [
    {
        icon: MdWorkspacePremium,
        title: "Only Premium Products",
        desc: "Carefully selected high-quality items",
    },
    {
        icon: MdOutlineHighQuality,
        title: "Best Quality Print",
        desc: "Sharp and long-lasting print quality",
    },
    {
        icon: MdLocalShipping,
        title: "Fast Delivery",
        desc: "Delivered within 2 to 3 days",
    },
    {
        icon: MdNewReleases,
        title: "New Designs",
        desc: "Fresh designs added every month",
    },
];

const BannerPage = () => {
    return (
        <section className="w-full md:py-20 px-4 md:px-10 ">
            {/* Heading */}
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                    Welcome to{" "}
                    <span className="text-indigo-600">Elegatic Store</span>
                </h1>
                <p className="text-gray-500 mt-3">
                    Premium products with modern designs & fast delivery
                </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((item, index) => (
                    <div
                        key={index}
                        className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="flex flex-col items-center text-center">
                            {/* Icon */}
                            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 text-3xl group-hover:scale-110 transition">
                                <item.icon />
                            </div>

                            {/* Title */}
                            <h3 className="mt-4 text-lg font-semibold text-gray-800">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="mt-2 text-sm text-gray-500">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BannerPage;
