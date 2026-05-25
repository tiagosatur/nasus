"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type Stat = { value: number; suffix: string; label: string; sublabel: string };

export function Proof() {
  const t = useTranslations("proof");
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const stats = t.raw("stats") as Stat[];

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const header = sectionRef.current!.querySelector("[data-header]");
      gsap.from(header, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });

      const numbers = sectionRef.current!.querySelectorAll("[data-number]");
      gsap.from(numbers, {
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
      });

      stats.forEach((stat, i) => {
        const el = countersRef.current[i];
        if (!el) return;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: stat.value,
          duration: 2,
          ease: "power2.out",
          delay: i * 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: "top 65%" },
          onUpdate() {
            const v = stat.value % 1 !== 0
              ? obj.val.toFixed(1)
              : Math.round(obj.val).toString();
            el.textContent = v + stat.suffix;
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="prova"
      data-cursor-dark
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-surface-terra"
    >
      <div className="max-w-6xl mx-auto">
        <div data-header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
          <div>
            <p className="text-sm uppercase tracking-[0.12em] text-[rgba(250,247,242,0.5)] font-mono mb-5">
              {t("sectionLabel")}
            </p>
            <h2
              className="font-sans font-bold text-text-inverse leading-[1.05]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              {t("headline")}
            </h2>
          </div>
          <p className="text-[rgba(250,247,242,0.65)] text-base max-w-xs leading-relaxed">
            {t("tagline")}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 md:gap-8 border-t border-[rgba(250,247,242,0.2)] pt-12">
          {stats.map((stat, i) => (
            <div key={i} data-number>
              <div
                className="font-sans font-bold text-text-inverse leading-none mb-3 tabular-nums"
                style={{ fontSize: "clamp(1.75rem, 8vw, 8rem)" }}
              >
                <span ref={(el) => { countersRef.current[i] = el; }}>
                  0{stat.suffix}
                </span>
              </div>
              <div className="font-semibold text-text-inverse text-sm md:text-base mb-1">
                {stat.label}
              </div>
              <div className="text-[rgba(250,247,242,0.55)] text-xs md:text-sm">
                {stat.sublabel}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
