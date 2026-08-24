import Chip from "@/components/ui/chip";
import type { ProductItem } from "../../types";
import Image from "next/image";
import ProductActions from "./product-actions";

type ProductItemProps = ProductItem;

export default function ProductCard(product: ProductItemProps) {
  return (
    <tr className="group transition-colors hover:bg-surface/50">
      <td className="w-12 px-4 py-4">
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
        <p className="truncate font-medium transition-colors group-hover:text-primary">
          {product.name}
        </p>
      </td>

      <td className="px-4 py-4">
        <Chip text={product.category.name} />
      </td>

      <td className="px-4 py-4">${String(product.price)}</td>

      <td className="px-4 py-4">{String(product.stock)}</td>

      <td className="px-4 py-4">
        <Chip text={product.active ? "Activo" : "Inactivo"} />
      </td>

      <td className="w-24 px-4 py-4 text-right">
        <ProductActions productId={product.id} />
      </td>
    </tr>
  );
}