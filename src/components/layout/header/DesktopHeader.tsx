import { CartIcon } from "@/components/ui/icons";
import Link from "next/link";

const links = [
  { href: "/", label: "Productos" },
  { href: "/stores", label: "Tiendas*" },
  { href: "/orders", label: "Pedidos*" },
  {href: "/dashboard", label: "Mi tienda"},
  { href: "/profile", label: "Perfil*" },
];

export function DesktopHeader() {
  return (
    <header className="hidden border-b border-primary/20 bg-neutral md:block">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white shadow-sm">
            C
          </div>
          <div>
            <p className="text-lg font-semibold text-secondary">Calabaza</p>
          </div>
        </Link>

        <nav className="flex items-center gap-5 text-sm font-medium text-secondary/80">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/cart"
          className="rounded-full border border-primary/20 p-2.5 text-secondary transition hover:border-primary hover:text-primary"
          aria-label="Ir al carrito"
        >
          <CartIcon/>
        </Link>
      </div>
    </header>
  );
}
