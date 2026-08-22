import Chip from "@/modules/shared/components/chip";
import type { ProductItem } from "../../types";
import Image from "next/image";
import ProductActions from "./product-actions";

type ProductItemProps = ProductItem;

export default function ProductCard(product: ProductItemProps){
    return (
      <tr className="group hover:bg-surface/50 transition-colors">
        {/* Image */}
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

        {/* Product Name */}
        <td className="px-4 py-4">
          <p className="truncate group-hover:text-primary transition-colors">
            {product.name}
          </p>

          <p className="md:hidden mt-0.5">
            {product.category.name} • ${String(product.price)}
          </p>
        </td>

        {/* Category */}
        <td className="hidden md:table-cell px-4 py-4">
          <Chip text={product.category.name} />
        </td>

        {/* Price */}
        <td className="hidden md:table-cell px-4 py-4">
          ${String(product.price)}
        </td>
        {/* Stock */}
        <td className="hidden md:table-cell px-4 py-4">
          {String(product.stock)}
        </td>
        {/* Status */}
        <td className="hidden md:table-cell px-4 py-4">
          <Chip text={product.active ? "Activo" : "Inactivo"} />
        </td>

        {/* Actions */}
        <td className="hidden md:table-cell w-24 px-4 py-4">
          <ProductActions productId={product.id}/>
        </td>
      </tr>
    );
}