"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { useTranslations } from "next-intl";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function About() {
  const t = useTranslations("about");
  const sectionRef = useRef<HTMLElement>(null);
  const tags = t.raw("tags") as string[];

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const items = sectionRef.current!.querySelectorAll("[data-animate]");
      gsap.from(items, {
        opacity: 0,
        y: 28,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="sobre"
      className="py-24 md:py-32 px-6 md:px-12 lg:px-24 bg-bg-card"
    >
      <div className="max-w-6xl mx-auto">
        <p data-animate className="text-sm uppercase tracking-[0.12em] text-text-muted font-mono mb-16">
          {t("sectionLabel")}
        </p>

        <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
          <div data-animate className="relative bg-bg-secondary overflow-hidden">
            <Image
              src="/tiago4.webp"
              alt={t("photoAlt")}
              width={3213}
              height={5712}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-5">
              <div className="font-bold text-white text-lg">{t("photoName")}</div>
              <div className="text-sm text-white/70">{t("photoTitle")}</div>
            </div>
          </div>

          <div>
            <h2
              data-animate
              className="font-sans font-bold text-text-primary leading-[1.05] mb-8"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              {t("headline")}
            </h2>

            <div data-animate className="space-y-5 text-text-secondary text-lg leading-[1.7] max-w-xl mb-10">
              <p>{t("p1")}</p>
              <p>{t("p2")}</p>
              <p>{t("p3")}</p>
            </div>

            <div data-animate className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 bg-bg-secondary border border-border text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
