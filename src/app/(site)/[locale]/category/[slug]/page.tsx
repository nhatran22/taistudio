import categories from "@/content/categories.json";
import projects from "@/content/projects.json";
import Link from "next/link";

type Params = { params: { locale: string; slug: string } };

export const dynamic = "error";

export async function generateStaticParams() {
    const locales = ["en", "vi"] as const;
    return locales.flatMap((locale) =>
        (categories as any[]).map((c) => ({ locale, slug: c.slug }))
    );
}

export default function CategoryPage({ params }: Params) {
    const list = (projects as any[]).filter(
        (p) => p.categorySlug === params.slug
    );
    const titleKey = params.locale === "en" ? "titleEN" : "titleVI";
    return (
        <div className="px-6 py-10">
            <h1 className="text-2xl font-semibold capitalize animate-in fade-in duration-300">{params.slug}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {list.map((p) => (
                    <Link
                        key={p.slug}
                        href={`/${params.locale}/project/${p.slug}`}
                        className="group border rounded-lg overflow-hidden hover:shadow-md transition-shadow animate-in fade-in zoom-in-95 duration-300"
                    >
                        <div className="aspect-[16/10] bg-muted" />
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


