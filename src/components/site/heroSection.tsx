import Image from "next/image";

export default function HeroSection() {
    return (
        <section className="relative h-screen w-full">
            {/* Background image */}
            <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop"
                alt="Hero background"
                fill
                priority
                className="object-cover"
            />

            {/* Overlay gradient để chữ nổi */}
            <div className="absolute inset-0 bg-black/30" />

            {/* Text content */}
            <div className="relative z-10 flex h-full items-center px-8 md:px-16">
                <div className="max-w-2xl text-white">
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                        Kiến tạo không gian bền vững
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl text-gray-200">
                        Thiết kế kiến trúc, nội thất, triển lãm và trang trí với cách tiếp cận lấy con người làm trung tâm.
                    </p>
                </div>
            </div>
        </section>
    );
}
