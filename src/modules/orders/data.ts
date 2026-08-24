import prisma from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client.js";
import type { CreateOrderData } from "./types.ts"
import { deleteCart } from "@/modules/cart/data";

type DbClient = typeof prisma | Prisma.TransactionClient;

export async function getOrderById(orderId: string) {
  return prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      store: true,
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}
export async function createOrderFromCart(
  orderInput: CreateOrderData,
  cartId: string,
) {
  return prisma.$transaction(async (tx) => {
    const order = await createOrder(orderInput, tx);

    await deleteCart(
      {
        cartId,
      },
      tx,
    );

    return order;
  });
}
export async function createOrder(
  data: CreateOrderData,
  db: DbClient = prisma,
) {
  return db.order.create({
    data: {
      customerId: data.customerId,
      storeId: data.storeId,
      total: data.total,
      expiredAt: data.expiredAt,

      items: {
        create: data.items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },

    include: {
      items: {
        include: {
          product: true,
        },
      },
      store: true,
    },
  });
}

export async function getOrdersByCustomerId(customerId: string) {
  return prisma.order.findMany({
    where: {
      customerId,
    },
    include: {
      store: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getOrdersByStoreId(storeId: string) {
  return prisma.order.findMany({
    where: {
      storeId,
    },
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getOrderByIdAndCustomerId(
  orderId: string,
  customerId: string,
) {
  return prisma.order.findFirst({
    where: {
      id: orderId,
      customerId,
    },
    include: {
      store: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function getOrderByIdAndStoreId(orderId: string, storeId: string) {
  return prisma.order.findFirst({
    where: {
      id: orderId,
      storeId,
    },
    include: {
      customer: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}