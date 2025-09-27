import { Project } from "@/interface";
import projects from "@/content/projects.json";

interface Params { params: Promise<{ locale: string; slug: string }> };

export const dynamic = "error";

export async function generateStaticParams() {
    const locales = ["en", "vi"] as const;
    return locales.flatMap((locale) =>
        (projects as Project[]).map((p) => ({ locale, slug: p.slug }))
    );
}

export default async function AboutPage({ params }: Params) {
    return (
        <div className="w-full h-full">
            <div className="flex justify-center items-center">
                <span className="text-black">About Me Page</span>
            </div>
        </div>
    );
}
