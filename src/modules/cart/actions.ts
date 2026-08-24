"use server";
import { getUserId } from "@/lib/auth";
import {
  createCart,
  createCartItem,
  getCartByUserId,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
  deleteCartItem,
  deleteCart,
} from "./data";
import { getProductById } from "../products/data";
import type { AddToCartInput } from "./types";
import { revalidatePath } from "next/cache";

export async function addToCart(input: AddToCartInput) {
  const userId = await getUserId();

  const quantity = input.quantity ?? 1;

  if (!Number.isInteger(quantity) || quantity < 1) {
    throw new Error("Quantity must be a positive integer");
  }

  const product = await getProductById(input.productId);

  if (!product) {
    throw new Error("Product not found");
  }

  const cart = await getCartByUserId(userId);

  if (!cart) {
    await createCart({
      userId,
      storeId: product.storeId,
      productId: product.id,
      quantity,
    });
  } else {
    if (cart.storeId !== product.storeId) {
      throw new Error("Cart contains products from another store");
    }

    const existingItem = cart.items.find(
      (item) => item.product.id === product.id,
    );

    if (existingItem) {
      await incrementCartItemQuantity({
        itemId: existingItem.id,
        quantity,
      });
    } else {
      await createCartItem({
        cartId: cart.id,
        productId: product.id,
        price: product.price,
        quantity,
      });
    }
  }

  revalidatePath("/cart");
}
export async function incrementCartItem(itemId: string) {
  const userId = await getUserId();
  const cart = await getCartByUserId(userId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find((item) => item.id === itemId);

  if (!item) {
    throw new Error("Cart item not found");
  }

  if (item.quantity >= item.product.stock) {
    throw new Error("Not enough stock");
  }

  await incrementCartItemQuantity({
    itemId,
    quantity: 1,
  });
  revalidatePath("/cart");
}

export async function decrementCartItem(itemId: string) {
  const userId = await getUserId();
  const cart = await getCartByUserId(userId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find((item) => item.id === itemId);

  if (!item) {
    throw new Error("Cart item not found");
  }

  if (item.quantity > 1) {
    await decrementCartItemQuantity({
      itemId,
    });
  } else {
    await deleteCartItem({
      itemId,
    });

    if (cart.items.length === 1) {
      await deleteCart({
        cartId: cart.id,
      });
    }
  }
  revalidatePath("/cart");
}

export async function removeCartItem(itemId: string) {
  const userId = await getUserId();
  const cart = await getCartByUserId(userId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find((item) => item.id === itemId);

  if (!item) {
    throw new Error("Cart item not found");
  }

  await deleteCartItem({
    itemId,
  });

  if (cart.items.length === 1) {
    await deleteCart({
      cartId: cart.id,
    });
  }
  revalidatePath("/cart");
}