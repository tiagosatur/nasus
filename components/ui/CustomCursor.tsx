"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (min-width: 768px)").matches) return;

    const cursor = cursorRef.current!;
    const dot = dotRef.current!;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.set(dot, { x: mouseX - 3, y: mouseY - 3, opacity: 1 });
      gsap.set(cursor, { opacity: 1 });
    };

    gsap.ticker.add(() => {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      gsap.set(cursor, { x: curX - 20, y: curY - 20 });
    });

    const onEnter = () =>
      gsap.to(cursor, { scale: 1.8, duration: 0.3 });
    const onLeave = () =>
      gsap.to(cursor, { scale: 1, duration: 0.3 });

    const darkSections = document.querySelectorAll("[data-cursor-dark]");
    const darkObserver = new IntersectionObserver(
      (entries) => {
        const anyDark = entries.some((e) => e.isIntersecting);
        if (anyDark) {
          cursor.style.borderColor = "rgba(255,255,255,0.7)";
          cursor.style.mixBlendMode = "difference";
          dot.style.backgroundColor = "#FFFFFF";
          dot.style.mixBlendMode = "difference";
        } else {
          cursor.style.borderColor = "rgba(28,21,18,0.2)";
          cursor.style.mixBlendMode = "normal";
          dot.style.backgroundColor = "";
          dot.style.mixBlendMode = "normal";
        }
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    darkSections.forEach((s) => darkObserver.observe(s));

    window.addEventListener("mousemove", onMouseMove);

    const interactables = document.querySelectorAll("a, button, [data-cursor-hover]");
    interactables.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      darkObserver.disconnect();
      gsap.ticker.remove(() => {});
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="hidden md:block fixed top-0 left-0 w-10 h-10 rounded-full border pointer-events-none z-[99999] opacity-0 transition-[border-color] duration-300"
        style={{ borderColor: "rgba(28,21,18,0.2)" }}
        aria-hidden="true"
      />
      <div
        ref={dotRef}
        className="hidden md:block fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent pointer-events-none z-[99999] opacity-0"
        aria-hidden="true"
      />
    </>
  );
}
