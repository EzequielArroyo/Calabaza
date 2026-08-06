import Link from "next/link";
import type { ReactElement, SVGProps } from "react";

type NavItem = {
  href: string;
  label: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
};

function HomeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5h-3a1.5 1.5 0 0 1-1.5-1.5v-4h-7v4A1.5 1.5 0 0 1 6 19.5h-3A1.5 1.5 0 0 1 1.5 18v-7.5Z" />
    </svg>
  );
}

function StoreIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8.5V6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v2M4 8.5h16M6 8.5v9a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 17.5v-9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" />
    </svg>
  );
}

function OrderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 4.5h10l1.5 3v12A1.5 1.5 0 0 1 17 21H7a1.5 1.5 0 0 1-1.5-1.5V7.5L7 4.5Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 10.5h6" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 14h4" />
    </svg>
  );
}

function ProfileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

function CartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h2l2 10h10l2-7H7" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
    </svg>
  );
}

const navItems: NavItem[] = [
  { href: "/", label: "Inicio", icon: HomeIcon },
  { href: "/stores", label: "Tiendas", icon: StoreIcon },
  { href: "/orders", label: "Pedidos", icon: OrderIcon },
  { href: "/profile", label: "Perfil", icon: ProfileIcon },
  { href: "/cart", label: "Carrito", icon: CartIcon },
];

export function MobileNavbar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-primary/20 bg-neutral/95 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-7xl items-stretch justify-between gap-1 px-2 py-2">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium text-secondary/70 transition hover:bg-primary/10 hover:text-primary"
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
