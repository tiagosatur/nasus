"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap";

export function HeroAnimations() {
  const anchorRef = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(SplitText);

    const root = anchorRef.current?.closest("[data-hero-root]");
    if (!root) return;

    const q = (sel: string) => root.querySelector(sel);
    const tl = gsap.timeline({ delay: 0.2 });

    tl.from(q("[data-hero-label]"), {
      opacity: 0,
      y: 10,
      duration: 0.5,
      ease: "power2.out",
    });

    const line1 = q("[data-hero-line1]");
    if (line1) {
      const split1 = new SplitText(line1, { type: "chars" });
      tl.from(
        split1.chars,
        { opacity: 0, y: 28, stagger: 0.02, duration: 0.7, ease: "expo.out" },
        "-=0.2"
      );
    }

    const line2 = q("[data-hero-line2]");
    if (line2) {
      const split2 = new SplitText(line2, { type: "chars" });
      tl.from(
        split2.chars,
        { opacity: 0, y: 28, stagger: 0.016, duration: 0.7, ease: "expo.out" },
        "-=0.5"
      );
    }

    tl.from(
      q("[data-hero-accent]"),
      { scaleX: 0, transformOrigin: "left", duration: 0.9, ease: "expo.out" },
      "-=0.4"
    );

    tl.from(
      q("[data-hero-cta]"),
      { opacity: 0, y: 12, duration: 0.5, ease: "power2.out" },
      "-=0.4"
    );

    tl.fromTo(
      q("[data-hero-mockup]"),
      { opacity: 0, x: 24 },
      { opacity: 1, x: 0, duration: 0.9, ease: "power2.out" },
      "-=0.9"
    );
  });

  return <span ref={anchorRef} aria-hidden="true" className="hidden" />;
}
