import StoreForm from "./store-form";

export default function StoreOnboardingPage() {
  return (
    <main className="min-h-screen bg-neutral px-4 py-8 sm:px-6 md:py-12">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-8 text-center md:mb-10">
          <p className="text-sm font-semibold text-primary">Configuración inicial</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-secondary md:text-4xl">
            Creá tu tienda
          </h1>
          <p className="mt-3 text-sm leading-6 text-secondary/75 md:text-base">
            Completá estos datos para que las personas encuentren tu negocio cerca de ellas.
          </p>
        </div>
        <StoreForm />
      </div>
    </main>
  );
}
