"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react"; // Importing icons for search and menu

const categories = [
    "interior",
    "exhibition",
    "decoration",
    "urban",
    "engineering",
    "landscape",
];

// Define a type for the locales
type Locale = "en" | "vi";

export function Header() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);
    const hasLocalePrefix = segments[0] === "en" || segments[0] === "vi";
    const currentLocale: Locale = hasLocalePrefix ? (segments[0] as Locale) : "vi";

    const withLocale = (targetLocale: Locale) => {
        if (hasLocalePrefix) {
            const rest = segments.slice(1);
            return `/${targetLocale}/${rest.join("/")}`;
        }
        if (targetLocale === "vi") return `/${segments.join("/")}` || "/";
        return `/en/${segments.join("/")}`.replace(/\/$/, "");
    };

    // State for tracking scroll position for a simple background change (like the first image)
    const [scrolled, setScrolled] = useState(false);
    // State for the hide/show on scroll behavior
    const [visible, setVisible] = useState(true);
    // State to handle the hover-like effect when the menu/sheet is open
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Ref to store the last scroll position
    const lastScrollY = useRef(0);

    // Handler for hide-on-scroll-down/show-on-scroll-up
    const handleScroll = useCallback(() => {
        const currentScrollY = window.scrollY;

        // Simple check for background change (scrolled > 50px)
        setScrolled(currentScrollY > 50);

        // Hide on scroll down, show on scroll up logic
        if (currentScrollY > 100) { // Start hiding only after scrolling a bit
            if (currentScrollY > lastScrollY.current && visible) {
                // Scrolling down
                setVisible(false);
            } else if (currentScrollY < lastScrollY.current && !visible) {
                // Scrolling up
                setVisible(true);
            }
        } else {
            // Always show the header at the very top of the page
            setVisible(true);
        }

        lastScrollY.current = currentScrollY;
    }, [visible]);

    useEffect(() => {
        setMounted(true);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]); // Dependency on handleScroll which depends on 'visible'

    if (!mounted) return null;

    // Determine the header's style based on scroll, menu state, and visibility
    const baseClasses = `fixed top-0 left-0 w-full z-50 transition-all ease-in-out duration-300`;

    // Style for the 'scrolled/dark' state (like image 2)
    const darkStyle = "bg-gray-900 shadow-md text-white";
    // Style for the 'top/transparent' state (like image 1)
    const transparentStyle = "bg-gradient-to-b from-black/80 to-transparent text-white";

    // Determine background and text color based on states
    const headerStyle = !scrolled && !isMenuOpen ? transparentStyle : darkStyle;

    // Apply visibility class
    const visibilityClass = visible ? 'translate-y-0' : '-translate-y-full';

    // The component name on the left (using a placeholder like in your code)
    const brandName = "Studio"; // You can change this to "Foster + Partners" if you like

    return (
        <header
            className={`${baseClasses} ${headerStyle} ${visibilityClass}`}
        >
            <div className="flex items-center justify-between px-6 py-4 transition-all duration-300">
                {/* Brand Link (Styled like "Foster + Partners") */}
                <Link
                    href={`/${currentLocale}`}
                    className={`text-lg font-normal tracking-wider uppercase text-white hover:opacity-80 transition-opacity`}
                >
                    {brandName}
                </Link>

                <div className="flex items-center gap-4">
                    <Link
                        href={withLocale(currentLocale === "en" ? "vi" : "en")}
                        className="text-white text-sm font-light hover:opacity-80 transition-opacity uppercase"
                        aria-label="Switch language"
                    >
                        {currentLocale === "en" ? "VI" : "EN"}
                    </Link>

                    {/* Menu (Sheet) - Styled to look like the image's menu icon */}
                    <Sheet onOpenChange={setIsMenuOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="sm" aria-label="Open menu" className="p-0 h-auto text-white hover:bg-transparent">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        {/* Sheet Content (Menu) */}
                        <SheetContent side="right" className="w-72">
                            <SheetHeader className="h-[50px] p-2">
                                <SheetTitle className="max-h font-bold text-xl">Menu</SheetTitle>
                            </SheetHeader>
                            <nav className="grid gap-2">
                                {/* ... links */}
                                {categories.map((slug) => (
                                    <SheetClose asChild key={slug}>
                                        <Link
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