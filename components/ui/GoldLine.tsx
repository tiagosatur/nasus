"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface GoldLineProps {
  className?: string;
  animate?: boolean; // anima ao entrar no viewport
}

/**
 * Linha decorativa dourada horizontal.
 * Por padrão anima de width 0 → 100% ao entrar no viewport.
 */
export function GoldLine({ className = "", animate = true }: GoldLineProps) {
  const lineRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!animate || !lineRef.current) return;

    gsap.from(lineRef.current, {
      scaleX: 0,
      transformOrigin: "left",
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: lineRef.current,
        start: "top 90%",
      },
    });
  }, []);

  return (
    <span
      ref={lineRef}
      className={`gold-line ${className}`}
      aria-hidden="true"
    />
  );
}
