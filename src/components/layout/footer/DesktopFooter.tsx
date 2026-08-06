import Link from "next/link";

const footerLinks = [
  { label: "Sobre nosotros", href: "/about" },
  { label: "Cómo funciona", href: "/how-it-works" },
  { label: "Privacidad", href: "/privacy" },
  { label: "Contacto", href: "/contact" },
];


export function DesktopFooter() {
  return (
    <footer className="hidden border-t border-primary/20 bg-secondary/95 text-white md:block">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-lg font-semibold">Calabaza</p>
          <p className="mt-1 text-sm text-white/80">
            Descubre productos cerca de ti y reserva para recoger en tienda.
          </p>
        </div>

        <div className="flex flex-col gap-4 justify-center sm:flex-row sm:items-center sm:gap-6">
          <nav className="flex flex-wrap gap-4 text-sm text-white/80">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>

        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-sm text-white/70 sm:px-6 lg:px-8">
        © 2026 Calabaza. Todos los derechos reservados.
      </div>
    </footer>
  );
}
