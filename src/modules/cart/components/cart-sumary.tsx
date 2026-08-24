'use client'
import { createOrderAction } from "@/modules/orders/action";
import { Button } from "@/components/ui/button";
export default function CartSumary({subTotal}:{subTotal:string}) {
  async function handleClick() {
    await createOrderAction();
  }
  return (
    <aside className="lg:sticky lg:top-24 lg:col-span-4">
      <div className="rounded-2xl border border-primary/15 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-secondary">Resumen</h2>

        <div className="mb-6 flex items-center justify-between">
          <span className="text-secondary/70">Subtotal</span>

          <span className="font-semibold text-secondary">{subTotal}</span>
        </div>

        <div className="mb-6 border-t border-primary/15 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-secondary">Total</span>

            <span className="text-xl font-bold text-primary">{subTotal}</span>
          </div>
        </div>

        <div className="mb-6 rounded-xl border border-primary/15 bg-primary/5 p-4">
          <p className="font-semibold text-secondary">Retiro en tienda</p>

          <p className="mt-1 text-sm text-secondary/70">
            Reservás los productos y pagás directamente al retirarlos en el
            comercio.
          </p>
        </div>
        <Button variant="primary" onClick={handleClick}>
          Reservar productos
        </Button>
      </div>
    </aside>
  );
}
