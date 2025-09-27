import type { MetadataRoute } from "next";
import categories from "@/content/categories.json";
import projects from "@/content/projects.json";
import { Category, Project } from "@/interface";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const locales = ["en", "vi"] as const;
    const staticPages = locales.map((locale) => ({
        url: `${BASE_URL}/${locale}`,
        lastModified: new Date(),
        alternates: {
            languages: {
                en: `${BASE_URL}/en`,
                vi: `${BASE_URL}/vi`,
            },
        },
    }));

    const categoryPages = locales.flatMap((locale) =>
        (categories as Category[]).map((c) => ({
            url: `${BASE_URL}/${locale}/category/${c.slug}`,
            lastModified: new Date(),
        }))
    );

    const aboutMePages = locales.flatMap((locale) => ({
        url: `${BASE_URL}/${locale}/about`,
        lastModified: new Date(),
        alternates: {
            languages: {
                en: `${BASE_URL}/en`,
                vi: `${BASE_URL}/vi`,
            },
        },
    }))

    return [...staticPages, ...categoryPages, ...aboutMePages];
}


