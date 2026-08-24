import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import type {
  CreateCartInput,
  CreateCartItemInput,
  DeleteCartInput,
  IncrementCartItemQuantityInput,
  DecrementCartItemQuantityInput,
  DeleteCartItemInput,
} from "./types";

type DbClient = typeof prisma | Prisma.TransactionClient;
export async function getCartByUserId(userId: string) {
  return prisma.cart.findUnique({
    where: {
      userId,
    },
    select: {
      id: true,
      storeId: true,
      items: {
        select: {
          id: true,
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
              stock: true,
              price: true,
            },
          },
        },
      },
    },
  });
}

export async function createCart(input: CreateCartInput) {
  return prisma.cart.create({
    data: {
      userId: input.userId,
      storeId: input.storeId,
      items: {
        create: {
          productId: input.productId,
          quantity: input.quantity,
        },
      },
    },
  });
}

export async function deleteCart(
  input: DeleteCartInput,
  db: DbClient = prisma,
){
  return db.cart.delete({
    where: {
      id: input.cartId,
    },
  });
}

export async function createCartItem(input: CreateCartItemInput) {
  return prisma.cartItem.create({
    data: {
      cartId: input.cartId,
      productId: input.productId,
      quantity: input.quantity,
    },
  });
}

export async function incrementCartItemQuantity(
  input: IncrementCartItemQuantityInput,
) {
  return prisma.cartItem.update({
    where: {
      id: input.itemId,
    },
    data: {
      quantity: {
        increment: input.quantity,
      },
    },
  });
}
export async function decrementCartItemQuantity(
  input: DecrementCartItemQuantityInput,
) {
  return prisma.cartItem.update({
    where: {
      id: input.itemId,
    },
    data: {
      quantity: {
        decrement: 1,
      },
    },
  });
}

export async function deleteCartItem(input: DeleteCartItemInput) {
  return prisma.cartItem.delete({
    where: {
      id: input.itemId,
    },
  });
}
