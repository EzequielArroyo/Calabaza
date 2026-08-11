import Image from "next/image";

import type { ProductDetail } from "@/modules/products/types";

import { AddToCartSection } from "./AddToCartSection";
import { StoreMap } from "./StoreMap";

type ProductDetailViewProps = {
  product: ProductDetail;
};

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const price = Number(product.price.toString()).toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="grid gap-8 rounded-3xl border border-primary/20 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-2 lg:p-8">
        <ProductImage imageUrl={product.imageUrl} name={product.name} />

        <section className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              {product.category.name}
            </span>
            <span className="text-sm font-medium text-secondary/70">
              {product.stock} available
            </span>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-secondary sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-3 text-2xl font-bold text-primary">{price}</p>
          </div>

          {product.description ? (
            <p className="text-base leading-7 text-secondary/80">{product.description}</p>
          ) : null}

          <AddToCartSection stock={product.stock} />
        </section>
      </div>

      <section className="mt-6 grid gap-6 rounded-3xl border border-primary/20 bg-white p-4 shadow-sm sm:p-6 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Store</p>
          <h2 className="mt-2 text-2xl font-bold text-secondary">{product.store.name}</h2>
          <p className="mt-2 text-secondary/80">{product.store.address}</p>
        </div>
        <StoreMap latitude={product.store.latitude.toString()} longitude={product.store.longitude.toString()} />
      </section>
    </div>
  );
}

function ProductImage({ imageUrl, name }: { imageUrl: string | null; name: string }) {
  if (!imageUrl) {
    return (
      <div className="flex min-h-72 items-center justify-center rounded-2xl bg-primary/10 p-6 text-center font-medium text-secondary/70">
        No image available
      </div>
    );
  }

  return (
    <div className="relative min-h-72 overflow-hidden rounded-2xl bg-primary/10">
      <Image src={imageUrl} alt={name} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
    </div>
  );
}
