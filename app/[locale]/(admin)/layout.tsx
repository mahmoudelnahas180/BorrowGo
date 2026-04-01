import SidebarAdmin from "@/components/admin/sidebar";
import MobileNavAdmin from "@/components/admin/mobile-nav";
import AdminHeader from "@/components/admin/header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-bg">
      {/* Sidebar for Desktop */}
      <SidebarAdmin />

      {/* Main Content Area */}
      <main className="flex-1 pb-24 lg:pb-0 min-h-screen overflow-x-hidden mx-6">
        <div className="flex flex-col">
          <div className="px-4 lg:px-8 border-b border-border sticky top-0 z-30 bg-bg/80 backdrop-blur-xl">
            <AdminHeader />
          </div>
          <div className="px-4 lg:px-8 py-6">
            <div className="mt-2">{children}</div>
          </div>
        </div>
      </main>

      {/* Mobile Navigation Bar */}
      <MobileNavAdmin />
    </div>
  );
}
