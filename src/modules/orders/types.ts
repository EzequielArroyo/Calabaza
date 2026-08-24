import { Decimal } from "@prisma/client/runtime/client";
export interface CreateOrderData {
  customerId: string;
  storeId: string;
  total: Decimal;
  expiredAt: Date;
  items: {
    productId: string;
    quantity: number;
    price: Decimal;
  }[];
}
