import { Project } from "@/interface";
import projects from "@/content/projects.json";
import Carousel3D from "@/components/site/imageCarousel";

interface PageProps {
    params: Promise<{ locale: string; slug: string }>;
}

export const dynamic = "error";

export async function generateStaticParams() {
    const locales = ["en", "vi"] as const;
    return locales.flatMap((locale) =>
        (projects as Project[]).map((c) => ({ locale, slug: c.slug }))
    );
}

export default async function CategoryPage({ params }: PageProps) {
    const { locale, slug } = await params;
    const project = (projects as Project[]).find((p) => p.slug === slug);
    if (!project) return null;

    const title = locale === "en" ? project.titleEN : project.titleVI;
    const desc = locale === "en" ? project.descriptionEN : project.descriptionVI;

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
        <div className="pt-24 pb-20 bg-white min-h-screen px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-5xl md:text-6xl text-gray-900 ont-bold max-w-4xl">
                    {title}
                </h1>
                <p className="mt-6 text-gray-700 max-w-4xl text-lg md:text-xl">
                    {parseDescription(desc)}
                </p>
            </div>
            <Carousel3D images={project.images} title={title} lang={locale} />
        </div>
    );
}