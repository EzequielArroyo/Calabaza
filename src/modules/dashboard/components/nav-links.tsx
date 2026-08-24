'use client'
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { DashBoardIcon, ProductIcon, OrdersIcon, ConfigurationIcon } from "@/components/ui/icons";

export default function NavLinks(){

const pathname = usePathname();

    const links = [
      { name: "Dashboard", href: "/dashboard", icon: DashBoardIcon},
      {
        name: "Productos",
        href: "/dashboard/products",
        icon: ProductIcon
      },
      { name: "Pedidos", href: "/dashboard/orders", icon: OrdersIcon},
      { name: "Configuración", href: "dashboard/config", icon: ConfigurationIcon}
    ];
    return(
        <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const active = pathname === link.href;
        const activeClass = active
      ? "border-r-4 border-primary"
      : "";
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex gap-1 p-2 hover:bg-primary/25 transition-all active:translate-x-1 duration-200 ${activeClass}`}
          >
            <LinkIcon/>
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
    )
}