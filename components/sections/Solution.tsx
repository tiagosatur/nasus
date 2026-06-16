"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type MapsSurface = {
  type: "maps";
  num: string;
  label: string;
  title: string;
  body: string;
  query: string;
  resultLabel: string;
  result: string;
};

type SearchSurface = {
  type: "search";
  num: string;
  label: string;
  title: string;
  body: string;
  query: string;
  yourDomain: string;
  yourTitle: string;
  yourSnippet: string;
  resultLabel: string;
  result: string;
};

type AiSurface = {
  type: "ai";
  num: string;
  label: string;
  title: string;
  body: string;
  query: string;
  answer: string;
  resultLabel: string;
  result: string;
};

type Surface = MapsSurface | SearchSurface | AiSurface;

const GPT = {
  bg: "#EDEAE5",
  text: "#1C0F14",
  accent: "#7B1F3A",
} as const;

export function Solution() {
  const t = useTranslations("solution");
  const sectionRef = useRef<HTMLElement>(null);

  const surfaces = t.raw("surfaces") as Surface[];
  const you = t("you");
  const competitorA = t("competitorA");
  const competitorB = t("competitorB");
  const citedBadge = t("citedBadge");

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const header = sectionRef.current!.querySelector("[data-header]");
      gsap.from(header, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      const cardEls = sectionRef.current!.querySelectorAll("[data-surface]");
      gsap.from(cardEls, {
        opacity: 0,
        y: 40,
        stagger: 0.14,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
      });

      const closer = sectionRef.current!.querySelector("[data-closer]");
      gsap.from(closer, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: closer, start: "top 85%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="solucao"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-bg-primary"
    >
      <div className="max-w-6xl mx-auto">

        <div data-header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-20">
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-[0.12em] text-text-muted font-mono mb-5">
              {t("sectionLabel")}
            </p>
            <h2
              className="font-sans font-bold text-text-primary leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
            >
              {t("headline")}
            </h2>
          </div>
          <p className="text-text-secondary text-base max-w-xs leading-relaxed">
            {t("tagline")}
          </p>
        </div>

        <div className="grid gap-4 md:gap-5 lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr]">
          {surfaces.map((surface) => (
            <article
              key={surface.num}
              data-surface
              className="bg-bg-card border border-border flex flex-col lg:grid lg:grid-rows-subgrid lg:row-span-3"
            >
              <div className="px-6 pt-5 pb-4 flex items-center justify-between border-b border-border">
                <span className="font-mono text-xs text-text-muted">{surface.num}</span>
                <span className="text-[11px] font-semibold text-accent uppercase tracking-widest">
                  {surface.label}
                </span>
              </div>

              <div className="border-b border-border">
                {surface.type === "maps" && (
                  <MapsMockup query={surface.query} you={you} competitorA={competitorA} competitorB={competitorB} />
                )}
                {surface.type === "search" && (
                  <SearchMockup
                    query={surface.query}
                    you={you}
                    yourDomain={surface.yourDomain}
                    yourTitle={surface.yourTitle}
                    yourSnippet={surface.yourSnippet}
                    competitorA={competitorA}
                    competitorB={competitorB}
                  />
                )}
                {surface.type === "ai" && (
                  <AiMockup
                    query={surface.query}
                    answer={surface.answer}
                    you={you}
                    competitorA={competitorA}
                    competitorB={competitorB}
                    citedBadge={citedBadge}
                  />
                )}
              </div>

              <div className="px-6 pt-6 pb-6 flex flex-col flex-1 gap-5">
                <div>
                  <h3
                    className="font-sans font-bold text-text-primary leading-tight mb-3"
                    style={{ fontSize: "clamp(1.1rem, 1.7vw, 1.3rem)" }}
                  >
                    {surface.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {surface.body}
                  </p>
                </div>

                <div className="mt-auto border-l-2 border-accent pl-4">
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-accent opacity-70 block mb-1.5">
                    {surface.resultLabel}
                  </span>
                  <p className="text-sm font-semibold text-accent leading-snug">
                    {surface.result}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p
          data-closer
          className="mt-14 md:mt-20 max-w-2xl font-sans font-bold text-text-primary leading-[1.2]"
          style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.5rem)" }}
        >
          {t("closer")}
          <span className="text-accent-on-dark">{t("closerAccent")}</span>
        </p>

      </div>
    </section>
  );
}

/* ─── Mockup: Maps ────────────────────────────────────────────── */

function MapsMockup({
  query,
  you,
  competitorA,
  competitorB,
}: {
  query: string;
  you: string;
  competitorA: string;
  competitorB: string;
}) {
  return (
    <div className="bg-bg-secondary h-full flex flex-col">
      <div className="px-4 pt-4 pb-3 bg-bg-primary border-b border-border">
        <div className="flex items-center gap-2.5 bg-bg-card border border-border rounded-full px-3.5 py-2.5">
          <SearchIcon />
          <span className="text-xs text-text-secondary flex-1 truncate">{query}</span>
        </div>
      </div>

      <div className="relative flex-1 min-h-44 overflow-hidden bg-bg-secondary">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `linear-gradient(rgba(123,31,58,0.06) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(123,31,58,0.06) 1px, transparent 1px)`,
            backgroundSize: "22px 22px",
          }}
        />
        <div className="absolute top-1/3 -left-4 -right-4 h-px bg-text-muted opacity-25 rotate-[-3deg]" />
        <div className="absolute top-2/3 -left-4 -right-4 h-px bg-text-muted opacity-25 rotate-[2deg]" />
        <div className="absolute left-1/4 -top-4 -bottom-4 w-px bg-text-muted opacity-25 rotate-[1deg]" />
        <div className="absolute left-3/4 -top-4 -bottom-4 w-px bg-text-muted opacity-25 rotate-[-2deg]" />

        <div className="absolute top-[22%] left-[62%]">
          <span className="block w-2.5 h-2.5 rounded-full bg-text-muted opacity-50 border border-bg-card" />
        </div>
        <div className="absolute bottom-[18%] left-[22%]">
          <span className="block w-2.5 h-2.5 rounded-full bg-text-muted opacity-50 border border-bg-card" />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <span className="ripple-dot w-4 h-4">
            <span className="block w-4 h-4 rounded-full bg-accent relative z-10 border-2 border-bg-card shadow-md" />
          </span>
          <span className="mt-2 bg-accent text-text-inverse text-[9px] font-mono uppercase tracking-[0.15em] px-2 py-1 whitespace-nowrap">
            {you}
          </span>
        </div>
      </div>

      <div className="divide-y divide-border">
        <div className="px-4 py-2.5 flex items-center gap-3 bg-success-muted/60 relative">
          <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-text-primary" />
          <span className="block w-2 h-2 rounded-full bg-text-primary flex-shrink-0" />
          <span className="text-xs font-semibold text-text-primary flex-1 capitalize">{you}</span>
          <span className="text-[9px] font-mono text-text-primary opacity-70 uppercase tracking-widest">
            01
          </span>
        </div>
        <div className="px-4 py-2.5 flex items-center gap-3 opacity-50">
          <span className="block w-2 h-2 rounded-full bg-text-muted flex-shrink-0" />
          <span className="text-xs text-text-secondary flex-1">{competitorA}</span>
          <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">02</span>
        </div>
        <div className="px-4 py-2.5 flex items-center gap-3 opacity-40">
          <span className="block w-2 h-2 rounded-full bg-text-muted flex-shrink-0" />
          <span className="text-xs text-text-secondary flex-1">{competitorB}</span>
          <span className="text-[9px] font-mono text-text-muted uppercase tracking-widest">03</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Mockup: Google Search ────────────────────────────────────── */

function SearchMockup({
  query,
  you,
  yourDomain,
  yourTitle,
  yourSnippet,
  competitorA,
  competitorB,
}: {
  query: string;
  you: string;
  yourDomain: string;
  yourTitle: string;
  yourSnippet: string;
  competitorA: string;
  competitorB: string;
}) {
  return (
    <div className="bg-bg-card h-full flex flex-col">
      <div className="px-4 pt-4 pb-3 bg-bg-primary border-b border-border">
        <div className="flex items-center gap-2.5 bg-bg-card border border-border rounded-full px-3.5 py-2.5">
          <SearchIcon />
          <span className="text-xs text-text-secondary flex-1 truncate">{query}</span>
        </div>
      </div>

      <div className="divide-y divide-border flex-1">
        <div className="px-4 py-3.5 bg-success-muted/60 relative">
          <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-text-primary" />
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-text-primary">
              {you}
            </span>
            <span className="text-[10px] text-text-primary/55">·</span>
            <span className="text-[10px] text-text-primary/55">{yourDomain}</span>
          </div>
          <div className="text-xs text-link font-medium leading-snug mb-1">
            {yourTitle}
          </div>
          <div className="text-[10px] text-text-primary/70 leading-snug line-clamp-2">
            {yourSnippet}
          </div>
        </div>

        <div className="px-4 py-3 opacity-55">
          <div className="text-[10px] text-text-muted mb-0.5">site-generico-a.com.br</div>
          <div className="text-xs text-link leading-snug">{competitorA}</div>
        </div>
        <div className="px-4 py-3 opacity-40">
          <div className="text-[10px] text-text-muted mb-0.5">site-generico-b.com.br</div>
          <div className="text-xs text-link leading-snug">{competitorB}</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Mockup: AI (ChatGPT-like) ────────────────────────────────── */

function AiMockup({
  query,
  answer,
  you,
  competitorA,
  competitorB,
  citedBadge,
}: {
  query: string;
  answer: string;
  you: string;
  competitorA: string;
  competitorB: string;
  citedBadge: string;
}) {
  return (
    <div style={{ backgroundColor: GPT.bg }} className="h-full flex flex-col">
      <div className="px-4 pt-4 pb-4 space-y-3 flex-1">
        <div className="flex justify-end">
          <div
            className="text-xs px-3 py-2 rounded-xl rounded-br-sm max-w-[85%] leading-relaxed shadow-sm"
            style={{ backgroundColor: "#FFFFFF", color: GPT.text }}
          >
            {query}
          </div>
        </div>

        <div className="flex gap-2 items-start">
          <div className="w-5 h-5 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
            <ChatGptGlyph />
          </div>
          <div
            className="text-xs leading-relaxed px-3 py-2 rounded-xl rounded-tl-sm shadow-sm flex-1"
            style={{ backgroundColor: "#FFFFFF", color: GPT.text }}
          >
            {answer}
            <ul className="mt-2 space-y-1.5">
              <li className="flex items-center gap-2 px-2 py-1 -mx-1 bg-success-muted/70 relative">
                <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-text-primary" />
                <span className="text-text-primary font-bold">•</span>
                <span className="font-semibold text-text-primary flex-1 capitalize">{you}</span>
                <span className="text-[9px] font-mono text-text-primary uppercase tracking-widest opacity-80">
                  {citedBadge}
                </span>
              </li>
              <li className="flex gap-1.5 opacity-55 px-2 py-0.5">
                <span style={{ color: GPT.accent }}>•</span>
                <span>{competitorA}</span>
              </li>
              <li className="flex gap-1.5 opacity-45 px-2 py-0.5">
                <span style={{ color: GPT.accent }}>•</span>
                <span>{competitorB}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Icons ────────────────────────────────────────────────────── */

function SearchIcon() {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#9E8E80"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function ChatGptGlyph() {
  return (
    <svg width="10" height="10" viewBox="0 0 41 41" fill="none" aria-hidden="true">
      <path
        d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-7.505-3.337 10.079 10.079 0 0 0-9.612 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.504 3.336 10.079 10.079 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813zm-5.101 10.08a7.28 7.28 0 0 1-4.669 3.461l-.04.01-.007.001-1.15.314a7.495 7.495 0 0 1-5.614-1.083 9.98 9.98 0 0 0 1.24-2.085l.006-.013a.278.278 0 0 0-.048-.295.284.284 0 0 0-.29-.086l-.028.008a9.774 9.774 0 0 1-2.944.451 9.726 9.726 0 0 1-9.61-8.137l-.023-.144a7.29 7.29 0 0 1 1.218-5.483 7.28 7.28 0 0 1 4.669-3.046l.041-.01 1.15-.313a7.497 7.497 0 0 1 5.616 1.083 9.987 9.987 0 0 0-1.241 2.086l-.006.014a.277.277 0 0 0 .048.294.283.283 0 0 0 .29.086l.028-.008a9.774 9.774 0 0 1 2.944-.451 9.727 9.727 0 0 1 9.61 8.138l.023.143a7.291 7.291 0 0 1-1.218 5.037z"
        fill="#C45C7A"
      />
    </svg>
  );
}
