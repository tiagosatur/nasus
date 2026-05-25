"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Card = {
  num: string;
  label: string;
  title: string;
  body: string;
  tags: string[];
  resultLabel: string;
  result: string;
};

export function Solution() {
  const t = useTranslations("solution");
  const sectionRef = useRef<HTMLElement>(null);
  const cards = t.raw("cards") as Card[];

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

      const cardEls = sectionRef.current!.querySelectorAll("[data-card]");
      gsap.from(cardEls, {
        opacity: 0,
        y: 36,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 60%" },
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

        <div data-header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <p className="text-sm uppercase tracking-[0.12em] text-text-muted font-mono mb-5">
              {t("sectionLabel")}
            </p>
            <h2
              className="font-sans font-bold text-text-primary leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              {t("headline")}
            </h2>
          </div>
          <p className="text-text-secondary text-base max-w-xs leading-relaxed">
            {t("tagline")}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 md:gap-5">
          {cards.map((card) => (
            <div
              key={card.num}
              data-card
              className="bg-bg-card border border-border flex flex-col"
            >
              <div className="px-6 pt-5 pb-4 flex items-center justify-between border-b border-border">
                <span className="font-mono text-xs text-text-muted">{card.num}</span>
                <span className="text-[11px] font-semibold text-accent uppercase tracking-widest">
                  {card.label}
                </span>
              </div>

              <div className="px-6 pt-6 pb-6 flex flex-col flex-1 gap-5">
                <div className="flex-1">
                  <h3
                    className="font-sans font-bold text-text-primary leading-tight mb-3"
                    style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.35rem)" }}
                  >
                    {card.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {card.body}
                  </p>
                </div>

                <div className="border-l-2 border-accent pl-4">
                  <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-accent opacity-70 block mb-1.5">
                    {card.resultLabel}
                  </span>
                  <p className="text-sm font-semibold text-accent leading-snug">
                    {card.result}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] px-2.5 py-1 bg-bg-secondary border border-border text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
