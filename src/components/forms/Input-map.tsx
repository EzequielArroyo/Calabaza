type InputMapProps = {
  latitude?: string;
  longitude?: string;
};

export function InputMap({
  latitude = "-34.6037",
  longitude = "-58.3816",
}: InputMapProps) {
  
  const coordinates = `${latitude},${longitude}`;
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(coordinates)}&z=15&output=embed`;

  return (
    <div className="mt-6">
      <input name="latitude" type="hidden" value={latitude} />
      <input name="longitude" type="hidden" value={longitude} />

        <iframe
          className="min-h-64 w-full rounded-xl border border-secondary/15"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={mapUrl}
          title={`Ubicación seleccionada: ${coordinates}`}
        />
    </div>
  );
}
