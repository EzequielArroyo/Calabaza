"use client";

import { useActionState, useState } from "react";

import { InputMap } from "@/components/ui/InputMap";
import { createStore } from "@/modules/stores/actions";
import type { ActionResult } from "@/modules/shared/actionResult";

const initialState: ActionResult = { success: false };

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.[0]) return null;

  return <p className="mt-1.5 text-sm text-red-700">{errors[0]}</p>;
}

export default function StoreForm() {
  const [state, formAction, isPending] = useActionState(createStore, initialState);
  const [locationMessage, setLocationMessage] = useState<string>();
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState({ latitude: "", longitude: "" });

  function captureCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationMessage("Tu navegador no permite obtener la ubicación. Ingresá las coordenadas manualmente.");
      return;
    }

    setIsLocating(true);
    setLocationMessage(undefined);

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation({
          latitude: coords.latitude.toFixed(7),
          longitude: coords.longitude.toFixed(7),
        });

        setLocationMessage("Ubicación actual cargada. Podés ajustar las coordenadas si lo necesitás.");
        setIsLocating(false);
      },
      (error) => {
        const message =
          error.code === error.PERMISSION_DENIED
            ? "No autorizaste el acceso a tu ubicación. Ingresá las coordenadas manualmente."
            : "No pudimos obtener tu ubicación. Ingresá las coordenadas manualmente.";

        setLocationMessage(message);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  }

  return (
    <form action={formAction} className="rounded-2xl border border-secondary/15 bg-white p-5 shadow-sm sm:p-7">
      <div className="space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-secondary" htmlFor="name">
            Nombre de la tienda <span aria-hidden="true">*</span>
          </label>
          <input className="w-full rounded-lg border border-secondary/25 bg-white px-3 py-2.5 text-secondary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" id="name" maxLength={150} name="name" required />
          <FieldError errors={state.errors?.name} />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-secondary" htmlFor="description">Descripción</label>
          <textarea className="min-h-28 w-full resize-y rounded-lg border border-secondary/25 bg-white px-3 py-2.5 text-secondary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" id="description" maxLength={5000} name="description" />
          <FieldError errors={state.errors?.description} />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-secondary" htmlFor="phone">Teléfono</label>
            <input className="w-full rounded-lg border border-secondary/25 bg-white px-3 py-2.5 text-secondary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" id="phone" maxLength={30} name="phone" type="tel" />
            <FieldError errors={state.errors?.phone} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-secondary" htmlFor="address">
              Dirección física <span aria-hidden="true">*</span>
            </label>
            <input className="w-full rounded-lg border border-secondary/25 bg-white px-3 py-2.5 text-secondary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" id="address" name="address" required />
            <FieldError errors={state.errors?.address} />
          </div>
        </div>

        <fieldset className="rounded-xl border border-secondary/15 bg-neutral/60 p-4">
          <legend className="px-1 text-sm font-semibold text-secondary">Ubicación de la tienda</legend>
          <p className="mt-1 text-sm text-secondary/75">Usá tu ubicación actual o ingresá las coordenadas manualmente.</p>
          <button className="mt-4 inline-flex min-h-10 items-center justify-center rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60" disabled={isLocating || isPending} onClick={captureCurrentLocation} type="button">
            {isLocating ? "Obteniendo ubicación..." : "Usar mi ubicación actual"}
          </button>
          {locationMessage && <p aria-live="polite" className="mt-2 text-sm text-secondary/80">{locationMessage}</p>}
          <div className="mt-4">
            <InputMap latitude={location.latitude} longitude={location.longitude} />
            <FieldError errors={state.errors?.latitude} />
            <FieldError errors={state.errors?.longitude} />
          </div>
        </fieldset>
      </div>

      {state.message && (
        <p aria-live="polite" className="mt-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-800">
          {state.message}
        </p>
      )}

      <button className="mt-6 flex min-h-11 w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60" disabled={isPending || isLocating} type="submit">
        {isPending ? "Creando tienda..." : "Crear tienda"}
      </button>
    </form>
  );
}
