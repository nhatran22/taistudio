import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import Image from "next/image";
import HeroSection from "@/components/site/heroSection";

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
                    <HeroSection></HeroSection>
                </section>
                <section>
                    <div className="grid grid-rows-1 gap-6 p-8 bg-muted">
                        {["interior", "exhibition", "decoration", "urban", "engineering", "landscape"].map(
                            (slug) => (
                                <Link
                                    key={slug}
                                    href={`/${locale}/category/${slug}`}
                                    className="group overflow-hidden hover:shadow-md transition-shadow animate-in fade-in zoom-in-95 duration-1000"
                                >
                                    <div className="relative w-full h-[25vh] md:h-[50vh]">
                                        <Image
                                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop"
                                            alt={dict.categories[slug as keyof typeof dict.categories]}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    </div>
                                    <div className="p-4 flex items-center justify-between">
                                        <span className="font-bold text-xl capitalize">{dict.categories[slug as keyof typeof dict.categories]}</span>
                                        <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                    </div>
                                </Link>
                            )
                        )}
                    </div>
                </section>
            </main>
            <footer className="px-6 py-10 mt-12 text-sm text-muted-foreground">
                © {new Date().getFullYear()} {dict.brand}. {dict.footer.copyright}
            </footer>
        </div>
    );
}


