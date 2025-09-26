import type { ReactNode } from "react";
import { Header } from "@/components/site/Header";
import type { Metadata } from "next";
import { Providers } from "@/app/provider";

interface LayoutProps {
    children: ReactNode;
    params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
    alternates: {
        languages: {
            en: "/en",
            vi: "/",
        },
    },
};

export default async function LocaleLayout({ children, params }: LayoutProps) {
    const { locale } = await params;
    const lang = locale === "en" ? "en" : "vi";
    return (
        <>
            <Providers>
                <Header />
                <main lang={lang} suppressHydrationWarning>
                    {children}
                </main>
            </Providers>
        </>
    );
}


