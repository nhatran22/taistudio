import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import Image from "next/image";
import HeroSection from "@/components/site/heroSection";
import categories from "@/content/categories.json";

export const dynamic = "error";

export const metadata: Metadata = {
    title: "Studio Portfolio",
};

const SUPPORTED_LOCALES = ["en", "vi"] as const;

export async function generateStaticParams() {
    return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function Landing({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;

    const currentLocale = SUPPORTED_LOCALES.includes(locale as "en" | "vi")
        ? locale
        : "vi";

    const dict = await getDictionary(currentLocale);
    return (
        <div className="min-h-dvh flex flex-col">
            <main className="flex-1">
                <section className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <HeroSection language={locale} />
                </section>
                {/* About Me Section */}
                <section>
                    <div className="flex justify-start gap-x-8 p-8 bg-black">
                        <Link
                            key="about"
                            href={`/${locale}/about`}
                            className="w-full md:w-3/4 group overflow-hidden hover:shadow-md hover:border hover:rounded-lg transition-shadow animate-in fade-in zoom-in-95 duration-1000"
                        >
                            <div className="relative w-full h-[20vh] md:h-[40vh]">
                                <Image
                                    src="/assets/profile.png"
                                    alt="about"
                                    fill
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                <div className="absolute w-full bottom-0 left-0 p-2 text-white z-10 bg-gradient-to-b from-black/80 to-transparent">
                                    <p className="text-[16px] md:text-2xl font-semibold drop-shadow-lg">
                                        {currentLocale === 'vi' ? 'Đình Tài' : 'Dinh Tai'}
                                    </p>
                                    <p className="text-[12px] md:text-[14px] italic text-gray-500 font-light">
                                        {currentLocale === 'vi' ? 'Xem Thêm' : 'See more'}
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <div className="hidden md:flex justify-center items-center w-1/4 bg-gray-300 p-4">
                            <span className="italic text-gray-500 font-semilight">
                                {currentLocale === 'vi' ? '"Là một nhà thiết kế trẻ thuộc thế hệ sáng tạo mới của Việt Nam. Với tư duy thẩm mỹ hiện đại cùng niềm đam mê khám phá vẻ đẹp trong không gian sống, anh xem thiết kế là hành trình kết nối giữa nghệ thuật, văn hoá và cảm xúc con người"'
                                    : '"As a young designer of the new creative generation of Vietnam. With modern aesthetic thinking and a passion for discovering beauty in living spaces, he sees design as a journey connecting art, culture and human emotions."'
                                }
                            </span>
                        </div>
                    </div>
                </section>
                {/* Categories Section */}
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-black">
                        {categories.map((cat, idx) => {
                            const isLastOdd = categories.length % 2 === 1 && idx === categories.length - 1;
                            const category = dict.categories.find(category => category.slug === cat.slug);

                            return (
                                <Link
                                    key={cat.slug}
                                    href={`/${locale}/category/${cat.slug}`}
                                    className={`w-full group overflow-hidden hover:shadow-md hover:border hover:rounded-lg transition-shadow animate-in fade-in zoom-in-95 duration-1000 ${isLastOdd ? "md:col-span-2 md:justify-self-center md:w-1/2" : ""
                                        }`}
                                >
                                    <div className="relative w-full h-[25vh] md:h-[50vh]">
                                        <Image
                                            alt={category!.label!}
                                            src={cat.cover}
                                            fill
                                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                        <div className="absolute w-full bottom-0 left-0 p-1 md:p-2 text-white z-10 bg-gradient-to-b from-black/80 to-transparent">
                                            <p className="text-[16px] md:text-2xl font-semibold drop-shadow-lg">
                                                {category?.label}
                                            </p>
                                            <p className="text-[12px] md:text-[14px] text-gray-500 font-light">
                                                {category!.year}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}


