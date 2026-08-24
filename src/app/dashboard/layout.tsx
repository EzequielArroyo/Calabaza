import { Footer } from "@/components/layout/footer/Footer";
import { Header } from "@/components/layout/header/Header";
import DashboardNav from "@/modules/dashboard/components/dashboard-nav";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral">
      <Header />
      <main className="flex flex-col md:flex-row">
        <DashboardNav />
        <div className="flex-1 pb-20 md:pb-0">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
