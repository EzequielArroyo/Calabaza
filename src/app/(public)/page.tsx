import { CategoryList } from "@/components/ui/CategoryList";
import ProductGrid from "@/components/products/ProductGrid";
import { SearchBar } from "@/components/products/SearchBar";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <section className="rounded-3xl border border-primary/20 bg-white/70 p-4 shadow-sm sm:p-6">
        <div className="mb-4 flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="w-full md:max-w-md">
              <SearchBar placeholder="Buscar producto o tienda" />
            </div>

            <CategoryList
              categories={[]}
            />
          </div>
        </div>
        <ProductGrid query={query} />
      </section>
    </div>
  );
}
