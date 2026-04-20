import React from "react";
import bestPrice from "../../../images/icons/best-price.svg";
import easyReturn from "../../../images/icons/easy-return.svg";
import freeDelivery from "../../../images/icons/free-delivary.svg";
import greatDeal from "../../../images/icons/great-deal.svg";
import wide from "../../../images/icons/wide.svg";
import Image from "next/image";

const offers = [
    {
        title: "Best prices & offers",
        icon: bestPrice, // Changed from object to direct import
        description: "Orders $50 or more",
    },
    {
        title: "Free delivery",
        icon: freeDelivery, // Changed from object to direct import
        description: "Orders $50 or more",
    },
    {
        title: "Great daily deal",
        icon: greatDeal,
        description: "Orders $50 or more",
    },
    {
        title: "Wide assortment",
        icon: wide,
        description: "Orders $50 or more",
    },
    {
        title: "Easy returns",
        icon: easyReturn,
        description: "Orders $50 or more",
    },
];

const PromotionalOffers = () => {
    return (
        <div className="container mx-auto my-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                {offers.map((offer, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-start bg-gray-100 p-4 rounded-lg shadow-md"
                    >
                        <Image
                            src={offer.icon}
                            alt={offer.title}
                            width={50}
                            height={50}
                            className="mr-4"
                        />
                        <div className="flex flex-col">
                            <h3 className="text-lg font-semibold">
                                {offer.title}
                            </h3>
                            <p className="text-gray-600">{offer.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PromotionalOffers;
