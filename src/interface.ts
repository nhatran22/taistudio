export interface Category {
    slug: string,
    titleEN: string,
    titleVI: string,
    cover: string
}

export interface Project {
    slug: string,
    titleEN: string,
    titleVI: string,
    descriptionEN: string,
    descriptionVI: string,
    images: Array<Images>
}

export interface Images {
    src: string,
    descriptionVI: string,
    descriptionEN: string
}

export interface PageProps {
    params: Promise<{ locale: string; slug: string }>;
}
