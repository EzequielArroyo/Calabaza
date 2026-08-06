export default function Home() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-16">
      <div className="max-w-2xl">
        <p className="mb-3 inline-flex rounded-full border border-primary/20 bg-white px-3 py-1 text-sm font-medium text-primary">
          Marketplace local y de reserva
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-secondary sm:text-5xl">
          Descubre productos cerca de ti y recógelos en tienda.
        </h1>
        <p className="mt-4 text-lg text-secondary/80">
          Calabaza conecta a clientes con negocios cercanos para reservar productos y recogerlos sin esperas innecesarias.
        </p>
      </div>

      <div className="rounded-3xl border border-primary/20 bg-white p-6 shadow-sm sm:p-8">
        <h2 className="text-xl font-semibold text-secondary">¿Qué puedes hacer?</h2>
        <ul className="mt-4 space-y-3 text-sm text-secondary/80">
          <li>• Buscar productos disponibles cerca de tu ubicación.</li>
          <li>• Reservar con un flujo simple y rápido.</li>
          <li>• Recoger en tienda y pagar al momento de retirar.</li>
        </ul>
      </div>
    </section>
  );
}
