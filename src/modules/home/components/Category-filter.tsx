import { getCategories } from '@/modules/categories/data';
import { CategoryFilterItems } from './category-filter-items';
import { Category } from '@/modules/categories/types';

export default async function CategoryFilter() {
  const categories: Category[] = await getCategories(
  );
  return <CategoryFilterItems categories={categories} />;
}