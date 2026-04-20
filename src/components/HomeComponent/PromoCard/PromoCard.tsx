import Image from "next/image";
import React from "react";
import promo1 from "../../../images/promo/promo1.webp";
import promo2 from "../../../images/promo/promo2.webp";
import promo3 from "../../../images/promo/promo3.webp";
import promo4 from "../../../images/promo/promo4.webp";
import promo5 from "../../../images/promo/promo5.webp";

const PromoCard = () => {
    return (
        <div className="my-10">
            <div className="flex gap-2 justify-center items-center cursor-pointer">
                <Image
                    className="rounded-lg"
                    src={promo1}
                    alt=""
                    height={80}
                    width={250}
                />
                <Image
                    className="rounded-lg"
                    src={promo2}
                    alt=""
                    height={80}
                    width={250}
                />
                <Image
                    className="rounded-lg"
                    src={promo3}
                    alt=""
                    height={80}
                    width={250}
                />
                <Image
                    className="rounded-lg"
                    src={promo4}
                    alt=""
                    height={80}
                    width={250}
                />
                <Image
                    className="rounded-lg"
                    src={promo5}
                    alt=""
                    height={80}
                    width={250}
                />
            </div>
        </div>
    );
};

export default PromoCard;
