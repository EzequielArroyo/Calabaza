
export interface ProductFilters {
  searchQuery?: string;
}

export interface CreateProductDto {
  storeId: string;
  categoryId: string;
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
