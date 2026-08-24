"use server";

import { getUserId } from "@/lib/auth";
import { createCart, createCartItem, getCartByUserId, incrementCartItemQuantity} from "./data";
import { getProductById } from "../products/data";

import type { AddToCartInput } from "./types";

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
      price: product.price,
      quantity,
    });

    return;
  }

  if (cart.storeId !== product.storeId) {
    throw new Error("Cart contains products from another store");
  }

  const existingItem = cart.items.find((item) => item.product.id === product.id);

  if (existingItem) {
    await incrementCartItemQuantity({
      itemId: existingItem.id,
      quantity,
    });

    return;
  }

  await createCartItem({
    cartId: cart.id,
    productId: product.id,
    price: product.price,
    quantity,
  });
}