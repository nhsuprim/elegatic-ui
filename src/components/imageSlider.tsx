import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import styles
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import React from "react";

const ImageSider = ({ product }: { product: any }) => {
    // Example images array for demonstration
    const images = product.images || []; // Use images from product data or fallback

    const onChange = (index: any) => {
        // console.log(`Carousel changed to ${index}`);
    };

    const onClickItem = (index: any) => {
        // console.log(`Image ${index} clicked`);
    };

    const onClickThumb = (index: any) => {
        // console.log(`Thumbnail ${index} clicked`);
    };

    return (
        <Carousel
            showArrows={true}
            showThumbs={false}
            autoPlay={true} // Enable autoplay
            infiniteLoop={true} // Loop through the images infinitely
            interval={3000}
            onChange={onChange}
            onClickItem={onClickItem}
            onClickThumb={onClickThumb}
        >
            {images.map((image: any, index: any) => (
                <div
                    key={index}
                    className="relative mx-auto h-[400px] w-[400px] "
                >
                    <Image
                        className="py-2"
                        src={image}
                        alt={`Image ${index + 1}`}
                        fill
                    />
                </div>
            ))}
        </Carousel>
    );
};

export default ImageSider;
