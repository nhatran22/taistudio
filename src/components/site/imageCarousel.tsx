"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import { Images } from "@/interface";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import { useState } from "react";
export default function Carousel3D({ images, title, lang }: { images: Array<Images>; title: string; lang: string }) {
    const [activeIndex, setActiveIndex] = useState(0);

    const activeImageDesc = lang === 'vi'
        ? images[activeIndex]?.descriptionVI
        : images[activeIndex]?.descriptionEN;

    const parseDescription = (description: string) => {
        if (!description) return null;

        // Tách chuỗi bằng dấu * (giả sử nội dung giữa các dấu * là phần highlight)
        const parts = description.split('*');

        return parts.map((part, index) => {
            // Nếu index là số lẻ (1, 3, 5...), đó là phần nằm giữa hai dấu * -> Highlight
            if (index % 2 !== 0) {
                // Bạn có thể dùng class Tailwind để làm nổi bật (ví dụ: font-bold)
                return <strong key={index} className="font-bold text-black">{part}</strong>;
            }
            // Nếu index là số chẵn, đó là văn bản thông thường
            return <span key={index}>{part}</span>;
        });
    };

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
                className="w-full h-[550px] md:h-[600px] pb-10"
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
                {images.map((img, idx) => (
                    // Tăng chiều rộng/cao slide để tận dụng không gian
                    <SwiperSlide
                        key={idx}
                        className="w-[700px] h-[450px] flex items-center justify-center"
                    >
                        <Image
                            src={img.src}
                            alt={`${title} ${idx}`}
                            fill
                            className="object-cover md:object-contain shadow-xl rounded-none" // Bỏ rounded-xl, dùng shadow-xl tinh tế hơn
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="mt-8 mx-auto w-full px-4 md:px-0">
                <p className="text-gray-700 text-base md:text-lg text-center">
                    {/* Dùng hàm đã import */}
                    {parseDescription(activeImageDesc)}
                </p>
            </div>
        </div>
    );
}
