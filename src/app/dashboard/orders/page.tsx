import Link from "next/link";

import { getUserId } from "@/lib/auth";
import { getStoreByOwnerId } from "@/modules/dashboard/data";
import { getOrdersByStoreId } from "@/modules/orders/data";

export default async function OrdersPage() {
  const userId = await getUserId();

  const store = await getStoreByOwnerId(userId);

  if (!store) {
    return (
      <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-secondary">Órdenes</h1>

        <p className="mt-4 text-secondary/70">No tenés una tienda asociada.</p>
      </section>
    );
  }

  const orders = await getOrdersByStoreId(store.id);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary sm:text-4xl">
          Órdenes
        </h1>

        <p className="mt-2 text-secondary/70">
          Administrá las reservas realizadas en tu negocio.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-2xl border border-primary/15 bg-white p-8 text-center shadow-sm">
          <p className="font-semibold text-secondary">
            Todavía no tenés órdenes.
          </p>

          <p className="mt-2 text-sm text-secondary/70">
            Las nuevas reservas aparecerán acá.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => {
            const total = Number(order.total).toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            });

            const createdAt = order.createdAt.toLocaleDateString("es-AR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <article
                key={order.id}
                className="rounded-2xl border border-primary/15 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-bold text-secondary">
                        Orden #{order.id.slice(0, 8)}
                      </h2>

                      <OrderStatus status={order.status} />
                    </div>

                    <p className="mt-2 text-sm text-secondary/70">
                      {createdAt}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-sm text-secondary/60">Total</p>

                    <p className="text-xl font-bold text-primary">{total}</p>
                  </div>
                </div>

                <div className="mt-5 border-t border-primary/10 pt-4">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                      <p className="text-sm font-semibold text-secondary">
                        Cliente:
                      </p>

                      <p className="mt-1 text-sm text-secondary/70">
                        {order.customer.firstName + '' + order.customer.lastName}
                      </p>

                    </div>

                    <Link
                      href={`/dashboard/orders/${order.id}`}
                      className="inline-flex items-center justify-center rounded-xl border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
                    >
                      Ver orden
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

function OrderStatus({
  status,
}: {
  status:
    | "PENDING"
    | "PREPARING"
    | "READY_FOR_PICKUP"
    | "COMPLETED"
    | "CANCELLED";
}) {
  const labels = {
    PENDING: "Pendiente",
    PREPARING: "Preparando",
    READY_FOR_PICKUP: "Lista para retirar",
    COMPLETED: "Completada",
    CANCELLED: "Cancelada",
  };

  return (
    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
      {labels[status]}
    </span>
  );
}
