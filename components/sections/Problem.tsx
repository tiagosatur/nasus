"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const GPT = {
  bg: "#EDEAE5",
  bubble: "#DDD9D3",
  text: "#1C0F14",
  muted: "#7B5465",
  accent: "#7B1F3A",
} as const;

type PainPoint = { num: string; impact: string; text: string };
type GoogleResult = { domain: string; title: string };

export function Problem() {
  const t = useTranslations("problem");
  const sectionRef = useRef<HTMLElement>(null);

  const painPoints = t.raw("painPoints") as PainPoint[];
  const googleResults = t.raw("googleResults") as GoogleResult[];
  const aiNames = t.raw("aiNames") as string[];

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const headline = sectionRef.current!.querySelector("[data-headline]");
      gsap.from(headline, {
        opacity: 0,
        y: 32,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      const points = sectionRef.current!.querySelectorAll("[data-point]");
      gsap.from(points, {
        opacity: 0,
        y: 28,
        stagger: 0.15,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 55%" },
      });

      const channels = sectionRef.current!.querySelectorAll("[data-channel]");
      gsap.from(channels, {
        opacity: 0,
        y: 24,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 30%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="problema"
      data-cursor-dark
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-surface-dark"
    >
      <div className="max-w-6xl mx-auto">

        <div data-headline className="mb-16 md:mb-20">
          <p className="text-sm uppercase tracking-[0.12em] text-text-inverse-muted font-mono mb-6">
            {t("sectionLabel")}
          </p>
          <h2
            className="font-sans font-bold text-text-inverse leading-[1.04] max-w-3xl"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            {t("headline")}
            <span className="text-accent-on-dark">{t("headlineAccent")}</span>
          </h2>
        </div>

        <div className="border-t border-border-dark mb-16 md:mb-20">
          {painPoints.map((point) => (
            <div
              key={point.num}
              data-point
              className="grid grid-cols-[1fr_auto] items-center gap-8 md:gap-16 py-10 border-b border-border-dark last:border-b-0"
            >
              <div className="flex gap-6 md:gap-10 items-start">
                <span className="font-mono text-xs text-text-inverse-muted mt-2 flex-shrink-0 w-6">
                  {point.num}
                </span>
                <p
                  className="font-sans font-bold text-text-inverse leading-[1.15]"
                  style={{ fontSize: "clamp(1.2rem, 2.2vw, 1.75rem)" }}
                >
                  {point.text}
                </p>
              </div>
              <p
                className="font-display italic text-accent-on-dark text-right leading-none flex-shrink-0 hidden sm:block"
                style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}
              >
                {point.impact}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-12 pt-12 md:pt-16 -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24 border-t border-border-dark">

          <div>
            <p
              className="font-sans font-bold text-text-inverse leading-[1.1] max-w-2xl"
              style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.75rem)" }}
            >
              {t("bridge")}
              <span className="text-accent-on-dark">{t("bridgeAccent")}</span>
            </p>
            <p className="text-text-inverse text-base mt-4 max-w-xl leading-relaxed opacity-80">
              {t("bridgeSub")}
            </p>
            <p className="text-text-inverse text-sm mt-6 opacity-50">
              {t("channelsIntro")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-14">

            {/* Google */}
            <div data-channel className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-text-inverse-muted">01</span>
                <span className="w-6 h-px bg-border-dark" />
                <span className="text-xs font-bold text-text-inverse uppercase tracking-widest">
                  {t("googleChannel")}
                </span>
              </div>

              <div className="bg-bg-card overflow-hidden shadow-[0_0_0_1px_rgba(255,255,255,0.07)]">
                <div className="px-4 pt-4 pb-3 border-b border-border bg-bg-primary">
                  <div className="flex items-center gap-2.5 bg-bg-secondary border border-border rounded-full px-3.5 py-2.5">
                    <SearchIcon />
                    <span className="text-xs text-text-secondary flex-1">
                      {t("googleQuery")}
                    </span>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {googleResults.map((r, i) => (
                    <div key={i} className="px-4 py-3">
                      <div className="text-[10px] text-text-muted mb-0.5">{r.domain}</div>
                      <div className="text-xs text-link font-medium leading-snug">{r.title}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-accent-muted px-4 py-3 flex items-center gap-2 border-t border-border">
                  <span className="ripple-dot w-1.5 h-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent block relative z-10" />
                  </span>
                  <span className="text-xs font-semibold text-accent">{t("notFoundGoogle")}</span>
                </div>
              </div>

              <p className="text-sm text-text-inverse leading-relaxed opacity-75">
                {t("googleFootnote")}
              </p>
            </div>

            {/* AI */}
            <div data-channel className="flex flex-col gap-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-text-inverse-muted">02</span>
                <span className="w-6 h-px bg-border-dark" />
                <span className="text-xs font-bold text-text-inverse uppercase tracking-widest">
                  {t("aiChannel")}
                </span>
              </div>

              <div
                className="overflow-hidden border border-border"
                style={{ backgroundColor: GPT.bg }}
              >
                <div className="px-4 pt-4 pb-3 space-y-3">
                  <div className="flex justify-end">
                    <div
                      className="text-xs px-3 py-2 rounded-xl rounded-br-sm max-w-[200px] leading-relaxed shadow-sm"
                      style={{ backgroundColor: "#FFFFFF", color: GPT.text }}
                    >
                      {t("aiQuestion")}
                    </div>
                  </div>
                  <div className="flex gap-2 items-start">
                    <div className="w-5 h-5 rounded-full bg-accent-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 41 41" fill="none" aria-hidden="true">
                        <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-7.505-3.337 10.079 10.079 0 0 0-9.612 6.977 9.967 9.967 0 0 0-6.664 4.834 10.08 10.08 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 7.504 3.336 10.079 10.079 0 0 0 9.617-6.981 9.967 9.967 0 0 0 6.663-4.834 10.079 10.079 0 0 0-1.243-11.813zm-5.101 10.08a7.28 7.28 0 0 1-4.669 3.461l-.04.01-.007.001-1.15.314a7.495 7.495 0 0 1-5.614-1.083 9.98 9.98 0 0 0 1.24-2.085l.006-.013a.278.278 0 0 0-.048-.295.284.284 0 0 0-.29-.086l-.028.008a9.774 9.774 0 0 1-2.944.451 9.726 9.726 0 0 1-9.61-8.137l-.023-.144a7.29 7.29 0 0 1 1.218-5.483 7.28 7.28 0 0 1 4.669-3.046l.041-.01 1.15-.313a7.497 7.497 0 0 1 5.616 1.083 9.987 9.987 0 0 0-1.241 2.086l-.006.014a.277.277 0 0 0 .048.294.283.283 0 0 0 .29.086l.028-.008a9.774 9.774 0 0 1 2.944-.451 9.727 9.727 0 0 1 9.61 8.138l.023.143a7.291 7.291 0 0 1-1.218 5.037z" fill="#C45C7A" />
                      </svg>
                    </div>
                    <div
                      className="text-xs leading-relaxed px-3 py-2 rounded-xl rounded-tl-sm shadow-sm"
                      style={{ backgroundColor: "#FFFFFF", color: GPT.text }}
                    >
                      {t("aiAnswer")}
                      <ul className="mt-1.5 space-y-1">
                        {aiNames.map(name => (
                          <li key={name} className="flex gap-1.5">
                            <span style={{ color: GPT.accent }}>•</span> {name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="px-3 pb-3">
                  <div className="flex items-center gap-2 px-3 py-2" style={{ backgroundColor: GPT.bubble }}>
                    <span className="text-xs flex-1 select-none" style={{ color: GPT.muted }}>
                      {t("aiPlaceholder")}
                    </span>
                    <div
                      className="w-5 h-5 flex items-center justify-center opacity-40"
                      style={{ backgroundColor: GPT.muted }}
                    >
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="bg-accent-muted px-4 py-3 flex items-center gap-2 border-t border-border">
                  <span className="ripple-dot w-1.5 h-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent block relative z-10" />
                  </span>
                  <span className="text-xs font-semibold text-accent">{t("notFoundAi")}</span>
                </div>
              </div>

              <p className="text-sm text-text-inverse leading-relaxed opacity-75">
                {t("aiFootnotePre")}{" "}
                <span className="font-medium opacity-100">{t("aeo")}</span>{" "}
                {t("aiFootnotePost")}
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function SearchIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9E8E80" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );
}
