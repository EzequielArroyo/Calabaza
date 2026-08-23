import { Prisma } from "@/generated/prisma/client";

import  prisma  from "@/lib/prisma";

import type { CreateProductDto, ProductDetail, UpdateProductDto } from "./types";

export async function getProducts(searchQuery?: string, categorySlug?: string) {
  return prisma.product.findMany({
    where: {
      active: true,
      stock: {
        gt: 0,
      },
      ...(searchQuery && {
        OR: [
          {
            name: {
              contains: searchQuery,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            store: {
              name: {
                contains: searchQuery,
                mode: Prisma.QueryMode.insensitive,
              },
            },
          },
        ],
      }),
      ...(categorySlug && {
        category: {
          slug: categorySlug,
        },
      }),
    },
    include: {
      store: {
        select: {
          id: true,
          name: true,
        },
      },
      category: true,
    },
  });
}

export async function getProductById(id: string): Promise<ProductDetail | null> {
  return prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      store: true,
      category: true,
    },
  });
}

export async function getProductsByStore(storeId: string) {
  return prisma.product.findMany({
    where: {
      storeId,
      active: true,
    },
    include: {
      category: true,
    },
    orderBy: {
      name: "asc",
    },
  });
}

export async function createProduct(data: CreateProductDto) {
  return prisma.product.create({
    data
  });
}

export async function updateProduct(id: string, data: UpdateProductDto) {
  return prisma.product.update({
    where: {
      id,
    },
    data,
  });
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({
    where: {
      id,
    },
  });
}

export async function updateStock(id: string, quantity: number) {
  return prisma.product.update({
    where: {
      id,
    },
    data: {
      stock: quantity,
    },
  });
}
