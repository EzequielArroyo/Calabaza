import { GetProducts } from "../../data";
import ProductCard from "./product-card";
import ProductMobileCard from "./product-mobile-card";
import type { ProductItem } from "../../types";
type ProductList = ProductItem[];
type ProductListProps = {
  query?: string;
  variant: "mobile" | "desktop";
};

export default async function ProductList({
  query,
  variant,
}: ProductListProps) {
  const products: ProductList = await GetProducts(query);

  if (!products.length) {
    if (variant === "mobile") {
      return (
        <div className="rounded-xl border border-dashed border-primary/20 bg-white/70 p-8 text-center text-sm text-secondary/70">
          No hay productos disponibles por el momento.
        </div>
      );
    }

    return (
      <tr>
        <td colSpan={7} className="p-8 text-center text-sm text-secondary/70">
          No hay productos disponibles por el momento.
        </td>
      </tr>
    );
  }

  return products.map((product) =>
    variant === "mobile" ? (
      <ProductMobileCard key={product.id} {...product} />
    ) : (
      <ProductCard key={product.id} {...product} />
    ),
  );
}