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

    // Hide everything immediately so there's no flash before the timeline starts
    gsap.set([q("[data-hero-label]"), q("[data-hero-cta]")], { opacity: 0, y: 10 });
    gsap.set(q("[data-hero-accent]"), { scaleX: 0, transformOrigin: "left" });
    const sub = q("[data-hero-sub]");
    if (sub) gsap.set(sub, { opacity: 0, y: 10 });

    const line1 = q("[data-hero-line1]");
    const line2 = q("[data-hero-line2]");
    let split1: InstanceType<typeof SplitText> | null = null;
    let split2: InstanceType<typeof SplitText> | null = null;

    if (line1) {
      split1 = new SplitText(line1, { type: "chars" });
      gsap.set(line1, { opacity: 1 });
      gsap.set(split1.chars, { opacity: 0, y: 28 });
    }
    if (line2) {
      split2 = new SplitText(line2, { type: "chars" });
      gsap.set(line2, { opacity: 1 });
      gsap.set(split2.chars, { opacity: 0, y: 28 });
    }

    const tl = gsap.timeline({ delay: 0.2 });

    tl.to(q("[data-hero-label]"), { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });

    if (split1) {
      tl.to(split1.chars, { opacity: 1, y: 0, stagger: 0.02, duration: 0.7, ease: "expo.out" }, "-=0.2");
    }
    if (split2) {
      tl.to(split2.chars, { opacity: 1, y: 0, stagger: 0.016, duration: 0.7, ease: "expo.out" }, "-=0.5");
    }

    tl.to(q("[data-hero-accent]"), { scaleX: 1, duration: 0.9, ease: "expo.out" }, "-=0.4");
    if (sub) tl.to(sub, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.5");
    tl.to(q("[data-hero-cta]"), { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.4");
    tl.fromTo(
      q("[data-hero-mockup]"),
      { opacity: 0, x: 24 },
      { opacity: 1, x: 0, duration: 0.9, ease: "power2.out" },
      "-=0.9"
    );
  });

  return <span ref={anchorRef} aria-hidden="true" className="hidden" />;
}
