import type { ReactNode } from "react";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { ArrowRight, ArrowOut } from "./icons";

// Estilo único do card — definido uma vez e reaproveitado por todos os resultados.
const CARD_CLASS =
  "group flex items-center gap-[13px] w-full rounded-[18px] border border-black/[0.08] bg-[var(--links-surface)] px-[15px] py-[14px] text-text-primary transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-accent/30 hover:shadow-[var(--links-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

/** Selo verde do WhatsApp com beacon pulsante (resultado #1). */
export function WhatsAppBadge() {
  return (
    <span className="relative flex h-10 w-10 flex-none items-center justify-center rounded-[12px] bg-whatsapp text-white">
      <WhatsAppIcon size={20} />
      <span data-beacon aria-hidden="true" className="pointer-events-none absolute -top-[3px] -right-[3px] h-[9px] w-[9px] rounded-full bg-whatsapp" />
      <span aria-hidden="true" className="absolute -top-[3px] -right-[3px] h-[9px] w-[9px] rounded-full bg-whatsapp ring-2 ring-[var(--links-surface)]" />
    </span>
  );
}

type ResultCardProps = {
  rank: string;
  title: string;
  sub: string;
  href: string;
  internal?: boolean; // rota interna → <Link> do Next
  newTab?: boolean;
  arrow?: "right" | "out";
  arrowClassName?: string;
  leading?: ReactNode; // ex.: <WhatsAppBadge />
  onClick?: () => void;
};

/** Card de resultado da "SERP". Renderiza <Link> (interno) ou <a> (externo). */
export function ResultCard({
  rank,
  title,
  sub,
  href,
  internal = false,
  newTab = false,
  arrow = "right",
  arrowClassName = "text-text-primary",
  leading,
  onClick,
}: ResultCardProps) {
  const Arrow = arrow === "out" ? ArrowOut : ArrowRight;
  const body = (
    <>
      <span className="font-mono text-[12px] text-[var(--links-num)] tabular-nums">{rank}</span>
      {leading}
      <span className="flex-1 min-w-0">
        <span className="block text-[15.5px] font-bold leading-tight">{title}</span>
        <span className="block text-[12.5px] text-[var(--links-sub)] leading-tight mt-0.5">{sub}</span>
      </span>
      <Arrow className={`flex-none ${arrowClassName}`} />
    </>
  );

  if (internal) {
    return (
      <Link data-link href={href} onClick={onClick} className={CARD_CLASS}>
        {body}
      </Link>
    );
  }

  return (
    <a
      data-link
      href={href}
      target={newTab ? "_blank" : undefined}
      rel={newTab ? "noopener noreferrer" : undefined}
      onClick={onClick}
      className={CARD_CLASS}
    >
      {body}
    </a>
  );
}
