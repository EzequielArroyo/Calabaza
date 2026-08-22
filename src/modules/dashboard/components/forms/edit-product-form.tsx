"use client";

import { updateProduct } from "../../actions";
import ProductForm from "./product-form";

type EditProductFormProps = {
  product: {
    id: string;
    name: string;
    description: string | null;
    categoryId: number;
    price: number;
    stock: number;
    imageUrl: string | null;
  };

  categories: {
    id: number;
    name: string;
  }[];
};

export default function EditProductForm({
  product,
  categories,
}: EditProductFormProps) {
  return (
    <ProductForm
      action={updateProduct}
      categories={categories}
      initialValues={{
        id: product.id,
        name: product.name,
        description: product.description ?? "",
        categoryId: product.categoryId,
        price: product.price,
        stock: product.stock,
        imageUrl: product.imageUrl ?? "",
      }}
      submitText="Guardar cambios"
      pendingText="Guardando cambios..."
    />
  );
}
