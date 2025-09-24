import en from "@/i18n/en.json";
import vi from "@/i18n/vi.json";

export type Locale = "en" | "vi";

export const locales: Locale[] = ["en", "vi"];
export const defaultLocale: Locale = "vi";

export function getDictionary(locale: string) {
    return locale === "en" ? en : vi;
}


