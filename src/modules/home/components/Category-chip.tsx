'use client';

import { Category } from "@/modules/categories/types";

type CategoryChipProps = {
  category: Category;
  isActive?: boolean;
  onClick: () => void;
};

export function CategoryChip({
  category,
  isActive = false,
  onClick,
}: CategoryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-all flex-shrink-0 ${isActive? 'bg-orange-600 text-white shadow-sm': 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'}`}
    >
      {category.name}
    </button>
  );
}