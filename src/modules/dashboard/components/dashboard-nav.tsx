"use client";

import { useState } from "react";
import NavLinks from "./nav-links";

export default function DashboardNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="sticky top-16 z-20 w-full bg-surface border-b md:w-64 md:border-b-0 md:border-r">
      {/* Mobile header */}
      <div className="flex items-center justify-between p-4 md:hidden">
        <div>
          <h2 className="font-medium text-primary">Mi tienda</h2>
          <p className="text-sm text-text-secondary">Administrador</p>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="dashboard-navigation"
          className="
            rounded-md
            p-2
            hover:bg-primary/10
            transition-colors
          "
        >
          {isOpen ? "Cerrar" : "Menú"}
        </button>
      </div>

      {/* Navegación */}
      <div
        id="dashboard-navigation"
        className={`
          ${isOpen ? "block" : "hidden"}
          border-t
          p-4

          md:block
          md:border-t-0
          md:p-4
        `}
      >
        {/* Desktop title */}
        <div className="hidden md:block mb-8 px-2">
          <h1 className="text-2xl text-primary">Mi tienda</h1>
          <p>Administrador</p>
        </div>

        <nav className="flex flex-col gap-2 text-text-secondary">
          <NavLinks />
        </nav>
      </div>
    </aside>
  );
}
