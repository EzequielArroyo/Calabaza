import { ProductCard, type ProductCardItem } from "./ProductCard";

type ProductGridProps = {
  products: ProductCardItem[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (!products.length) {
    return (
      <div className="rounded-3xl border border-dashed border-primary/20 bg-white/70 p-8 text-center text-sm text-secondary/70">
        No hay productos disponibles por el momento.
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
