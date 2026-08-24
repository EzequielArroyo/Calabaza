import { SearchBar } from "@/components/ui/SearchBar";
import ProductGrid from "@/modules/dashboard/components/product/product-grid";
import Link from "next/link";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
  return (
    <div className="min-h-[100vh] p-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl text-text-secondary font-bold mb-2">
            Gestión de Productos
          </h2>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full md:w-auto">
          <SearchBar placeholder="Buscar" />
          <Link
            href="/dashboard/products/new"
            className="bg-primary px-4 py-2 rounded-lg text-white"
          >
            Añadir producto
          </Link>
        </div>
      </header>
      <ProductGrid query={query} />
    </div>
  );
}