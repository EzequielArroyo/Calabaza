"use server";

import { revalidatePath } from "next/cache";
import { Decimal } from "@prisma/client/runtime/client";

import { getUserId } from "@/lib/auth";
import { getCartByUserId} from "@/modules/cart/data";

import { createOrderFromCart } from "./data";

export async function createOrderAction() {
  const userId = await getUserId();

  const cart = await getCartByUserId(userId);

  if (!cart) {
    throw new Error("Cart not found");
  }

  if (cart.items.length === 0) {
    throw new Error("Cart is empty");
  }

  // Validar stock
  for (const item of cart.items) {
    if (item.quantity > item.product.stock) {
      throw new Error(`Not enough stock for product ${item.product.name}`);
    }
  }

  // Calcular total
  const total = cart.items.reduce((acc, item) => {
    return acc.add(item.product.price.mul(item.quantity));
  }, new Decimal(0));

  // TODO: definir regla de expiración de la orden
  const expiredAt = new Date();
  expiredAt.setHours(expiredAt.getHours() + 24);

  const order = await createOrderFromCart(
    {
      customerId: userId,
      storeId: cart.storeId,
      total,
      expiredAt,
      items: cart.items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })),
    },
    cart.id,
  );

  revalidatePath("/cart");
  revalidatePath("dashboard/orders");
}
