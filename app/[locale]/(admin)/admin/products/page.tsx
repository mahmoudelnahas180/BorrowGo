"use client";

import MainTitle from "@/components/admin/MainTitle";
import { useTranslations } from "next-intl";
import InputGlobal from "@/components/inputGlobal";
import Card from "@/components/admin/UI/Card";
import TableData, { Column } from "@/components/admin/TableData";

interface ProductData {
  id: string;
  productName: string;
  category: string;
  brand: string;
  price: string;
  stock: number;
  status: "Active" | "Draft";
}

export default function Page() {
  const t = useTranslations("ProductsPage");

  // Status style helper
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-success/10 text-success border-success/20";
      case "Draft":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-text-muted/10 text-text-muted border-text-muted/20";
    }
  };

  // Move mock data here
  const data: ProductData[] = [
    {
      id: "p-1",
      productName: "iPhone 15 Pro",
      category: "Electronics",
      brand: "Apple",
      price: "$1299",
      stock: 18,
      status: "Active",
    },
    {
      id: "p-2",
      productName: "Sony WH-1000XM5",
      category: "Electronics",
      brand: "Sony",
      price: "$399",
      stock: 42,
      status: "Active",
    },
    {
      id: "p-3",
      productName: "ErgoMesh Chair",
      category: "Home",
      brand: "WorkFlex",
      price: "$259",
      stock: 0,
      status: "Draft",
    },
    {
      id: "p-4",
      productName: "iPhone 15 Pro",
      category: "Electronics",
      brand: "Apple",
      price: "$1299",
      stock: 18,
      status: "Active",
    },
    {
      id: "p-5",
      productName: "Sony WH-1000XM5",
      category: "Electronics",
      brand: "Sony",
      price: "$399",
      stock: 42,
      status: "Active",
    },
    {
      id: "p-6",
      productName: "ErgoMesh Chair",
      category: "Home",
      brand: "WorkFlex",
      price: "$259",
      stock: 0,
      status: "Draft",
    },
    {
      id: "p-7",
      productName: "iPhone 15 Pro",
      category: "Electronics",
      brand: "Apple",
      price: "$1299",
      stock: 18,
      status: "Active",
    },
    {
      id: "p-8",
      productName: "Sony WH-1000XM5",
      category: "Electronics",
      brand: "Sony",
      price: "$399",
      stock: 42,
      status: "Active",
    },
    {
      id: "p-9",
      productName: "ErgoMesh Chair",
      category: "Home",
      brand: "WorkFlex",
      price: "$259",
      stock: 0,
      status: "Draft",
    },
  ];

  // Define column configuration
  const columns: Column<ProductData>[] = [
    { header: t("product"), accessor: "productName" },
    { header: t("category"), accessor: "category" },
    { header: t("brand"), accessor: "brand" },
    {
      header: t("price"),
      accessor: "price",
      className: "font-bold text-text-primary",
    },
    { header: t("stock"), accessor: "stock" },
    {
      header: t("status"),
      accessor: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyles(
            row.status,
          )}`}>
          {t(row.status.toLowerCase())}
        </span>
      ),
      align: "center",
    },
    {
      header: t("actions"),
      accessor: () => (
        <div className="flex items-center justify-end space-x-3 rtl:space-x-reverse">
          <button className="text-xs font-bold text-text-primary hover:text-button-primary transition-colors">
            {t("viewAll")}
          </button>
          <button className="px-4 py-1.5 rounded-lg border border-border text-xs font-bold text-text-primary hover:bg-bg hover:border-text-muted transition-all duration-200 bg-surface shadow-sm active:scale-95">
            {t("edit")}
          </button>
        </div>
      ),
      align: "right",
      colSpan: 2,
    },
  ];

  return (
    <div className="space-y-6">
      <MainTitle title={t("title")} buttonadd={t("add")} />
      <Card>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex-1">
            <InputGlobal
              placeholder={t("search")}
              type="search"
              value={""}
              onChange={() => {}}
              width="full"
            />
          </div>
          <button className="bg-button-secondary hover:bg-button-secondary-hover text-button-secondary-text px-6 py-2 rounded-xl font-bold transition-all duration-200 shadow-sm active:scale-95 whitespace-nowrap">
            {t("filter")}
          </button>
        </div>
      </Card>
      <TableData data={data} columns={columns} />
    </div>
  );
}
