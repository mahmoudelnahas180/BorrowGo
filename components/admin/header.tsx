"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  IoNotificationsOutline,
  IoDownloadOutline,
  IoMoonOutline,
  IoSunnyOutline,
  IoLanguageOutline,
} from "react-icons/io5";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function AdminHeader() {
  const t = useTranslations("AdminHeader");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering theme-specific UI after mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const nextLocale = locale === "ar" ? "en" : "ar";
    router.replace(pathname, { locale: nextLocale });
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="flex flex-row items-center justify-between gap-4 py-6">
      {/* Title & Subtitle */}
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          {t("title")}
        </h1>
        <p className="text-[13px] font-medium text-text-secondary leading-relaxed max-w-xl">
          {t("subtitle")}
        </p>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-2.5">
        {/* Language Toggle */}
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 h-10 rounded-full bg-surface text-text-secondary hover:bg-bg transition-all duration-200 shadow-sm border border-border group"
          aria-label={t("languageToggle")}
          title={t("languageToggle")}
        >
          <IoLanguageOutline
            size={18}
            className="group-hover:rotate-12 transition-transform"
          />
          <span className="text-xs font-bold uppercase tracking-wider">
            {locale === "ar" ? "EN" : "AR"}
          </span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-surface text-text-secondary hover:bg-bg transition-all duration-200 shadow-sm border border-border"
          aria-label={t("themeToggle")}
          title={t("themeToggle")}
        >
          {!mounted ? (
            <div className="w-5 h-5" />
          ) : theme === "dark" ? (
            <IoSunnyOutline size={20} className="text-warning" />
          ) : (
            <IoMoonOutline size={20} className="text-text-primary" />
          )}
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-surface text-text-secondary hover:bg-bg transition-all duration-200 shadow-sm border border-border"
          aria-label="Notifications"
        >
          <IoNotificationsOutline size={20} />
        </button>
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full bg-surface text-text-secondary hover:bg-bg transition-all duration-200 shadow-sm border border-border"
          aria-label="Download Report"
        >
          <IoDownloadOutline size={20} />
        </button>
      </div>
    </header>
  );
}
