import Link from "next/link";

const links = [
  { href: "/", label: "Productos" },
  { href: "/stores", label: "Tiendas" },
  { href: "/orders", label: "Pedidos" },
  { href: "/profile", label: "Perfil" },
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h2l2 10h10l2-7H7" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
