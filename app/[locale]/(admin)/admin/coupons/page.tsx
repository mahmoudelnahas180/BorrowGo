"use client";

import { useState } from "react";
import MainTitle from "@/components/admin/MainTitle";
import { useTranslations } from "next-intl";
import Card from "@/components/admin/UI/Card";
import TableData, { Column } from "@/components/admin/TableData";

interface CouponData {
  id: string;
  code: string;
  discount: string;
  expires: string;
  status: "Active" | "Inactive";
}

export default function Page() {
  const t = useTranslations("CouponsPage");
  const [showInactive, setShowInactive] = useState(false);

  const getStatusStyles = (status: CouponData["status"]) => {
    switch (status) {
      case "Active":
        return "bg-success/10 text-success border-success/20";
      case "Inactive":
        return "bg-warning/10 text-warning border-warning/20";
      default:
        return "bg-text-muted/10 text-text-muted border-text-muted/20";
    }
  };

  const data: CouponData[] = [
    {
      id: "cp-1",
      code: "SAVE20",
      discount: "20%",
      expires: "2026-12-31",
      status: "Active",
    },
    {
      id: "cp-2",
      code: "WELCOME10",
      discount: "10%",
      expires: "2026-06-30",
      status: "Active",
    },
    {
      id: "cp-3",
      code: "OLD15",
      discount: "15%",
      expires: "2025-12-31",
      status: "Inactive",
    },
  ];

  const filteredData = showInactive
    ? data
    : data.filter((coupon) => coupon.status === "Active");

  const columns: Column<CouponData>[] = [
    { header: t("code"), accessor: "code" },
    { header: t("discount"), accessor: "discount" },
    { header: t("expires"), accessor: "expires" },
    {
      header: t("status"),
      accessor: (row) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusStyles(row.status)}`}>
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
            {t("edit")}
          </button>
          <button className="px-4 py-1.5 rounded-lg border border-error bg-error text-error-text text-xs font-bold hover:bg-error/90 transition-all duration-200 shadow-sm active:scale-95">
            {t("delete")}
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
        <label className="inline-flex items-center gap-2 text-text-primary font-medium cursor-pointer">
          <input
            type="checkbox"
            checked={showInactive}
            onChange={(e) => setShowInactive(e.target.checked)}
            className="h-4 w-4 rounded border-border text-button-secondary focus:ring-button-secondary"
          />
          {t("showInactive")}
        </label>
      </Card>

      <TableData data={filteredData} columns={columns} />
    </div>
  );
}
