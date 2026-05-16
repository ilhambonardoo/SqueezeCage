import Sidebar from "@/src/components/Layouts/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full bg-white dark:bg-neutral-900">
      <Sidebar />
      <main className="flex-1 w-full overflow-x-hidden">{children}</main>
    </div>
  );
}
