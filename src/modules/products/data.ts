import { Prisma } from "@/generated/prisma/client";

import  prisma  from "@/lib/prisma";

import type { CreateProductDto, UpdateProductDto } from "./types";

export async function getProducts(searchQuery?: string) {
  return prisma.product.findMany({
    where: {
      active: true,
      stock: {
        gt: 0,
      },
      ...(searchQuery && {
        name: {
          contains: searchQuery,
          mode: Prisma.QueryMode.insensitive,
        },
      }),
    },
    include: {
      store: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getProductById(id: string) {
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
    data,
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
