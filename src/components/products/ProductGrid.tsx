import { ProductCard } from "./ProductCard";
import { getProducts } from "@/modules/products/data";



export default async function ProductGrid({ query }: { query: string }) {
  const products = await getProducts(query);

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
