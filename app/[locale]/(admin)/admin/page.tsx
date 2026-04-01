"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

interface StatCardProps {
  label: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
}

function StatCard({ label, value, change, icon }: StatCardProps) {
  return (
    <div className="bg-surface rounded-lg p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-text-muted text-sm font-medium">{label}</h3>
        <div className="bg-primary/10 text-primary p-2 rounded-lg">{icon}</div>
      </div>
      <div className="mb-2">
        <p className="text-3xl font-bold text-text-primary">{value}</p>
      </div>
      <p className="text-sm text-success">{change}</p>
    </div>
  );
}

interface AnalyticsItemProps {
  label: string;
  value: number;
}

function AnalyticsItem({ label, value }: AnalyticsItemProps) {
  return (
    <div className="bg-surface rounded-lg p-4">
      <p className="text-text-muted text-sm mb-2">{label}</p>
      <p className="text-2xl font-bold text-text-primary">{value}</p>
    </div>
  );
}

interface OrderItemProps {
  id: string;
  customer: string;
  date: string;
  amount: string;
  status: "Pending" | "Paid" | "Delivered";
}

function OrderItem({ id, customer, date, amount, status }: OrderItemProps) {
  const statusColors = {
    Pending: "text-warning",
    Paid: "text-info",
    Delivered: "text-success",
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-border last:border-b-0">
      <div>
        <p className="font-bold text-text-primary">{id}</p>
        <p className="text-sm text-text-muted">
          {customer} - {date}
        </p>
      </div>
      <div className="text-right">
        <p className="font-bold text-text-primary">{amount}</p>
        <p className={`text-sm font-bold ${statusColors[status]}`}>{status}</p>
      </div>
    </div>
  );
}

interface QuickActionProps {
  label: string;
  icon: React.ReactNode;
  href: string;
}

function QuickAction({ label, icon, href }: QuickActionProps) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-3 rtl:space-x-reverse p-4 hover:bg-bg rounded-lg transition-colors">
      <div className="text-primary text-xl">{icon}</div>
      <span className="font-medium text-text-primary">{label}</span>
    </Link>
  );
}

export default function Dashboard() {
  const t = useTranslations("Dashboard");

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label={t("totalRevenue")}
          value="$245,600"
          change="+11.4% this month"
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8.16 5a.75.75 0 00-.712 1.05l1.952 3.744H3.75a.75.75 0 000 1.5h4.528l-1.951 3.744A.75.75 0 008.16 16a.75.75 0 00.712-1.051l-1.952-3.744h4.528a.75.75 0 000-1.5H6.92l1.951-3.744A.75.75 0 008.16 5z" />
            </svg>
          }
        />
        <StatCard
          label={t("totalOrders")}
          value="3,280"
          change="+8.2% this month"
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948-.684l1.498-4.493a1 1 0 011.502-.684l1.498 4.493a1 1 0 00.948.684H15a2 2 0 012 2v2a1 1 0 11-2 0V5H5v2a1 1 0 11-2 0V5z" />
            </svg>
          }
        />
        <StatCard
          label={t("activeUsers")}
          value="14,220"
          change="+5.1% this month"
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
          }
        />
        <StatCard
          label={t("conversion")}
          value="3.9%"
          change="+0.7pp this week"
          icon={
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          }
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Performance */}
        <div className="lg:col-span-2 space-y-6">
          {/* Analytics */}
          <div className="bg-surface rounded-lg p-6 shadow-sm border border-border">
            <h2 className="text-lg font-bold text-text-primary mb-2">
              {t("salesPerformance")}
            </h2>
            <p className="text-text-muted text-sm mb-6">
              {t("analyticsDescription")}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <AnalyticsItem label={t("productsLive")} value={8} />
              <AnalyticsItem label={t("ordersPaid")} value={2} />
              <AnalyticsItem label={t("pendingOrders")} value={1} />
            </div>

            {/* Revenue Trend Chart */}
            <div className="bg-surface-container rounded-lg p-6 text-text-primary">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold">{t("revenueTrend")}</h3>
                <span className="text-sm text-text-muted">
                  {t("last7Days")}
                </span>
              </div>
              <div className="flex items-end justify-between space-x-2 h-32">
                {[40, 60, 45, 70, 55, 80, 65].map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-secondary rounded"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-surface rounded-lg p-6 shadow-sm border border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-text-primary">
                {t("recentOrders")}
              </h2>
              <Link
                href="/en/admin/orders"
                className="text-primary hover:underline text-sm font-bold">
                {t("viewAll")}
              </Link>
            </div>

            <div>
              <OrderItem
                id="ord-1001"
                customer="Ahmed Ali"
                date="2026-03-20"
                amount="$1399"
                status="Pending"
              />
              <OrderItem
                id="ord-1002"
                customer="Mariam Hassan"
                date="2026-03-21"
                amount="$229"
                status="Paid"
              />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-surface rounded-lg p-6 shadow-sm border border-border h-fit">
          <h2 className="text-lg font-bold text-text-primary mb-4">
            {t("quickActions")}
          </h2>

          <div className="space-y-2">
            <QuickAction
              label={t("reviewNewOrders")}
              icon="📋"
              href="/en/admin/orders"
            />
            <QuickAction
              label={t("manageCategories")}
              icon="📁"
              href="/en/admin/categories"
            />
            <QuickAction
              label={t("createCoupon")}
              icon="🏷️"
              href="/en/admin/coupons"
            />
            <QuickAction
              label={t("moderateProducts")}
              icon="🛡️"
              href="/en/admin/products"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
