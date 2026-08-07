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

        {/* MODO 1: Scroll Horizontal (Compacto) */}
        {!isExpanded && (
          <div className="relative group">
            {/* Botón Scroll Izquierda */}
            <button
              onClick={() => handleScroll('left')}
              aria-label="Desplazar a la izquierda"
              className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-700 p-1.5 rounded-full shadow-md border border-gray-200 transition-opacity opacity-0 group-hover:opacity-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Contenedor de Chips */}
            <div
              ref={scrollContainerRef}
              className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {categories.map((cat) => {
                const isActive = activeSlug === cat.slug;
                return (
                  <Link
                    key={cat.id}
                    href={`${baseUrl}/${cat.slug}`}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all flex-shrink-0 ${
                      isActive
                        ? 'bg-orange-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                    }`}
                  >
                    {cat.name}
                  </Link>
                );
              })}
            </div>

            {/* Botón Scroll Derecha */}
            <button
              onClick={() => handleScroll('right')}
              aria-label="Desplazar a la derecha"
              className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-700 p-1.5 rounded-full shadow-md border border-gray-200 transition-opacity opacity-0 group-hover:opacity-100"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}