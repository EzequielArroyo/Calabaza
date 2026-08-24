"use client";

import { useState } from "react";

import { useUploadThing } from "@/lib/uploadthing";

type ImageUploaderProps = {
  endpoint: "storeImage" | "productImages";
  onUploadComplete: (urls: string[]) => void;
};

const acceptedImageTypes = ["image/jpeg", "image/png"];

export function ImageUploader({
  endpoint,
  onUploadComplete,
}: ImageUploaderProps) {
  const [message, setMessage] = useState<string>();
  const { isUploading, startUpload } = useUploadThing(endpoint);
  const maxFileCount = endpoint === "storeImage" ? 1 : 3;

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const files = Array.from(event.target.files ?? []);

    if (!files.length) return;

    if (
      files.length > maxFileCount ||
      files.some((file) => !acceptedImageTypes.includes(file.type))
    ) {
      setMessage(
        `Seleccioná hasta ${maxFileCount} imagen${maxFileCount > 1 ? "es" : ""} en formato PNG o JPG.`,
      );
      event.target.value = "";
      return;
    }

    setMessage(undefined);

    try {
      const uploadedFiles = await startUpload(files);
      const urls = uploadedFiles?.map((file) => file.serverData.url) ?? [];

      onUploadComplete(urls);
    } catch {
      setMessage("No pudimos subir las imágenes. Intentá nuevamente.");
    }
  }

  return (
    <div>
      <label className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white">
        <span>{isUploading ? "Subiendo imágenes..." : "Seleccionar imágenes"}</span>
        <input
          accept="image/png,image/jpeg"
          className="sr-only"
          disabled={isUploading}
          multiple={maxFileCount > 1}
          onChange={handleFileChange}
          type="file"
        />
      </label>
      <p className="mt-2 text-sm text-secondary/75">
        PNG o JPG. Máximo {maxFileCount} {maxFileCount === 1 ? "imagen" : "imágenes"}.
      </p>
      {message && (
        <p aria-live="polite" className="mt-2 text-sm text-red-700">
          {message}
        </p>
      )}
    </div>
  );
}
