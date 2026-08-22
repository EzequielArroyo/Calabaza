import { getCategories } from '@/modules/categories/data';
import EditProductForm from '@/modules/dashboard/components/forms/edit-product-form'
import { GetProductById } from '@/modules/dashboard/data';
import { notFound } from "next/navigation";
type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: ProductPageProps) {
    const categories = await getCategories();
    const product = await GetProductById((await params).id)
    if (!product) {
      notFound();
    }
    const mappedProduct = {
        id: product.id,
        name: product?.name,
        description: product?.description,
        categoryId: product?.categoryId,
        price: product?.price.toNumber(),
        stock: product?.stock,
        imageUrl: product?.imageUrl,
    };
  
  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 md:py-12">
      <div className="mx-auto w-full max-w-2xl">
        <section className="mb-8 text-center md:mb-10">
          <p className="text-sm font-semibold text-primary">
            Gestión de productos
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-secondary md:text-4xl">
            Edita un producto
          </h1>

          <p className="mt-3 text-sm leading-6 text-secondary/75 md:text-base">
            Edita los datos del producto para modificarlo del catalogo de productos.
          </p>
        </section>

        <EditProductForm product={mappedProduct} categories={categories} />
      </div>
    </div>
  );
}
