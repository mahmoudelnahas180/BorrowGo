"use client";

import MainTitle from "@/components/admin/MainTitle";
import { useTranslations } from "next-intl";
import InputGlobal from "@/components/inputGlobal";
import Card from "@/components/admin/UI/Card";
import TableData, { Column } from "@/components/admin/TableData";

interface CategoryData {
  id: string;
  category: string;
  subcategories: string;
  products: number;
}

export default function Page() {
  const t = useTranslations("CategoriesPage");

  const data: CategoryData[] = [
    {
      id: "cat-1",
      category: "Electronics",
      subcategories: "Smartphones, Headphones, Laptops",
      products: 320,
    },
    {
      id: "cat-2",
      category: "Home",
      subcategories: "Furniture, Lighting, Decor",
      products: 145,
    },
    {
      id: "cat-3",
      category: "Fashion",
      subcategories: "Shoes, Bags, Accessories",
      products: 260,
    },
  ];

  const columns: Column<CategoryData>[] = [
    { header: t("category"), accessor: "category" },
    { header: t("subcategories"), accessor: "subcategories" },
    { header: t("products"), accessor: "products" },
    {
      header: t("actions"),
      accessor: () => (
        <div className="flex items-center justify-end space-x-3 rtl:space-x-reverse">
          <button className="text-xs font-bold text-text-primary hover:text-button-primary transition-colors">
            {t("edit")}
          </button>
          <button className="px-4 py-1.5 rounded-lg border border-error bg-error text-error-text text-xs font-bold hover:bg-error/90 transition-all duration-200 shadow-sm active:scale-95">
            {t("delete")}
          </button>
        </div>
      ),
      align: "right",
    },
  ];

  return (
    <div className="space-y-6">
      <MainTitle title={t("title")} buttonadd={t("add")} />
      <Card>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex-1">
            <label
              htmlFor="search"
              className="text-sm font-bold text-text-primary">
              {t("searchLabel")}
            </label>
            <InputGlobal
              id="search"
              placeholder={t("searchPlaceholder")}
              type="search"
              value={""}
              onChange={() => {}}
              width="full"
            />
          </div>
        </div>
      </Card>
      <TableData data={data} columns={columns} />
    </div>
  );
}
