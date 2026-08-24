import { getUserId } from "@/lib/auth";
import { getCartByUserId } from "@/modules/cart/data";
import { Cart } from "@/modules/cart/components/cart";

export default async function Page() {
  const userId = await getUserId();

  const cart = await getCartByUserId(userId);

  if (!cart || cart.items.length === 0) {
    return (
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-secondary">Tu carrito</h1>

        <p className="mt-4 text-secondary/70">Tu carrito está vacío.</p>
      </main>
    );
  }

  const items = cart.items.map((item) => ({
    ...item,
    product: {
      ...item.product,
      price: Number(item.product.price),
    },
  }));

  return <Cart items={items} />;
}
