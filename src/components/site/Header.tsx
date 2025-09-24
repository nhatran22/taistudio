"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const categories = [
    "interior",
    "exhibition",
    "decoration",
    "urban",
    "engineering",
    "landscape",
];

export function Header() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);
    const hasLocalePrefix = segments[0] === "en" || segments[0] === "vi";
    const currentLocale = hasLocalePrefix ? (segments[0] as "en" | "vi") : "vi";

    console.log(currentLocale);

    const withLocale = (targetLocale: "en" | "vi") => {
        if (hasLocalePrefix) {
            const rest = segments.slice(1);
            return `/${targetLocale}/${rest.join("/")}`;
        }
        // no prefix -> vi is default at root, en uses /en
        if (targetLocale === "vi") return `/${segments.join("/")}` || "/";
        return `/en/${segments.join("/")}`.replace(/\/$/, "");
    };

    return (
        <header className="flex items-center justify-between px-6 py-4">
            <Link href={`/${currentLocale}`} className="text-lg font-semibold tracking-wide">
                Studio
            </Link>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" aria-label="Open menu">
                    <Link
                        href={withLocale(currentLocale === "en" ? "vi" : "en")}
                        className="sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {currentLocale === "en" ? "VI" : "EN"}
                    </Link>
                </Button>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="sm" aria-label="Open menu">
                            ☰
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-72">
                        <SheetHeader className="h-[50px] p-2">
                            <SheetTitle className="max-h font-bold text-xl">Menu</SheetTitle>
                        </SheetHeader>
                        <nav className="grid gap-2">
                            {categories.map((slug) => (
                                <SheetClose asChild key={slug}>
                                    <Link
                                        key={slug}
                                        href={"/" + currentLocale + (withLocale(currentLocale) === "/" ? "category/" + slug : `/category/${slug}`)}
                                        className="px-2 py-2 rounded hover:bg-muted transition-colors capitalize"
                                    >
                                        {slug}
                                    </Link>
                                </SheetClose>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </header>
    );
}


