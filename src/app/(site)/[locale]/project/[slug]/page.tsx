import { Project } from "@/interface";
import projects from "@/content/projects.json";
import Carousel3D from "@/components/site/imageCarousel";

interface Params { params: Promise<{ locale: string; slug: string }> };

export const dynamic = "error";

export async function generateStaticParams() {
}

export default async function ProjectPage({ params }: Params) {
}
