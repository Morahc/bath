import DashboardHeader from "@/components/dashboard/header";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardHeader />
      <div className="py-4">{children}</div>
      <Toaster />
    </>
  );
}
