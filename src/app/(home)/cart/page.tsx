import { getUserId } from "@/lib/auth";
import { getCartByUserId } from "@/modules/cart/data";

export default async function CartPage() {
  const userId = await getUserId();

  const cart = await getCartByUserId(userId);

  if (!cart || cart.items.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <main>
      <h1>Cart</h1>

      {cart.items.map((item) => (
        <div key={item.id}>
          <p>{item.product.name}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: {item.price.toString()}</p>
        </div>
      ))}
    </main>
  );
}
