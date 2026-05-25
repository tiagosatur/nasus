"use client";

import { Button } from "./Button";
import { CalendarIcon } from "./CalendarIcon";
import { openCalendly } from "@/lib/calendly";

type Variant = "primary" | "dark";

export function BookButton({
  variant = "dark",
  iconSize = 16,
  className = "",
  children,
}: {
  variant?: Variant;
  iconSize?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Button variant={variant} onClick={openCalendly} className={className}>
      <CalendarIcon size={iconSize} />
      {children}
    </Button>
  );
}
