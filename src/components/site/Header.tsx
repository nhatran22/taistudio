"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ThemeToggle from "../ui/themeToggle";

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

    const withLocale = (targetLocale: "en" | "vi") => {
        if (hasLocalePrefix) {
            const rest = segments.slice(1);
            return `/${targetLocale}/${rest.join("/")}`;
        }
        if (targetLocale === "vi") return `/${segments.join("/")}` || "/";
        return `/en/${segments.join("/")}`.replace(/\/$/, "");
    };

    const [scrolled, setScrolled] = useState(false);
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!mounted) return null;

    // Tinh gọn logic cho Header và Logo/Brand (Studio)
    const headerBaseClasses = "fixed top-0 left-0 w-full z-50 transition-colors duration-300";

    // 1. Logic cho Header background/text (khi SCROLLED)
    const scrolledClasses = resolvedTheme === "dark"
        ? "bg-gray-900 shadow-md text-white"
        : "bg-white shadow-md text-gray-900"; // text-gray-900 cho logo

    // 2. Logic cho Header background/text (khi CHƯA SCROLL)
    const unScrolledClasses = resolvedTheme === "dark"
        ? "bg-gradient-to-b from-black/60 to-transparent text-white" // Logo màu trắng
        : "bg-transparent text-gray-900"; // Logo màu tối

    // 3. Hàm helper Tinh gọn cho các Button (Áp dụng cho ThemeToggle, VI/EN, Menu)
    const getButtonClasses = () => {
        if (scrolled) {
            // Khi đã scroll: sử dụng màu chuẩn của Header (scrolledClasses)
            return resolvedTheme === 'dark'
                ? "text-white border-gray-700 bg-gray-800 hover:bg-gray-700"
                : "text-gray-900 border-gray-300 bg-white hover:bg-gray-100";
        }

        // Khi chưa scroll:
        if (resolvedTheme === 'dark') {
            // Dark mode: Nút trong suốt, viền trắng, chữ trắng (phù hợp với text-white của logo)
            return "text-white bg-transparent border-white hover:bg-white/10";
        } else {
            // Light mode: Nút trong suốt, viền tối, chữ tối.
            // SỬA LỖI: Thay 'text-white' bằng 'text-gray-900' (phù hợp với text-gray-900 của logo)
            return "text-gray-900 bg-transparent border-gray-400 hover:bg-gray-100";
        }
    }

    return (
        <header
            className={`${headerBaseClasses} ${scrolled ? scrolledClasses : unScrolledClasses}`}
        >
            <div className="flex items-center justify-between px-6 py-4">
                <Link
                    href={`/${currentLocale}`}
                    // text-white/text-gray-900 đã được thiết lập qua unScrolledClasses/scrolledClasses
                    // Chỉ cần dùng className đã có (text-white/text-gray-900)
                    className="text-lg font-semibold tracking-wide"
                >
                    Studio
                </Link>

                <div className="flex items-center gap-2">
                    <ThemeToggle className={getButtonClasses()} />

                    {/* Locale switcher */}
                    <Button
                        variant="outline"
                        size="sm"
                        aria-label="Switch language"
                        className={getButtonClasses()}
                    >
                        <Link
                            href={withLocale(currentLocale === "en" ? "vi" : "en")}
                            // Bỏ class hover:text-foreground để button classes quyết định màu
                            className="sm:inline text-sm transition-colors"
                        >
                            {currentLocale === "en" ? "VI" : "EN"}
                        </Link>
                    </Button>

                    {/* Menu (Sheet) */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                aria-label="Open menu"
                                className={getButtonClasses()}
                            >
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
                                            href={
                                                "/" +
                                                currentLocale +
                                                (withLocale(currentLocale) === "/"
                                                    ? "category/" + slug
                                                    : `/category/${slug}`)
                                            }
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
            </div>
        </header>
    );
}