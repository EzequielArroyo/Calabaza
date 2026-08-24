import Image from "next/image";
import Link from "next/link";
import { ProductCardItem } from "@/modules/products/types";


type ProductCardProps = {
  product: ProductCardItem;
};

export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = Number(product.price.toString());

  return (
    <article className="overflow-hidden rounded-3xl border border-primary/20 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-4">
        {product.imageUrl ? (
          <div className="relative h-full w-full overflow-hidden rounded-2xl">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-primary/30 bg-white/70 text-sm font-medium text-secondary/70">
            Sin imagen
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-2">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            {product.category?.name ?? "Sin categoría"}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-secondary">{product.name}</h3>
          <p className="mt-1 text-sm text-secondary/70">
            {product.store?.name ?? "Tienda local"}
          </p>
        </div>

        {product.description ? (
          <p className="text-sm text-secondary/70">{product.description}</p>
        ) : null}

        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-lg font-semibold text-secondary">{formattedPrice}</p>
          <Link
            href={`/products/${product.id}`}
            className="rounded-full bg-secondary px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-primary"
          >
            Ver detalles
          </Link>
        </div>
      </div>
    </article>
  );
}
