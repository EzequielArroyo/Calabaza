import Image from "next/image";
import CartItemActions from "./cart-item-actions";
import CartSumary from "./cart-sumary";

export type CartItemView = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    imageUrl: string | null;
    price: number;
  };
};

type CartProps = {
  items: CartItemView[];
};

export function Cart({ items }: CartProps) {
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
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
            const price = item.product.price.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            });

            return (
              <article
                key={item.id}
                className="relative flex flex-col gap-4 rounded-2xl border border-primary/15 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="flex gap-4">
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

                  <div className="flex flex-1 flex-col justify-center">
                    <h2 className="text-lg font-bold text-secondary">
                      {item.product.name}
                    </h2>

                    <p className="mt-1 font-semibold text-primary">{price}</p>
                  </div>
                </div>

                <div className="sm:ml-auto">
                  <CartItemActions
                    itemId={item.id}
                    itemQuantity={item.quantity}
                  />
                </div>
              </article>
            );
          })}
        </div>

       <CartSumary subTotal={formattedSubtotal}/>
      </div>
    </main>
  );
}
