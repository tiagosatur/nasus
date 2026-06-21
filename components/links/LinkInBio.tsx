"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { track } from "@vercel/analytics";
import { WA_DIAGNOSTIC } from "@/lib/whatsapp";
import { useSerpEntrance } from "./useSerpEntrance";
import { SearchBar } from "./SearchBar";
import { ResultCard, WhatsAppBadge } from "./ResultCard";
import { SocialLinks } from "./SocialLinks";
import { SECONDARY_LINKS } from "./data";

/**
 * Link-in-bio como uma página de resultados (SERP): a barra de busca "digita"
 * a marca e os links surgem como resultados rankeados — o WhatsApp trava no #1.
 * Reforça o conceito do site ("você aparece"). Apenas composição: a animação
 * vive em useSerpEntrance, e cada peça em seu próprio componente.
 *
 * Atenção: usa a paleta isolada `.links-page` (ver globals.css) — antipattern
 * consciente, pois esta página segue um mock editorial fora do design system.
 */
export function LinkInBio({ locale }: { locale: string }) {
  const t = useTranslations("links");
  const root = useRef<HTMLDivElement>(null);
  const prefix = locale === "en" ? "/en" : "";
  const query = t("searchQuery");

  useSerpEntrance(root, query);

  return (
    <main
      className="links-page relative min-h-dvh flex flex-col items-center justify-start px-6 pt-[7vh] pb-14"
      style={{ backgroundImage: "radial-gradient(circle at 50% 12%, color-mix(in srgb, var(--color-accent) 5%, transparent), transparent 45%)" }}
    >
      <div ref={root} className="w-full max-w-[360px] flex flex-col items-center">
        {/* Lockup em linha */}
        <div data-lockup className="text-center">
          <span className="font-display text-[38px] leading-none text-accent">Nasus</span>
          <span className="font-display text-[20px] leading-none text-text-primary">.digital</span>
          <p className="mt-2 text-[13px] text-[var(--links-handle)]">{t("handle")}</p>
        </div>

        {/* Headline + linha */}
        <h1 data-head className="font-display text-[26px] leading-[1.25] text-center text-text-primary mt-9 px-2">
          {t.rich("headline", { em: (chunks) => <em className="italic text-accent">{chunks}</em> })}
        </h1>
        <span data-line aria-hidden="true" className="gold-line w-20 mt-4 mb-7" />

        {/* Barra de busca — digita a marca */}
        <SearchBar query={query} />

        {/* Resultados */}
        <p data-results className="self-start mt-[18px] mb-[10px] pl-1 font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--links-num)]">
          {t("resultsLabel")}
        </p>

        <nav className="w-full flex flex-col gap-[11px]" aria-label={t("resultsLabel")}>
          <ResultCard
            rank="01"
            title={t("whatsapp")}
            sub={t("whatsappSub")}
            href={WA_DIAGNOSTIC}
            newTab
            arrowClassName="text-accent"
            leading={<WhatsAppBadge />}
            onClick={() => track("link_click", { target: "whatsapp", locale })}
          />
          {SECONDARY_LINKS.map(({ key, rank, internal, newTab, arrow, href }) => (
            <ResultCard
              key={key}
              rank={rank}
              title={t(key)}
              sub={t(`${key}Sub`)}
              href={href(prefix)}
              internal={internal}
              newTab={newTab}
              arrow={arrow}
              onClick={() => track("link_click", { target: key, locale })}
            />
          ))}
        </nav>

        <SocialLinks locale={locale} />

        <p data-foot className="mt-[26px] font-display italic text-[13px] text-text-muted text-center">
          {t("footer")}
        </p>
      </div>
    </main>
  );
}
