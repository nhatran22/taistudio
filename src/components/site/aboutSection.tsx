// components/site/AboutSection.tsx

import React from 'react';

interface AboutSectionProps {
    heading: string;
    body: string;
}

export default function AboutSection({ heading, body }: AboutSectionProps) {
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
        // Bố cục lưới 3 cột (1 cột tiêu đề, 2 cột nội dung)
        <section className="py-16 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">

            {/* Cột 1: Tiêu đề - Vị trí cố định (sticky) để dễ dàng cuộn */}
            <div className="md:col-span-1">
                <h2 className="text-3xl font-serif font-semibold text-gray-900 sticky top-24">
                    {heading}
                </h2>
            </div>

            {/* Cột 2: Nội dung - Sử dụng parseDescription */}
            <div className="md:col-span-2">
                <p className="text-xl text-gray-700 leading-relaxed">
                    {/* Áp dụng font-size lớn (xl) và leading-relaxed để dễ đọc */}
                    {parseDescription(body)}
                </p>
            </div>
        </section>
    );
}