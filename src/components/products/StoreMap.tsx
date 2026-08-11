type StoreMapProps = {
  latitude: string;
  longitude: string;
};

export function StoreMap({ latitude, longitude }: StoreMapProps) {
  const coordinates = `${latitude},${longitude}`;
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(coordinates)}&z=15&output=embed`;

  return (
    <iframe
      title={`Map for store at ${coordinates}`}
      src={mapUrl}
      className="min-h-64 w-full rounded-2xl border border-primary/20"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
