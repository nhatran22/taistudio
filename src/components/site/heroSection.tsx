"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import categories from "@/content/categories.json";

export default function HeroSection({ language }: { language: string }) {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % categories.length);
        }, 5000); // đổi ảnh mỗi 5 giây
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {categories.map((src, i) => (
                <Image
                    key={i}
                    src={src.cover}
                    alt="Hero background"
                    fill
                    priority={i === 0}
                    className={`absolute inset-0 object-cover transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
                />
            ))}

            {/* Overlay gradient để chữ nổi */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Text content */}
            <div className="relative z-10 flex h-full w-full items-center px-8 md:px-16">
                <div className="w-full text-white">
                    <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
                        {language === 'vi' ? categories[index].titleVI : categories[index].titleEN}
                    </h1>
                    <p className="mt-2 text-xl md:text-2xl text-gray-200">
                        {categories[index].year}
                    </p>
                </div>
            </div>

            {/* Pagination dots */}
            <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 space-x-3">
                {categories.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        className={`h-3 w-3 rounded-full transition-colors ${i === index ? "bg-white" : "bg-white/50"
                            }`}
                    />
                ))}
            </div>
        </section>
    );
}
