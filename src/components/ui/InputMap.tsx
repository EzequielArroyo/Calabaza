type InputMapProps = {
  latitude: string;
  longitude: string;
};

export function InputMap({ latitude, longitude }: InputMapProps) {
  const hasLocation =
    latitude !== "" &&
    longitude !== "" &&
    Number.isFinite(Number(latitude)) &&
    Number.isFinite(Number(longitude));

  const coordinates = `${latitude},${longitude}`;
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(coordinates)}&z=15&output=embed`;

  return (
    <div>
      <input name="latitude" type="hidden" value={latitude} />
      <input name="longitude" type="hidden" value={longitude} />

      {hasLocation ? (
        <iframe
          className="min-h-64 w-full rounded-xl border border-secondary/15"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={mapUrl}
          title={`Ubicación seleccionada: ${coordinates}`}
        />
      ) : (
        <div className="flex min-h-64 items-center justify-center rounded-xl border border-dashed border-secondary/30 bg-white px-6 text-center text-sm leading-6 text-secondary/75">
          Usá el botón para obtener tu ubicación y marcarla en el mapa.
        </div>
      )}
    </div>
  );
}
