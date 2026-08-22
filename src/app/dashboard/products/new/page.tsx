import { getCategories } from '@/modules/categories/data';
import CreateProductForm from '@/modules/dashboard/components/forms/create-product-form'
const categories = await getCategories();
export default function CreateProductPage() {
  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 md:py-12">
      <div className="mx-auto w-full max-w-2xl">
        <section className="mb-8 text-center md:mb-10">
          <p className="text-sm font-semibold text-primary">
            Gestión de productos
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-secondary md:text-4xl">
            Agregá un producto
          </h1>

          <p className="mt-3 text-sm leading-6 text-secondary/75 md:text-base">
            Completá los datos para agregar un nuevo producto al catálogo de tu
            tienda.
          </p>
        </section>

        <CreateProductForm categories={categories}/>
      </div>
    </div>
  );
}
