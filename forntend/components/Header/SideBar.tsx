"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { usePathname } from "next/navigation";

type SideBarProps = {
  links: {
    name: string;
    href: string;
  }[];
  changeLanguage: () => void;
  setTheme: (theme: string) => void;
  theme: string;
  t: (key: string) => string;
};

export default function SideBar({ links, changeLanguage, t }: SideBarProps) {
  const pathname = usePathname();
  const pathonly = pathname.replace(/^\/(en|ar)/, "");

  return (
    <aside className="w-full absolute top-full left-0 bg-surface shadow-lg lg:hidden transition-all duration-300 z-50 rounded-b-lg border-t border-border">
      <ul className="flex flex-col p-4 gap-2">
        {links.map((link) => {
          const isActive = pathonly === link.href;
          return (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`block px-4 py-2 rounded-lg transition-colors duration-200 
                  ${
                    isActive
                      ? "text-link-active bg-bg font-semibold"
                      : "text-text-primary hover:bg-bg hover:text-primary"
                  }`}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="p-4 border-t border-border flex flex-col gap-3">
        <button
          onClick={changeLanguage}
          className="flex items-center justify-center gap-2 w-full px-4 py-2 text-text-primary border border-border rounded-lg hover:bg-bg transition-colors"
        >
          <span>{t("language")}</span>
          <FontAwesomeIcon icon={faGlobe} className="w-4 h-4" />
        </button>

        <div className="flex flex-col gap-2">
          <Link
            href="/login"
            className="block w-full px-4 py-2 text-center text-button-text bg-button-secondary rounded-lg hover:bg-button-secondary-hover transition-colors"
          >
            {t("login")}
          </Link>
          <Link
            href="/register"
            className="block w-full px-4 py-2 text-center text-button-text bg-button-primary rounded-lg hover:bg-button-primary-hover transition-colors"
          >
            {t("register")}
          </Link>
        </div>
      </div>
    </aside>
  );
}
