import { Prisma } from "@/generated/prisma/client";
import { CreateProductDto, CreateStoreDto, UpdateProductDto } from "./types";

import prisma from "@/lib/prisma";
export async function GetProducts(searchQuery?: string) {
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
export async function GetProductById(productId:string) {
  return prisma.product.findUnique(
    {
      where:{
        id: productId
      }
    }
  )
}
export async function PostProduct(data: CreateProductDto) {
  return prisma.product.create({
    data,
  });
}
export async function PutProduct(data: UpdateProductDto){
  return prisma.product.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
          description: data.description,
          categoryId: data.categoryId,
          price: data.price,
          stock: data.stock,
          imageUrl: data.imageUrl,
        },
      });
}
export async function GetProductByIdAndStore(
  productId: string,
  storeId: string,
) {
  return prisma.product.findFirst({
    where: {
      id: productId,
      storeId,
    },
    select: {
      id: true,
    },
  });
}

export async function DeleteProductById(productId: string){
  return prisma.product.delete({
    where: {
      id: productId
    }
  });
}
export async function GetStoreByOwnerId(userId: string) {
  return prisma.store.findUnique({
    where: {
      ownerId: userId,
    },
    select: {
      id: true,
    },
  });
}
export async function PostStore(data: CreateStoreDto){
  try {
    return await prisma.store.create({
      data: {
        name: data.name,
        description: data.description,
        phone: data.phone,
        address: data.address,
        latitude: new Prisma.Decimal(data.latitude),
        longitude: new Prisma.Decimal(data.longitude),
        ownerId: data.ownerId,
        isOpen: true,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return null;
    }

    throw error;
  }
}