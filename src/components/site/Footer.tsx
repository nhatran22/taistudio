"use client";
import { getDictionary } from "@/lib/i18n";
import { usePathname } from "next/navigation";
import Contact from "../ui/contact";

export function Footer() {
    const SUPPORTED_LOCALES = ["en", "vi"] as const;

    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);
    const currentLocale = SUPPORTED_LOCALES.includes(segments[0] as "en" | "vi")
        ? segments[0]
        : "vi";
    const dict = getDictionary(currentLocale);

    return (
        <footer className="px-6 py-10 text-sm text-muted-foreground bg-black text-center">
            <Contact />
            © {new Date().getFullYear()} {dict.brand}. {dict.footer.copyright}
        </footer>
    )
}