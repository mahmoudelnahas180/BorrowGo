"use client";

import MainTitle from "@/components/admin/MainTitle";
import { useTranslations } from "next-intl";
import InputGlobal from "@/components/inputGlobal";
import Card from "@/components/admin/UI/Card";
import TableData, { Column } from "@/components/admin/TableData";
import FilterButtons from "@/components/admin/FilterButtons";
import { useState } from "react";

interface OrderData {
  id: string;
  customer: string;
  total: string;
  payment: string;
  status: string;
  date: string;
}

export default function Page() {
  const t = useTranslations("OrdersPage");
  const [activeStatus, setActiveStatus] = useState("All");

  const statuses = ["All", "Pending", "Paid", "Delivered"];

  // Status style helper
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "Paid":
        return "bg-info/10 text-info border-info/20";
      case "Delivered":
        return "bg-success/10 text-success border-success/20";
      default:
        return "bg-text-muted/10 text-text-muted border-text-muted/20";
    }
  };

  // Move mock data here
  const data: OrderData[] = [
    {
      id: "ord-1001",
      customer: "Ahmed Ali",
      total: "$1399",
      payment: "Cash",
      status: "Pending",
      date: "2026-03-20",
    },
    {
      id: "ord-1002",
      customer: "Mariam Hassan",
      total: "$229",
      payment: "Card",
      status: "Paid",
      date: "2026-03-21",
    },
    {
      id: "ord-1003",
      customer: "Nour Emad",
      total: "$89",
      payment: "Card",
      status: "Delivered",
      date: "2026-03-22",
    },
    {
      id: "ord-1004",
      customer: "Zaid Omar",
      total: "$450",
      payment: "Cash",
      status: "Pending",
      date: "2026-03-23",
    },
    {
      id: "ord-1005",
      customer: "Sara Jameel",
      total: "$1200",
      payment: "Card",
      status: "Paid",
      date: "2026-03-24",
    },
    {
      id: "ord-1006",
      customer: "Ahmed Ali",
      total: "$1399",
      payment: "Cash",
      status: "Pending",
      date: "2026-03-20",
    },
    {
      id: "ord-1007",
      customer: "Mariam Hassan",
      total: "$229",
      payment: "Card",
      status: "Paid",
      date: "2026-03-21",
    },
    {
      id: "ord-1008",
      customer: "Nour Emad",
      total: "$89",
      payment: "Card",
      status: "Delivered",
      date: "2026-03-22",
    },
    {
      id: "ord-1009",
      customer: "Zaid Omar",
      total: "$450",
      payment: "Cash",
      status: "Pending",
      date: "2026-03-23",
    },
    {
      id: "ord-1010",
      customer: "Sara Jameel",
      total: "$1200",
      payment: "Card",
      status: "Paid",
      date: "2026-03-24",
    },
  ];

  // Define column configuration
  const columns: Column<OrderData>[] = [
    { header: t("orderId"), accessor: "id" },
    { header: t("customer"), accessor: "customer" },
    {
      header: t("total"),
      accessor: "total",
      className: "font-bold text-text-primary",
    },
    { header: t("payment"), accessor: "payment" },
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
    { header: t("date"), accessor: "date" },
    {
      header: t("actions"),
      accessor: () => (
        <div className="flex items-center justify-end space-x-3 rtl:space-x-reverse">
          <button className="text-xs font-bold text-text-primary hover:text-button-primary transition-colors">
            {t("markPaid")}
          </button>
          <button className="px-4 py-1.5 rounded-lg border border-border text-xs font-bold text-text-primary hover:bg-bg hover:border-text-muted transition-all duration-200 bg-surface shadow-sm active:scale-95">
            {t("deliver")}
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
        <FilterButtons
          statuses={statuses}
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
        />
      </Card>
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
