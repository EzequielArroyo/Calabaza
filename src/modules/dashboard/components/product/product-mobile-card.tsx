import Chip from "@/components/ui/chip";
import type { ProductItem } from "../../types";
import Image from "next/image";
import ProductActions from "./product-actions";
type ProductItemProps = ProductItem;
export default function ProductMobileCard(product: ProductItemProps) {
  return (
    <article className="rounded-xl border border-outline bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded-lg object-cover"
          />
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-secondary">{product.name}</p>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-on-surface-variant">
            <span>{product.category.name}</span>
            <span>•</span>
            <span>${String(product.price)}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span>Stock: {String(product.stock)}</span>

          <Chip text={product.active ? "Activo" : "Inactivo"} />
        </div>

        <div className="shrink-0">
          <ProductActions productId={product.id} />
        </div>
      </div>
    </article>
  );
}
