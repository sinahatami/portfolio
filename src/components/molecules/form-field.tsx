import type { ReactNode } from "react";
import { Label } from "@/components/atoms";

export interface FieldControlProps {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby"?: string;
}

interface FormFieldProps {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string | undefined;
  /** Render prop receives the ARIA wiring for the control. */
  children: (control: FieldControlProps) => ReactNode;
}

/**
 * Label + control + hint + error, wired together for assistive tech.
 * The control itself is supplied by the caller (OCP: any input works).
 */
export function FormField({
  id,
  label,
  hint,
  error,
  children,
}: FormFieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ");

  return (
    <div className="grid gap-1.5">
      <div className="flex items-baseline justify-between gap-4">
        <Label htmlFor={id}>{label}</Label>
        {hint ? (
          <span id={hintId} className="text-muted-foreground text-xs">
            {hint}
          </span>
        ) : null}
      </div>
      {children({
        id,
        "aria-invalid": Boolean(error),
        ...(describedBy ? { "aria-describedby": describedBy } : {}),
      })}
      {error ? (
        <p id={errorId} className="text-destructive text-sm">
          {error}
        </p>
      ) : null}
    </div>
  );
}
