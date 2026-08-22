import { Prisma } from "@/generated/prisma/client";
import { CreateProductDto } from "./types"

import prisma from "@/lib/prisma";
export async function getProducts(searchQuery?: string) {
  return prisma.product.findMany({
    where: {
      ...(searchQuery && {
            name: {
              contains: searchQuery,
              mode: Prisma.QueryMode.insensitive,
            },   
      }),
    },
    include: {
      category: true,
    },
  });
}
export async function createProductData(data: CreateProductDto) {
  return prisma.product.create({
    data,
  });
}
export async function getStoreByOwnerId(userId: string){
  return prisma.store.findUnique({
    where: {
      ownerId: userId
    }
  })
}