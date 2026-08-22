import { FieldError } from "./field-error";

export default function InputTextarea({
  name,
  label,
  maxLength = 500,
  required = false,
  defaultValue,
  errorMessage,
}: {
  name: string;
  label: string;
  maxLength?: number;
  required?: boolean;
  defaultValue?: string;
  errorMessage?: string;
}) {
  return (
    <div>
      <label className="block mb-1.5" htmlFor={name}>
        {label} <span aria-hidden="true">*</span>
      </label>
      <textarea
        className="bg-background w-full border border-secondary/25 rounded-lg px-3 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
        id={name}
        name={name}
        defaultValue={defaultValue}
        maxLength={maxLength}
        required={required}
      />
      <FieldError message={errorMessage} />
    </div>
  );
}
