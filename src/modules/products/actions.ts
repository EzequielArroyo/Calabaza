"use server";

import { revalidatePath } from "next/cache";

import { createProduct, deleteProduct, updateProduct } from "./data";

import { createProductSchema, updateProductSchema } from "./validators";

export async function createProductAction(formData: FormData) {
  const parsed = createProductSchema.safeParse({
    storeId: formData.get("storeId"),
    categoryId: Number(formData.get("categoryId")),
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
    imageUrl: formData.get("imageUrl"),
    active: formData.get("active") === "true",
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten(),
    };
  }

  await createProduct(parsed.data);

  revalidatePath("/");

  return {
    success: true,
  };
}

export async function updateProductAction(id: string, formData: FormData) {
  const parsed = updateProductSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: formData.get("price"),
    stock: formData.get("stock"),
    imageUrl: formData.get("imageUrl"),
    active: formData.get("active") === "true",
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten(),
    };
  }

  await updateProduct(id, parsed.data);

  revalidatePath("/");

  return {
    success: true,
  };
}

export async function deleteProductAction(id: string) {
  await deleteProduct(id);

  revalidatePath("/");

  return {
    success: true,
  };
}
