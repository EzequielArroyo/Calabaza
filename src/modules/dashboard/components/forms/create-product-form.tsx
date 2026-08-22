"use client";

import { createProduct } from "../../actions";
import ProductForm from "./product-form";

type CreateProductFormProps = {
  categories: {
    id: number;
    name: string;
  }[];
};

export default function CreateProductForm({
  categories,
}: CreateProductFormProps) {
  return (
    <ProductForm
      action={createProduct}
      categories={categories}
      submitText="Crear producto"
      pendingText="Creando producto..."
    />
  );
}
