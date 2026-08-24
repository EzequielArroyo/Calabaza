import Link from "next/link";

const footerLinks = [
  { label: "Sobre nosotros", href: "/about" },
  { label: "Cómo funciona", href: "/how-it-works" },
  { label: "Privacidad", href: "/privacy" },
  { label: "Contacto", href: "/contact" },
];


export function DesktopFooter() {
  return (
    <footer className="bg-surface border-t border-text-secondary/40 py-6 px-4 md:px-6 mt-auto w-full z-10 pb-24 md:pb-6">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xl text-primary flex items-center gap-2">Calabaza</div>
        <nav className="flex flex-wrap justify-center gap-6 text-text-secondary  text-sm">
          <a href="#" className="hover:text-primary transition-colors">
            Contacto
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Sobre Nosotros
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Términos
          </a>
          <a href="#" className="hover:text-primary transition-colors">
            Privacidad
          </a>
        </nav>
        <div className="text-text-secondary  text-sm">
          © 2024 Calabaza Marketplace
        </div>
      </div>
    </footer>
  );
}
