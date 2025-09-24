import projects from "@/content/projects.json";
import Image from "next/image";

type Params = { params: { locale: string; slug: string } };

export const dynamic = "error";

export async function generateStaticParams() {
    const locales = ["en", "vi"] as const;
    return locales.flatMap((locale) =>
        (projects as any[]).map((p) => ({ locale, slug: p.slug }))
    );
}

export default function ProjectPage({ params }: Params) {
    const project = (projects as any[]).find((p) => p.slug === params.slug);
    if (!project) return null;
    const title = params.locale === "en" ? project.titleEN : project.titleVI;
    const desc =
        params.locale === "en" ? project.descriptionEN : project.descriptionVI;
    return (
        <div className="px-6 py-10">
            <h1 className="text-3xl font-semibold animate-in fade-in duration-300">{title}</h1>
            <p className="mt-3 text-muted-foreground max-w-3xl animate-in fade-in slide-in-from-bottom-2 duration-500">{desc}</p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.images.map((src: string, idx: number) => (
                    <div key={idx} className="relative aspect-[4/3] overflow-hidden rounded-md animate-in fade-in zoom-in-95 duration-300">
                        <Image
                            src={src}
                            alt={title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}


