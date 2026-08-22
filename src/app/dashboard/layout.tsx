import { Footer } from "@/modules/shared/layout/footer/Footer";
import { Header } from "@/modules/shared/layout/header/Header";
import SideNav from "@/modules/dashboard/components/side-nav"
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-neutral">
      <Header />
      <main className="flex flex-1">
        <SideNav />
        <div className="flex-1 pb-20 md:pb-0">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
