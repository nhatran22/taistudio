import { Project } from "@/interface";
import projects from "@/content/projects.json";
import Carousel3D from "@/components/site/imageCarousel";
import { getDictionary } from "@/lib/i18n";

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


    return (
        <div className="pt-24 py-10 bg-black">
            <h1 className="text-3xl text-white font-semibold">{title}</h1>
            <p className="mt-3 text-muted-foreground max-w-3xl">{desc}</p>
            <Carousel3D images={project.images} title={title} />
        </div>
    );
}