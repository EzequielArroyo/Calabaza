import { Prisma } from "@/generated/prisma/client";

export type ProductItem = Prisma.ProductGetPayload<{
  include: {
    category: true;
  };
}>;

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
export interface  CreateStoreDto {
  name: string;
  description: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  ownerId: string;
};