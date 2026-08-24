import Link from "next/link";
import type { ReactElement, SVGProps } from "react";
import { HomeIcon, DashBoardIcon, OrdersIcon, ProfileIcon } from "@/components/ui/icons";

type NavItem = {
  href: string;
  label: string;
  icon: (props: SVGProps<SVGSVGElement>) => ReactElement;
};

const navItems: NavItem[] = [
  { href: "/", label: "Inicio", icon: HomeIcon },
  { href: "/orders", label: "Pedidos", icon: OrdersIcon },
  { href: "/dashboard", label: "miTienda", icon: DashBoardIcon },
  { href: "/profile", label: "Perfil", icon: ProfileIcon },
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
