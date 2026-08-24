"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  DashBoardIcon,
  ProductIcon,
  OrdersIcon,
  ConfigurationIcon,
} from "@/components/ui/icons";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: DashBoardIcon,
  },
  {
    name: "Productos",
    href: "/dashboard/products",
    icon: ProductIcon,
  },
  {
    name: "Pedidos",
    href: "/dashboard/orders",
    icon: OrdersIcon,
  },
  {
    name: "Configuración",
    href: "/dashboard/config",
    icon: ConfigurationIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;

        const active =
          pathname === link.href ||
          (link.href !== "/dashboard" && pathname.startsWith(link.href));

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`
              flex items-center
              gap-3
              rounded-md
              p-3
              transition-colors
              hover:bg-primary/10

              ${active ? "bg-primary/10 text-primary font-medium" : ""}
            `}
          >
            <LinkIcon />

            <span>{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}