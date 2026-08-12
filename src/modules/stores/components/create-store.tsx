"use client";
import { InputMap } from "@/components/forms/Input-map";
import InputText from "@/components/forms/input-text";
import InputTextarea from "@/components/forms/input-textarea";
import { createStore } from "@/modules/stores/actions";
import { ActionResult } from "@/modules/shared/actionResult";
import { useState, useActionState } from "react";
import { Button } from "@/components/ui/button";

const initialState: ActionResult = { success: false };
export default function CreateStore() {
  const [location, setLocation] = useState({
    latitude: "-34.6037",
    longitude: "-58.3816",
  });
  const [state, formAction, isPending] = useActionState(
    createStore,
    initialState,
  );
  function captureCurrentLocation() {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation({
          latitude: coords.latitude.toFixed(7),
          longitude: coords.longitude.toFixed(7),
        });
      },
      (error) => {
        console.error("Error al obtener la ubicación:", error);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  }
  return (
    <form
      action={formAction}
      noValidate
      className="bg-surface rounded-2xl border border-secondary/15 p-5 shadow-sm sm:p-7"
    >
      {state.message && !state.success && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
          {state.message}
        </div>
      )}
      <fieldset className="space-y-6">
        {/* Nombre de la tienda */}
        <InputText
          name="name"
          label="Nombre de la tienda"
          type="text"
          required={true}
          errorMessage={state.errors?.name?.[0]}
        />
        {/* Descripción */}
        <InputTextarea
          name="description"
          label="Descripción"
          maxLength={500}
          required={true}
          errorMessage={state.errors?.description?.[0]}
        />
        {/* Teléfono & Dirección Física */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText name="phone" label="Teléfono" type="tel" errorMessage={state.errors?.phone?.[0]} />
          <InputText
            name="address"
            label="Dirección física"
            type="text"
            required={true}
            errorMessage={state.errors?.address?.[0]}
          />
        </div>
      </fieldset>
      {/* Ubicación Section */}
      <fieldset className="border border border-secondary/15 rounded-xl p-5 mt-8">
        <legend>Ubicación de la tienda</legend>
        <p className="">
          Usá tu ubicación actual o ingresá las coordenadas manualmente.
        </p>
        <Button
          type="button"
          variant="primary-outlined"
          onClick={captureCurrentLocation}
        >
          {false ? "Obteniendo ubicación..." : "Usar mi ubicación actual"}
        </Button>
        <InputMap latitude={location.latitude} longitude={location.longitude} />
      </fieldset>
      {/* Submit Action */}
      <div className="mt-6 flex justify-end">
        <Button
          type="submit"
          variant="secondary"
        >
          Crear tienda
        </Button>
      </div>
    </form>
  );
}
