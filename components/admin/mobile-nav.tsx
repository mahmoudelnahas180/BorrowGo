"use client";

import { usePathname, Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import { ADMIN_NAV_ITEMS } from "@/lib/admin-nav";

export default function MobileNavAdmin() {
  const pathname = usePathname();
  const t = useTranslations("SideBarAdmin");

  // Filter out subcategories for mobile bottom nav to ensure 6 items max
  const menuItems = ADMIN_NAV_ITEMS.filter(
    (item) => item.titleKey !== "subcategories"
  );

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface/80 backdrop-blur-md border-t border-border pb-safe-area-inset-bottom pt-3 px-1 z-[100]">
      <div className="flex justify-around items-end max-w-lg mx-auto overflow-x-auto no-scrollbar">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center gap-1.5 min-w-[16%] py-1 relative group"
            >
              <div
                className={`flex items-center justify-center w-12 h-8 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-link-active/15 text-link-active"
                    : "text-text-muted group-hover:text-text-secondary"
                }`}
              >
                <Icon className={`text-xl ${isActive ? "scale-110" : ""}`} />
              </div>
              <span
                className={`text-[9.5px] font-bold tracking-tight whitespace-nowrap transition-colors duration-200 ${
                  isActive
                    ? "text-link-active"
                    : "text-text-muted"
                }`}
              >
                {t(item.titleKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
