"use server";

import { redirect } from "next/navigation";

import { Prisma } from "@/generated/prisma/client";
import { getMockUserId } from "@/lib/auth-mock";
import prisma from "@/lib/prisma";
import type { ActionResult } from "@/modules/shared/actionResult";
import { createStoreSchema, createProductSchema } from "./validators";
import { createProductData } from "./data"
export async function createStore(
  _previousState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const parsed = createStoreSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    phone: formData.get("phone"),
    address: formData.get("address"),
    latitude: formData.get("latitude"),
    longitude: formData.get("longitude"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Revisá los datos del formulario e intentá nuevamente.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }
  console.log("data validation: success", parsed.data);
  const ownerId = await getMockUserId();
  const existingStore = await prisma.store.findUnique({
    where: { ownerId },
    select: { id: true },
  });

  if (existingStore) {
    return {
      success: false,
      message:
        "Ya tenés una tienda registrada. Cada usuario puede administrar una sola tienda.",
    };
  }

  try {
    await prisma.store.create({
      data: {
        ...parsed.data,
        latitude: new Prisma.Decimal(parsed.data.latitude),
        longitude: new Prisma.Decimal(parsed.data.longitude),
        ownerId,
        isOpen: true,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        message:
          "Ya tenés una tienda registrada. Cada usuario puede administrar una sola tienda.",
      };
    }

    return {
      success: false,
      message: "No pudimos crear la tienda. Intentá nuevamente.",
    };
  }

  redirect("/dashboard");
}

export async function createProduct(
  _prevState: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const rawData = {
    name: formData.get("name"),
    description: formData.get("description"),
    categoryId: formData.get("categoryId"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    imageUrl: formData.get("imageUrl"),
  };

  const parsedData = createProductSchema.safeParse(rawData);

  if (!parsedData.success) {
    return {
      success: false,
      errors: parsedData.error.flatten().fieldErrors,
    };
  }

  try {
    /*
     * El storeId debe obtenerse del usuario autenticado.
     *
     * Ejemplo conceptual:
     *
     * const session = await auth();
     * const store = await getStoreByOwnerId(session.user.id);
     *
     * No lo implemento acá porque la implementación exacta
     * de autenticación/store actual no está definida en las
     * fuentes disponibles.
     */

      const ownerId = await getMockUserId();
      const storeId = await prisma.store.findUnique({
        where: { ownerId },
        select: { id: true },
      });
        
    if (!storeId) {
      return {
        success: false,
        message: "No se encontró una tienda para este usuario.",
      };
    }

    await createProductData({
      ...parsedData.data,
      storeId: storeId.id,
    });

    return {
      success: true,
      message: "Producto creado correctamente.",
    };
  } catch (error) {
    console.error("Error creating product:", error);

    return {
      success: false,
      message: "No se pudo crear el producto.",
    };
  }
}