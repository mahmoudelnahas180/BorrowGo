"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import NavBar from "./NavBar";
import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// moon icon
import { faMoon } from "@fortawesome/free-regular-svg-icons";
// sun icon
import { faSun } from "@fortawesome/free-regular-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import logo from "@/public/logo.png";
import SideBar from "./SideBar";
export default function UnLoginHeader() {
  const t: (key: string) => string = useTranslations("Header");

  const links: { name: string; href: string }[] = [
    { name: t("home"), href: "/home" },
    { name: t("allCategories"), href: "/categories" },
    { name: t("about"), href: "/about" },
    { name: t("contact"), href: "/contact" },
  ];
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  console.log(theme);
  const locale = useLocale();
  console.log(locale);
  const pathname = usePathname();
  console.log(pathname);

  const router = useRouter();
  console.log(router);

  const changeLanguage = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    console.log(segments);
    router.replace(segments.join("/"));
  };
  if (!mounted) return null;

  return (
    <header className="bg-bg/80 backdrop-blur-md sticky top-0 left-0 right-0 w-full text-text-primary z-50 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 lg:px-8 h-20 flex justify-between items-center relative">
        <Link href="/" className="flex-shrink-0">
          <Image
            src={logo}
            alt="logo"
            width={120}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:block">
          <NavBar links={links} />
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={changeLanguage}
            className="p-2 rounded-full text-text-primary hover:bg-surface transition-colors border border-transparent hover:border-border"
            title={t("language")}
          >
            <FontAwesomeIcon icon={faGlobe} className="w-5 h-5" />
          </button>

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 rounded-full text-text-primary hover:bg-surface transition-colors border border-transparent hover:border-border"
            title="Toggle Theme"
          >
            <FontAwesomeIcon
              icon={theme === "light" ? faMoon : faSun}
              className="w-5 h-5"
            />
          </button>

          <div className="w-px h-6 bg-border mx-2"></div>

          <Link
            href="/login"
            className="px-5 py-2 rounded-lg text-sm font-medium text-button-text bg-button-secondary hover:bg-button-secondary-hover transition-colors"
          >
            {t("login")}
          </Link>
          <Link
            href="/register"
            className="px-5 py-2 rounded-lg text-sm font-medium text-button-text bg-button-primary hover:bg-button-primary-hover transition-colors"
          >
            {t("register")}
          </Link>
        </div>

        {/* Mobile Toggle & Actions */}
        <div className="flex lg:hidden items-center gap-4">
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-2 text-text-primary"
          >
            <FontAwesomeIcon
              icon={theme === "light" ? faMoon : faSun}
              className="w-5 h-5"
            />
          </button>

          <button
            className="p-2 text-text-primary focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Sidebar */}
        {open && (
          <SideBar
            links={links}
            changeLanguage={changeLanguage}
            setTheme={setTheme}
            theme={theme}
            t={t}
          />
        )}
      </div>
    </header>
  );
}
