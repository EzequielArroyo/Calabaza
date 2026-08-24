import ProductList from "./product-list";

export default function ProductGrid({ query }: { query?: string }) {
  return (
    <div className="mb-4">
      {/* Mobile */}
      <div className="flex flex-col gap-3 md:hidden">
        <ProductList query={query} variant="mobile" />
      </div>

      {/* Desktop */}
      <div className="hidden overflow-hidden rounded-xl border border-outline text-text-secondary shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-outline bg-surface uppercase tracking-wider">
              <tr>
                <th className="w-12 px-4 py-4">Imagen</th>
                <th className="px-4 py-4 text-left">Nombre</th>
                <th className="px-4 py-4 text-left">Categoria</th>
                <th className="px-4 py-4 text-left">Precio</th>
                <th className="w-32 px-4 py-4 text-left">Stock</th>
                <th className="w-32 px-4 py-4 text-left">Estado</th>
                <th className="w-24 px-4 py-4 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-outline">
              <ProductList query={query} variant="desktop" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}