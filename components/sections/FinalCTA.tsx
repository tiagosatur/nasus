"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useTranslations, useLocale } from "next-intl";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { BookButton } from "@/components/ui/BookButton";
import { WA_DIAGNOSTIC } from "@/lib/whatsapp";

type Guarantee = { label: string; desc: string };

export function FinalCTA() {
  const t = useTranslations("finalCta");
  const isEn = useLocale() === "en";
  const sectionRef = useRef<HTMLElement>(null);
  const guarantees = t.raw("guarantees") as Guarantee[];

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const items = sectionRef.current!.querySelectorAll("[data-animate]");
      gsap.from(items, {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      data-cursor-dark
      className="py-28 md:py-40 px-6 md:px-12 lg:px-24 bg-surface-dark"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24 items-center">

        <div>
          <p
            data-animate
            className="text-sm uppercase tracking-[0.12em] text-text-inverse-muted font-mono mb-8"
          >
            {t("sectionLabel")}
          </p>

          <h2
            data-animate
            className="font-sans font-bold text-text-inverse leading-[1.02] mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            {t("headline")}
          </h2>

          <p
            data-animate
            className="text-text-inverse-muted text-lg leading-relaxed mb-12 max-w-lg"
          >
            {t("sub")}
          </p>

          <div data-animate>
            {isEn ? (
              <BookButton variant="primary" iconSize={20} className="px-8 py-5 text-base font-bold gap-3">
                {t("cta")}
              </BookButton>
            ) : (
              <a
                href={WA_DIAGNOSTIC}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-whatsapp text-white font-bold px-8 py-5 text-base hover:bg-whatsapp-dark transition-colors duration-200"
              >
                <WhatsAppIcon size={20} />
                {t("cta")}
              </a>
            )}
          </div>
        </div>

        <div data-animate className="flex flex-col gap-6 lg:border-l lg:border-border-dark lg:pl-16">
          {guarantees.map(({ label, desc }) => (
            <div key={label} className="flex gap-4 items-start">
              <span className="text-accent-on-dark mt-0.5 flex-shrink-0">✓</span>
              <div>
                <p className="text-sm font-semibold text-text-inverse">{label}</p>
                <p className="text-sm text-text-inverse-muted mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
