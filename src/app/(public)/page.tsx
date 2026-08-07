import { ProductGrid } from "@/components/products/ProductGrid";

const sampleProducts = [
  {
    id: "1",
    name: "Calabaza orgánica",
    description: "Producto fresco de temporada disponible hoy.",
    price: 12000,
    stock: 8,
    category: { name: "Verduras" },
    store: { name: "La Huerta de Ana" },
  },
  {
    id: "2",
    name: "Pan artesanal",
    description: "Pan recién horneado para retirar en tienda.",
    price: 8500,
    stock: 12,
    category: { name: "Panadería" },
    store: { name: "El Horno Vivo" },
  },
  {
    id: "3",
    name: "Cafe tostado",
    description: "Café local con perfil suave y aromático.",
    price: 18000,
    stock: 5,
    category: { name: "Bebidas" },
    store: { name: "Café del Barrio" },
  },
];

export default function Home() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      
      <section className="rounded-3xl border border-primary/20 bg-white/70 p-4 shadow-sm sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-secondary">Productos destacados</h2>
            <p className="text-sm text-secondary/70">Explora productos cercanos y reserva en pocos pasos.</p>
          </div>
        </div>
        <ProductGrid products={sampleProducts} />
      </section>
    </div>
  );
}
