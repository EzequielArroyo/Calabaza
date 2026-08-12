"use client";
import { InputMap } from "@/components/forms/Input-map";
import InputText from "@/components/forms/input-text";
import InputTextarea from "@/components/forms/input-textarea";
import { createStoreMock } from "@/modules/stores/actions";
import { useState } from "react";

export default function CreateStore() {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
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
      action={createStoreMock}
      className="bg-surface rounded-2xl border border-secondary/15 p-5 shadow-sm sm:p-7"
    >
      <fieldset className="space-y-6">
        {/* Nombre de la tienda */}
        <InputText
          name="name"
          label="Nombre de la tienda"
          type="text"
          required={true}
        />
        {/* Descripción */}
        <InputTextarea
          name="description"
          label="Descripción"
          maxLength={500}
          required={false}
        />
        {/* Teléfono & Dirección Física */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputText name="phone" label="Teléfono" type="tel" />
          <InputText
            name="address"
            label="Dirección física"
            type="text"
            required={true}
          />
        </div>
      </fieldset>
      {/* Ubicación Section */}
      <fieldset className="border border border-secondary/15 rounded-xl p-5 mt-8">
        <legend>Ubicación de la tienda</legend>
        <p className="">
          Usá tu ubicación actual o ingresá las coordenadas manualmente.
        </p>
        <button
          className="mt-4 inline-flex min-h-10 items-center justify-center rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          onClick={captureCurrentLocation}
        >
          {false ? "Obteniendo ubicación..." : "Usar mi ubicación actual"}
        </button>
        <InputMap latitude={location.latitude} longitude={location.longitude} />
      </fieldset>
      {/* Submit Action */}
      <div className="pt-6">
        <button
          className="w-full bg-primary-container text-on-primary-container font-label-md text-label-md py-4 rounded-lg hover:bg-primary transition-colors focus:ring-4 focus:ring-primary-fixed focus:outline-none shadow-sm"
          type="submit"
        >
          Crear tienda
        </button>
      </div>
    </form>
  );
}
