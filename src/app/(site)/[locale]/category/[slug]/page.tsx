import projects from "@/content/projects.json";
import Carousel3D from "@/components/site/imageCarousel";

interface PageProps {
    params: Promise<{ locale: string; slug: string }>;
}

export const dynamic = "error";

export async function generateStaticParams() {
    const locales = ["en", "vi"] as const;
    return locales.flatMap((locale) =>
        (projects).map((c) => ({ locale, slug: c.slug }))
    );
}

export default async function CategoryPage({ params }: PageProps) {
    const { locale, slug } = await params;
    const project = (projects).find((p) => p.slug === slug);
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
            <div className="w-full mx-auto">
                <h1 className="text-3xl md:text-6xl text-gray-900 font-bold w-full text-center">
                    {title}
                </h1>
                <div className="grid md:flex md:justify-between pt-2 text-gray-500 font-light">
                    <span><span className="font-bold">COMPLETED: </span>{project.comletedYear}</span>
                    <span><span className="font-bold">DESIGNER: </span>{locale === "en" ? project.designerEN : project.designerVI}</span>
                    <span><span className="font-bold">CLIENT: </span>{locale === "en" ? project.clientEN : project.clientVI}</span>
                    {project.prize && (
                        <span><span className="font-bold">AWARD: </span>{project.prize}</span>
                    )}
                </div>
                <p className="mt-6 text-gray-700 w-1/2 text-xm md:text-base mx-auto text-center">
                    {parseDescription(desc)}
                </p>
            </div>
            <Carousel3D images={project.images} title={title} lang={locale} />
        </div>
    );
}