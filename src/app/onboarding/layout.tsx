import { Footer } from "@/modules/shared/layout/footer/Footer";
import { Header } from "@/modules/shared/layout/header/Header";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pb-20 md:pb-0">{children}</main>
      <Footer />
    </div>
  );
}