export interface Category {
    slug: string,
    titleEN: string,
    titleVI: string,
    cover: string
}

export interface Project {
    slug: string,
    completedYear: string,
    titleEN: string,
    titleVI: string,
    designerVI: string,
    designerEN: string,
    clientEN: string,
    clientVI: string,
    descriptionEN: string,
    descriptionVI: string,
    prize?: string,
    images: Array<Images>
}

export interface Images {
    src: string,
}

export interface PageProps {
    params: Promise<{ locale: string; slug: string }>;
}
