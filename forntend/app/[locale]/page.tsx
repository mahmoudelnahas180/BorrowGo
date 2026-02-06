import { useTranslations } from "next-intl";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function Page() {
  const t = useTranslations("HomePage");
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 bg-white dark:bg-black px-6">
      <h1 className="text-black dark:text-red-500 text-3xl font-bold text-center">
        {t("title")}
      </h1>

      <div className="flex gap-4">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </div>
  );
}
