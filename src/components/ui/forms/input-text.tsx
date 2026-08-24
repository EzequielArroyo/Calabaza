import { FieldError } from "./field-error";

export default function InputText({
  name,
  label,
  type,
  defaultValue,
  required = false,
  errorMessage,
}: {
  name: string;
  label: string;
  type: string;
  defaultValue?: string | number;
  required?: boolean;
  errorMessage?: string;
}) {
  return (
    <div>
      <label className="block mb-1.5" htmlFor={name}>
        {label} <span aria-hidden="true">*</span>
      </label>
      <input
        className="bg-background w-full border border-secondary/25 rounded-lg px-3 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
      />
      <FieldError message={errorMessage} />
    </div>
  );
}