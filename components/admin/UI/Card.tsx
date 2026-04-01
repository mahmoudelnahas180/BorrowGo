import { JSX } from "react";

export default function Card({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <div className="flex justify-between items-center bg-surface p-6 rounded-2xl border border-border shadow-sm">
      {children}
    </div>
  );
}
