import { Decimal } from "@prisma/client/runtime/client";

export interface AddToCartInput {
  productId: string;
  quantity?: number;
}

export interface CreateCartInput {
  userId: string;
  storeId: string;
  productId: string;
  price: Decimal;
  quantity: number;
}

export interface CreateCartItemInput {
  cartId: string;
  productId: string;
  price: Decimal;
  quantity: number;
}

export interface IncrementCartItemQuantityInput {
  itemId: string;
  quantity: number;
}
