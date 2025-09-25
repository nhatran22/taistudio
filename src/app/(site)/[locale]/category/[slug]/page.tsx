import { Category, Project } from "@/interface";
import categories from "@/content/categories.json";
import projects from "@/content/projects.json";
import Link from "next/link";
import Image from "next/image";

interface PageProps {
    params: Promise<{ locale: string; slug: string }>;
}

export const dynamic = "error";

export async function generateStaticParams() {
    const locales = ["en", "vi"] as const;
    return locales.flatMap((locale) =>
        (categories as Category[]).map((c) => ({ locale, slug: c.slug }))
    );
}

export default async function CategoryPage({ params }: PageProps) {
    const { locale, slug } = await params;
    const list = (projects as Project[]).filter(
        (p) => p.categorySlug === slug
    );
    const titleKey = locale === "en" ? "titleEN" : "titleVI";
    const getAvatar = (imageSrc: Array<string>) => {
        return imageSrc[0]
    }
    return (
        <div className="px-6 py-10">
            <h1 className="text-2xl font-semibold capitalize animate-in fade-in duration-300">{slug}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {list.map((p) => (
                    <Link
                        key={p.slug}
                        href={`/${locale}/project/${p.slug}`}
                        className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow animate-in fade-in zoom-in-95 duration-300"
                    >
                        <div className="aspect-[16/10] bg-muted">
                            <Image
                                src={getAvatar(p.images)}
                                alt={slug}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="p-4 flex items-center justify-between">
                            <span className="font-medium">{p[titleKey]}</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}