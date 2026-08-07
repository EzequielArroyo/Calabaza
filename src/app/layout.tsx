import type { Metadata } from "next";
import { Footer } from "@/components/layout/footer/Footer";
import { Header } from "@/components/layout/header/Header";
import "./globals.css";
import { hankenGrotesk } from "@/components/ui/fonts";

export const metadata: Metadata = {
  title: "Calabaza",
  description: "Discover and reserve products from nearby local stores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${hankenGrotesk.className} antialiased`}>
        <div className="flex min-h-screen flex-col bg-neutral">
          <Header />
          <main className="flex-1 pb-20 md:pb-0">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
