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
                                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop"
                                    alt="about"
                                    fill
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6 text-white z-10">
                                    <p className="text-2xl md:text-2xl font-semibold drop-shadow-lg">
                                        {currentLocale === 'vi' ? 'Về Chúng Tôi' : 'About Us'}
                                    </p>
                                    <p className="italic text-gray-500 font-light">
                                        {currentLocale === 'vi' ? 'Khám phá ngay' : 'Discover now'}
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <div className="hidden md:flex justify-center items-center w-1/4 bg-gray-300">
                            <span>About Information</span>
                        </div>
                    </div>
                </section>
                {/* Categories Section */}
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 bg-black">
                        {categories.map((cat, idx) => {
                            const isLastOdd = categories.length % 2 === 1 && idx === categories.length - 1;

                            return (
                                <Link
                                    key={cat.slug}
                                    href={`/${locale}/category/${cat.slug}`}
                                    className={`w-full group overflow-hidden hover:shadow-md hover:border hover:rounded-lg transition-shadow animate-in fade-in zoom-in-95 duration-1000 ${isLastOdd ? "md:col-span-2" : ""
                                        }`}
                                >
                                    <div className="relative w-full h-[25vh] md:h-[50vh]">
                                        <Image
                                            src={cat.cover}
                                            alt={dict.categories[cat.slug as keyof typeof dict.categories]}
                                            fill
                                            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                        <div className="absolute bottom-0 left-0 p-6 text-white z-10">
                                            <span className="text-2xl md:text-2xl font-semibold drop-shadow-lg">
                                                {dict.categories[cat.slug as keyof typeof dict.categories]}
                                            </span>
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


