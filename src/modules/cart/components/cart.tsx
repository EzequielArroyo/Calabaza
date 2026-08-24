import Image from "next/image";
import CartItemActions from "./cart-item-actions";

export type CartItemView = {
  id: string;
  quantity: number;
  price: number;
  product: {
    id: string;
    name: string;
    imageUrl: string | null;
  };
};

type CartProps = {
  items: CartItemView[];
};

export function Cart({ items }: CartProps) {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const formattedSubtotal = subtotal.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary sm:text-4xl">
          Tu carrito
        </h1>

        <p className="mt-2 text-base text-secondary/70">
          Revisá tus productos antes de reservar.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-4 lg:col-span-8">
          {items.map((item) => {
            const price = item.price.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            });

            return (
              <article
                key={item.id}
                className="relative flex gap-4 rounded-2xl border border-primary/15 bg-white p-4 shadow-sm"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-primary/5">
                  {item.product.imageUrl ? (
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-secondary/50">
                      Sin imagen
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-lg font-bold text-secondary">
                      {item.product.name}
                    </h2>

                    <p className="mt-1 font-semibold text-primary">{price}</p>
                  </div>


                </div>
                <CartItemActions itemId={item.id} itemQuantity={item.quantity}/>
              </article>
            );
          })}
        </div>

        <aside className="lg:sticky lg:top-24 lg:col-span-4">
          <div className="rounded-2xl border border-primary/15 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-bold text-secondary">Resumen</h2>

            <div className="mb-6 flex items-center justify-between">
              <span className="text-secondary/70">Subtotal</span>

              <span className="font-semibold text-secondary">
                {formattedSubtotal}
              </span>
            </div>

            <div className="mb-6 border-t border-primary/15 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-secondary">Total</span>

                <span className="text-xl font-bold text-primary">
                  {formattedSubtotal}
                </span>
              </div>
            </div>

            <div className="mb-6 rounded-xl border border-primary/15 bg-primary/5 p-4">
              <p className="font-semibold text-secondary">Retiro en tienda</p>

              <p className="mt-1 text-sm text-secondary/70">
                Reservás los productos y pagás directamente al retirarlos en el
                comercio.
              </p>
            </div>

            <button
              type="button"
              className="w-full rounded-xl bg-primary px-4 py-3 font-semibold text-white transition hover:opacity-90 active:scale-[0.98]"
            >
              Reservar productos
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
