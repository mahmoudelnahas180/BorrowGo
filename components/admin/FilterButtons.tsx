"use client";

import { useTranslations } from "next-intl";

interface FilterButtonsProps {
  statuses: string[];
  activeStatus: string;
  onStatusChange: (status: string) => void;
}

export default function FilterButtons({
  statuses,
  activeStatus,
  onStatusChange,
}: FilterButtonsProps) {
  const t = useTranslations("OrdersPage");

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => onStatusChange(status)}
          className={`px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
            activeStatus === status
              ? "bg-primary text-white shadow-md"
              : "bg-surface text-text-primary hover:bg-bg"
          }`}>
          {t(status.toLowerCase())}
        </button>
      ))}
    </div>
  );
}
