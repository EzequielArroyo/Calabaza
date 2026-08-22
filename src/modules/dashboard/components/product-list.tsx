import { getProducts } from "../data"
import ProductCard from "./product-card";
import type { ProductItem } from "../types";
type ProductList = ProductItem[];
export default async function ProductList({query}:{query?: string}){
     const products: ProductList = await getProducts(query);

     if (!products.length) {
    return (
      <div className="rounded-3xl border border-dashed border-primary/20 bg-white/70 p-8 text-center text-sm text-secondary/70">
        No hay productos disponibles por el momento.
      </div>
    );
  }

  return (
      products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))
  );
}