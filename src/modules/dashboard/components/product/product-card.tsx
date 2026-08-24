import Chip from "@/components/ui/chip";
import type { ProductItem } from "../../types";
import Image from "next/image";
import ProductActions from "./product-actions";

type ProductItemProps = ProductItem;

export default function ProductCard(product: ProductItemProps) {
  return (
    <tr className="group hover:bg-surface/50 transition-colors">
      {/* Image - Desktop */}
      <td className="hidden md:table-cell w-12 px-4 py-4">
        {product.imageUrl && (
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-md object-cover"
          />
        )}
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-col gap-2">
          <p className="truncate font-medium group-hover:text-primary transition-colors">
            {product.name}
          </p>

          {/* Mobile */}
          <div className="flex flex-col gap-2 md:hidden">
            <div className="flex items-center gap-2 text-sm text-on-surface-variant">
              <span>{product.category.name}</span>
              <span>•</span>
              <span>${String(product.price)}</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-sm">
                <span>Stock: {String(product.stock)}</span>

                <Chip text={product.active ? "Activo" : "Inactivo"} />
              </div>

              <ProductActions productId={product.id} />
            </div>
          </div>
        </div>
      </td>
      
      <td className="hidden md:table-cell px-4 py-4">
        <Chip text={product.category.name} />
      </td>
      <td className="hidden md:table-cell px-4 py-4">
        ${String(product.price)}
      </td>
      <td className="hidden md:table-cell px-4 py-4">
        {String(product.stock)}
      </td>
      <td className="hidden md:table-cell px-4 py-4">
        <Chip text={product.active ? "Activo" : "Inactivo"} />
      </td>
      <td className="hidden md:table-cell w-24 px-4 py-4">
        <ProductActions productId={product.id} />
      </td>
    </tr>
  );
}