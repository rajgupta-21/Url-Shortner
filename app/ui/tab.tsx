import Sidebar from "@/app/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      {/* Right Side */}
      <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">{children}</div>
    </div>
  );
}
