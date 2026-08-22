import ProductList from './product-list';

export default function ProductGrid(){
    return (
      <div className="rounded-xl border border-outline text-text-secondary shadow-sm overflow-hidden mb-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="hidden md:table-header-group border-b border-outline bg-surface uppercase tracking-wider">
              <tr>
                <th className="w-12 px-4 py-4"></th>
                <th className="px-4 py-4 text-left">Nombre</th>
                <th className="px-4 py-4 text-left">Categoria</th>
                <th className="px-4 py-4 text-left">Precio</th>
                <th className="w-32 px-4 py-4 text-left">Stock</th>
                <th className="w-32 px-4 py-4 text-left">Estado</th>
                <th className="w-24 px-4 py-4 text-right">Acciones</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-outline">
              <ProductList />
            </tbody>
          </table>
        </div>
      </div>
    );
}