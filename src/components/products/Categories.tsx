import { getCategories } from '@/modules/categories/data';
import { CategoryFilter } from './CategoryFilter';
import { Category } from '@/modules/categories/types';

export default async function Categories() {
  const categories: Category[] = await getCategories(
  );
  return <CategoryFilter categories={categories} />;
}