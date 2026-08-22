"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getMockUserId } from "@/lib/auth-mock";
import type { ActionResult } from "@/modules/shared/actionResult";
import { createStoreSchema, createProductSchema } from "./validators";
import { PostStore, GetStoreByOwnerId, GetProductByIdAndStore, DeleteProductById, PostProduct } from "./data"
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
  const existingStore = await GetStoreByOwnerId(ownerId);

  if (existingStore) {
    return {
      success: false,
      message:
        "Ya tenés una tienda registrada. Cada usuario puede administrar una sola tienda.",
    };
  }

  try {
    const store = await PostStore({
      ...parsed.data,
      ownerId,
    });

    if (!store) {
      return {
        success: false,
        message:
          "Ya tenés una tienda registrada. Cada usuario puede administrar una sola tienda.",
      };
    }
  } catch {
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
      const ownerId = await getMockUserId();
      const storeId = await GetStoreByOwnerId(ownerId)
        
    if (!storeId) {
      return {
        success: false,
        message: "No se encontró una tienda para este usuario.",
      };
    }

    await PostProduct({
      ...parsedData.data,
      storeId: storeId.id,
    });
  } catch (error) {
    console.error("Error creating product:", error);

    return {
      success: false,
      message: "No se pudo crear el producto.",
    };
  }
  redirect("/dashboard/products");
}

export async function deleteProduct(productId: string){
  const ownerId = await getMockUserId();
  const store = await GetStoreByOwnerId(ownerId);
  
  if (!store) {
    throw new Error("Store not found");
  }

  const product = await GetProductByIdAndStore(productId, store.id);

  if (!product) {
    throw new Error("Product not found");
  }

  await DeleteProductById(product.id);
  revalidatePath("/products");
}