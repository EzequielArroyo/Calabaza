"use client";
import { useActionState } from "react";
import { useState } from "react";

import type { ActionResult } from "@/modules/shared/actionResult";

import { Button } from "@/modules/shared/components/button";
import InputText from "@/modules/shared/components/forms/input-text";
import InputTextarea from "@/modules/shared/components/forms/input-textarea";
import { createProduct } from "../actions";
import { ImageUploader } from "@/components/ui/ImageUploader";

const initialState: ActionResult = {
  success: false,
};

type CreateProductFormProps = {
  categories: {
    id: number;
    name: string;
  }[];
};

export default function CreateProductForm({
  categories,
}: CreateProductFormProps) {
  const [state, formAction, isPending] = useActionState(
    createProduct,
    initialState,
  );
  const [image, setImage] = useState<string>("");

  return (
    <form
      action={formAction}
      noValidate
      className="rounded-2xl border border-secondary/15 bg-surface p-5 shadow-sm sm:p-7"
    >
      {state.message && !state.success && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <fieldset className="space-y-6" disabled={isPending}>
        {/* Nombre */}
        <InputText
          name="name"
          label="Nombre del producto"
          type="text"
          required
          errorMessage={state.errors?.name?.[0]}
        />

        {/* Descripción */}
        <InputTextarea
          name="description"
          label="Descripción"
          maxLength={1000}
          errorMessage={state.errors?.description?.[0]}
        />

        {/* Categoría */}
        <div>
          <label
            htmlFor="categoryId"
            className="mb-2 block text-sm font-medium text-secondary"
          >
            Categoría
          </label>

          <select
            id="categoryId"
            name="categoryId"
            required
            defaultValue=""
            className="w-full rounded-lg border border-secondary/20 bg-surface px-4 py-3 text-sm text-secondary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="" disabled>
              Seleccioná una categoría
            </option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {state.errors?.categoryId?.[0] && (
            <p className="mt-1 text-sm text-red-600">
              {state.errors.categoryId[0]}
            </p>
          )}
        </div>

        {/* Precio & Stock */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InputText
            name="price"
            label="Precio"
            type="number"
            required
            errorMessage={state.errors?.price?.[0]}
          />

          <InputText
            name="stock"
            label="Stock"
            type="number"
            required
            errorMessage={state.errors?.stock?.[0]}
          />
        </div>

        <input type="hidden" name="imageUrl" value={image ?? ""} />
      </fieldset>

      <div className="mt-8 flex justify-end">
        <Button type="submit" variant="secondary">
          {isPending ? "Creando producto..." : "Crear producto"}
        </Button>
      </div>
    </form>
  );
}
