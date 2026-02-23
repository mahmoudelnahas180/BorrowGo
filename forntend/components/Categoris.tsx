import { Link } from "@/i18n/navigation";
import CategoryCard from "./CategoryCard";
import { useTranslations } from "next-intl";
export default function Categories() {
  const t = useTranslations("Categories");
  return (
    <section className="mt-8">
      <div className="container mx-auto bg-surface rounded-3xl shadow-sm px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-text-primary">{t("title")}</h2>
          <Link
            href="/categories"
            className="text-button-secondary hover:text-button-secondary-hover hover:underline hover:underline-offset-4"
          >
            {t("viewAll")}
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-slate-400">
          <CategoryCard />
        </div>
      </div>
    </section>
  );
}
