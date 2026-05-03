"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Thumbs, Zoom } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/zoom";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";

const ImageSlider2 = ({ product }: { product: any }) => {
    const images = product.images || [];
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [fullscreen, setFullscreen] = useState(false);

    return (
        <>
            <div className="flex flex-col-reverse md:flex-row gap-2 w-full">
                {/* ── Thumbnails ── */}
                <Swiper
                    onSwiper={setThumbsSwiper}
                    direction="horizontal"
                    breakpoints={{ 768: { direction: "vertical" } }}
                    slidesPerView={4}
                    spaceBetween={8}
                    watchSlidesProgress
                    className="w-full md:w-20 md:h-[520px] flex-shrink-0"
                >
                    {images.map((img: string, i: number) => (
                        <SwiperSlide key={i} onClick={() => setActiveIndex(i)}>
                            <div
                                className={`
                                    rounded-lg overflow-hidden cursor-pointer border-2 transition-all duration-150
                                    aspect-square bg-stone-50
                                    ${
                                        activeIndex === i
                                            ? "border-stone-800 opacity-100"
                                            : "border-stone-200 opacity-55 hover:opacity-80 hover:border-stone-400"
                                    }
                                `}
                            >
                                <img
                                    src={img}
                                    alt={`Thumb ${i + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* ── Main Slider ── */}
                <div className="relative flex-1 rounded-xl overflow-hidden ">
                    <Swiper
                        modules={[Thumbs, Autoplay, Zoom]}
                        thumbs={{ swiper: thumbsSwiper }}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        zoom={{ maxRatio: 2.5 }}
                        onSlideChange={(s) => setActiveIndex(s.activeIndex)}
                        className="w-full h-full"
                    >
                        {images.map((img: string, i: number) => (
                            <SwiperSlide key={i}>
                                <div
                                    className="swiper-zoom-container w-full cursor-zoom-in"
                                    style={{ height: "520px" }}
                                >
                                    <img
                                        src={img}
                                        alt={`${product.title} ${i + 1}`}
                                        onDoubleClick={() =>
                                            setFullscreen(true)
                                        }
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Counter badge */}
                    <div className="absolute bottom-3 left-3 z-10 bg-black/30 text-white text-xs px-2.5 py-1 rounded-full pointer-events-none">
                        {activeIndex + 1} / {images.length}
                    </div>

                    {/* Fullscreen button */}
                    <button
                        onClick={() => setFullscreen(true)}
                        className="absolute bottom-3 right-3 z-10 bg-white/90 hover:bg-white border border-stone-200 rounded-lg p-1.5 transition-all duration-150"
                        title="Fullscreen"
                    >
                        <svg
                            className="w-4 h-4 text-stone-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* ── Fullscreen Modal ── */}
            {fullscreen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.92)" }}
                    onClick={() => setFullscreen(false)}
                >
                    <button
                        onClick={() => setFullscreen(false)}
                        className="absolute top-4 right-4 z-[100] flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm px-3 py-1.5 rounded-lg transition-all"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                        Close
                    </button>

                    <div
                        className="w-full h-full max-w-4xl mx-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Swiper
                            initialSlide={activeIndex}
                            modules={[Zoom]}
                            zoom={{ maxRatio: 3 }}
                            onSlideChange={(s) => setActiveIndex(s.activeIndex)}
                            className="w-full h-full"
                        >
                            {images.map((img: string, i: number) => (
                                <SwiperSlide key={i}>
                                    <div
                                        className="swiper-zoom-container flex items-center justify-center"
                                        style={{ height: "100vh" }}
                                    >
                                        <img
                                            src={img}
                                            alt={`Fullscreen ${i + 1}`}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Dot indicators */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_: string, i: number) => (
                            <div
                                key={i}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveIndex(i);
                                }}
                                className={`rounded-full cursor-pointer transition-all duration-200 ${
                                    activeIndex === i
                                        ? "w-4 h-2 bg-white"
                                        : "w-2 h-2 bg-white/40"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageSlider2;
