"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Images } from "@/interface";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { useState } from "react";

export default function Carousel3D({ images, title }: { images: Array<Images>; title: string }) {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
        <div className="mt-10 max-w-5xl mx-auto">
            <Swiper
                effect="coverflow"
                grabCursor
                centeredSlides
                slidesPerView={"auto"}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 250,
                    modifier: 1,
                    slideShadows: false,
                }}
                modules={[EffectCoverflow, Navigation, Pagination]}
                className="w-full h-[500px]"
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
                {images.map((src, idx) => (
                    <SwiperSlide
                        key={idx}
                        className="w-[600px] h-[400px] flex items-center justify-center"
                    >
                        <Image
                            // src={src}
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop"
                            alt={`${title} ${idx}`}
                            fill
                            className="object-cover rounded-xl shadow-lg"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="mt-4 text-center max-w-2xl">
                <p className="text-gray-700 text-lg">
                    {images[activeIndex].description}
                </p>
            </div>
        </div>
    );
}
