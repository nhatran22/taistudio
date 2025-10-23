"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Images } from "@/interface";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
export default function Carousel3D({ images, title, lang }: { images: Array<Images>; title: string; lang: string }) {

    return (
        <div className="mt-16 w-full">
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
                className="w-full h-[200px] md:h-[600px] pb-10"
            >
                {images.map((img, idx) => (
                    // Tăng chiều rộng/cao slide để tận dụng không gian
                    <SwiperSlide
                        key={idx}
                        className="w-[800px] md:h-[600px] flex items-center justify-center"
                    >
                        <Image
                            src={img.src}
                            alt={`${title} ${idx}`}
                            fill
                            className="object-contain shadow-xl rounded-none"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
