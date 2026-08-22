"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import type { ActionResult } from "@/modules/shared/actionResult";

import { Button } from "@/modules/shared/components/button";
import InputText from "@/modules/shared/components/forms/input-text";
import InputTextarea from "@/modules/shared/components/forms/input-textarea";
import { ImageUploader } from "@/components/ui/ImageUploader";

type ProductFormProps = {
  action: (
    previousState: ActionResult,
    formData: FormData,
  ) => Promise<ActionResult>;

  initialValues?: {
    id?: string;
    name?: string;
    description?: string;
    categoryId?: number;
    price?: number;
    stock?: number;
    imageUrl?: string;
  };

  categories: {
    id: number;
    name: string;
  }[];

  submitText: string;
  pendingText: string;
};

const initialState: ActionResult = {
  success: false,
};

export default function ProductForm({
  action,
  initialValues,
  categories,
  submitText,
  pendingText,
}: ProductFormProps) {
  const [state, formAction, isPending] = useActionState(
    action,
    initialState,
  );

  const [image, setImage] = useState<string>(
    initialValues?.imageUrl ?? "",
  );

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
          defaultValue={initialValues?.name ?? ""}
          errorMessage={state.errors?.name?.[0]}
        />

        {/* Descripción */}
        <InputTextarea
          name="description"
          label="Descripción"
          maxLength={1000}
          defaultValue={initialValues?.description ?? ""}
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
            defaultValue={initialValues?.categoryId ?? ""}
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
            defaultValue={initialValues?.price ?? ""}
            errorMessage={state.errors?.price?.[0]}
          />

          <InputText
            name="stock"
            label="Stock"
            type="number"
            required
            defaultValue={initialValues?.stock ?? ""}
            errorMessage={state.errors?.stock?.[0]}
          />
        </div>

        {/* Imagen */}
        <ImageUploader
          endpoint="productImages"
          onUploadComplete={(urls) => setImage(urls[0] ?? "")}
        />

        <input type="hidden" name="imageUrl" value={image} />

        {/* ID del producto para edición */}
        {initialValues && "id" in initialValues && (
          <input type="hidden" name="productId" value={initialValues.id} />
        )}
      </fieldset>

      <div className="mt-8 flex justify-end gap-3">
        <Link
          href="/dashboard/products"
          className="rounded-lg border border-secondary/20 px-5 py-3 text-sm font-medium text-secondary transition hover:bg-secondary/5"
        >
          Cancelar
        </Link>

        <Button type="submit" variant="secondary">
          {isPending ? pendingText : submitText}
        </Button>
      </div>
    </form>
  );
}