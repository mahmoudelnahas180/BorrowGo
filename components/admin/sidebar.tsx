"use client";

import { usePathname, Link } from "@/i18n/navigation";
import { MdDashboard } from "react-icons/md";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { LuSettings } from "react-icons/lu";
import { useTranslations } from "next-intl";

import { ADMIN_NAV_ITEMS } from "@/lib/admin-nav";

export default function SidebarAdmin() {
  const pathname = usePathname();
  const t = useTranslations("SideBarAdmin");

  return (
    <aside className="hidden lg:flex sticky top-0 h-screen transition-all duration-300 ease-in-out border-e border-border bg-surface flex-col w-64 p-5 lg:flex-none">
      {/* Brand Section */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="flex items-center justify-center w-10 h-10 bg-button-secondary rounded-xl shadow-lg shadow-button-secondary/20">
          <MdDashboard className="text-button-primary-text text-xl" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-text-primary leading-tight">
            BorrowGo
          </h1>
          <p className="text-[10px] font-medium text-text-muted uppercase tracking-widest">
            {t("dashboard")}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar">
        {ADMIN_NAV_ITEMS.map((item) => {
          // Exactly match or subpath check (careful with /admin root)
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));
          const Icon = item.icon;
          const label = t(item.titleKey);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-3.5 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-button-secondary text-white shadow-md shadow-button-secondary/25 ring-1 ring-button-secondary/10"
                  : "text-text-secondary hover:bg-bg hover:text-text-primary"
              }`}>
              <Icon
                className={`text-lg transition-transform duration-200 group-hover:scale-110 ${
                  isActive
                    ? "text-button-secondary-text"
                    : "text-text-muted group-hover:text-button-secondary"
                }`}
              />
              <span className="flex-1">{label}</span>
              {isActive && (
                <div className="w-1 h-4 bg-button-secondary-text/20 rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="mt-8 pt-6 border-t border-border space-y-1.5 text-center">
        <Link
          href="/admin/settings"
          className="flex items-center gap-3.5 px-3 py-2.5 text-sm font-medium rounded-xl text-text-secondary hover:bg-bg transition-all duration-200">
          <LuSettings className="text-lg text-text-muted" />
          {t("settings")}
        </Link>
        <button className="w-full flex items-center gap-3.5 px-3 py-2.5 text-sm font-medium rounded-xl text-error hover:bg-error/10 transition-all duration-200 group">
          <FaArrowRightFromBracket className="text-lg rotate-180 group-hover:translate-x-1 transition-transform rtl:rotate-0 rtl:group-hover:-translate-x-1" />
          {t("logout")}
        </button>
      </div>
    </aside>
  );
}
