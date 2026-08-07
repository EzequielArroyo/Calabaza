'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export interface Category {
  id: string | number;
  name: string;
  slug: string;
}

interface ListCategoryProps {
  categories: Category[];
  activeSlug?: string;
  baseUrl?: string;
}

export function CategoryList({
  categories = [],
  activeSlug,
  baseUrl = '/categorias',
}: ListCategoryProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [search, setSearch] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -250 : 250;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-white border-b border-gray-100 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera del módulo */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Categorías
          </h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-medium text-orange-600 hover:text-orange-700 transition-colors focus:outline-none"
          >
            {isExpanded ? 'Ver menos' : `Ver todas (${categories.length})`}
          </button>
        </div>

        {/* MODO 2: Grid Desplegable con Buscador */}
        {isExpanded && (
          <div className="space-y-4 pt-2">
            {/* Buscador de Categorías */}
            <div className="relative max-w-sm">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar categoría..."
                className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Grid Adaptable con Max Height y Scroll Propio */}
            <div className="max-h-60 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 border-t border-gray-100 pt-3">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => {
                  const isActive = activeSlug === cat.slug;
                  return (
                    <Link
                      key={cat.id}
                      href={`${baseUrl}/${cat.slug}`}
                      className={`text-center px-3 py-2 rounded-lg text-xs font-medium transition-all truncate ${
                        isActive
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-orange-50 hover:text-orange-600 border border-gray-200/60'
                      }`}
                      title={cat.name}
                    >
                      {cat.name}
                    </Link>
                  );
                })
              ) : (
                <p className="col-span-full text-xs text-gray-400 text-center py-4">
                  No se encontraron categorías
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}