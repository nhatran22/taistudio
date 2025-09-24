export interface Category {
    slug: string,
    titleEN: string,
    titleVI: string,
    cover: string
}

export interface Project {
    slug: string,
    categorySlug: string,
    titleEN: string,
    titleVI: string,
    descriptionEN: string,
    descriptionVI: string,
    images: Array<string>
}