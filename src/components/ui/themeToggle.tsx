// components/ui/themeToggle.js (CẬP NHẬT)
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

// Thêm prop 'className'
export default function ThemeToggle({ className }: { className?: string }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            // Loại bỏ style cứng, áp dụng className từ ngoài
            className={`p-2 rounded-lg border transition ${className}`}
            aria-label="Toggle theme"
        >
            {/* Sử dụng resolvedTheme để hiển thị icon chính xác */}
            {theme === "dark" ? (
                <Sun className="w-5 h-5" />
            ) : (
                <Moon className="w-5 h-5" />
            )}
        </button>
    );
}