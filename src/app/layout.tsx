import type { Metadata } from "next";
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
      <body className={`${hankenGrotesk.className} antialiased`}>{children}</body>
    </html>
  );
}
