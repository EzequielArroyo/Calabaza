import { Decimal } from "@/generated/prisma/internal/prismaNamespace";
import { Category } from "../categories/types";

export interface ProductFilters {
  searchQuery?: string;
}

export interface CreateProductDto {
  storeId: string;
  categoryId: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  imageUrl?: string;
  active: boolean;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  imageUrl?: string;
  active?: boolean;
}

export interface ProductCardItem {
  id: string;
  name: string;
  description?: string | null;
  price: Decimal;
  stock?: number;
  imageUrl?: string | null;
  category?: Category;
  store?: {
    id: string;
    name: string;
  }
}
