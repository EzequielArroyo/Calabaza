import prisma from "@/lib/prisma";
import type {
  CreateCartInput,
  CreateCartItemInput,
  IncrementCartItemQuantityInput,
} from "./types";

export async function getCartByUserId(userId: string) {
  return prisma.cart.findUnique({
    where: {
      userId,
    },
    include: {
      items: true,
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
          price: input.price,
          quantity: input.quantity,
        },
      },
    },
  });
}

export async function createCartItem(input: CreateCartItemInput) {
  return prisma.cartItem.create({
    data: input,
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
