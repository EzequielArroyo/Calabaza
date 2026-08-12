export default function InputTextarea({
  name,
  label,
  maxLength = 500,
  required = false,
}: {
  name: string;
  label: string;
  maxLength?: number;
  required?: boolean;
}) {
  return (
    <>
      <label className="block mb-1.5" htmlFor={name}>
        {label} <span aria-hidden="true">*</span>
      </label>
      <textarea
        className="bg-background w-full border border-secondary/25 rounded-lg px-3 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        id={name}
        name={name}
        maxLength={maxLength}
        required={required}
      />
    </>
  );
}
