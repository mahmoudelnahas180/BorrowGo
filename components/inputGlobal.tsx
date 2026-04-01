import { JSX } from "react";

export default function InputGlobal({
  type,
  placeholder,
  value,
  onChange,
  width,
  id,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: () => void;
  width?: string;
  id?: string;
}): JSX.Element {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border border-outline rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-surface text-text-primary placeholder:text-text-muted w-${width || "full"}`}
    />
  );
}
