import { CartIcon } from "@/components/ui/icons";
import Link from "next/link";

export function MobileHeader() {
  return (
    <header className="border-b border-primary/20 bg-neutral md:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-semibold text-white shadow-sm">
            C
          </div>
          <div>
            <p className="text-lg font-semibold text-secondary">Calabaza</p>
          </div>
        </Link>

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
