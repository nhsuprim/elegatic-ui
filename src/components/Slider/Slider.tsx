import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import React from "react";
import image1 from "../../images/slider/pic1.jpg";
import image2 from "../../images/slider/pic2.jpg";
import image3 from "../../images/slider/pic3.jpg";
import image4 from "../../images/slider/pic4.jpg";

const Sider = () => {
    const images = [image1, image2, image3, image4];

    return (
        <div className="relative overflow-hidden">
            <Carousel
                className="my-10"
                showArrows={true}
                showThumbs={false} // Disable thumbnails to prevent errors
                autoPlay={true}
                infiniteLoop={true}
                interval={3000}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative mx-auto h-[60vh] md:h-[400px] w-full"
                    >
                        <Image
                            className="object-cover"
                            src={image}
                            alt={`Image ${index + 1}`}
                            fill
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Sider;
