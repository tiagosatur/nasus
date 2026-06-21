import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

// Verde da marca (--color-whatsapp #25D366 = rgb(37,211,102)) usado no flash
// que "trava" o resultado #1. Fica como literal por ser valor de animação (JS),
// não estilo — mas mantido fiel ao token.
const WHATSAPP_RGB = "37, 211, 102";

/**
 * Sequência de entrada estilo SERP: a marca/headline surgem, a barra de busca
 * "digita" a query caractere por caractere e os links aparecem como resultados
 * rankeados — o #1 trava com um flash verde. Respeita prefers-reduced-motion.
 */
export function useSerpEntrance(root: RefObject<HTMLDivElement | null>, query: string) {
  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const q = (s: string) => el.querySelector<HTMLElement>(s);
      const typeEl = q("[data-type]");
      const caret = q("[data-caret]");
      const cards = gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-link]"));
      const socials = gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-social]"));

      // Sem motion: tudo já visível, só preenche a busca e esconde o cursor.
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (typeEl) typeEl.textContent = query;
        if (caret) caret.style.display = "none";
        return;
      }

      gsap.set([q("[data-lockup]"), q("[data-head]")], { opacity: 0, y: 14 });
      gsap.set(q("[data-line]"), { scaleX: 0, transformOrigin: "left" });
      gsap.set([q("[data-search]"), q("[data-results]")], { opacity: 0, y: 10 });
      gsap.set(cards, { opacity: 0, y: 16 });
      gsap.set([q("[data-socials]"), q("[data-foot]")], { opacity: 0, y: 10 });

      // Cursor piscando na barra de busca
      gsap.to(caret, { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" });

      const typed = { n: 0 };

      const tl = gsap.timeline();
      tl.to(q("[data-lockup]"), { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
      tl.to(q("[data-head]"), { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
      tl.to(q("[data-line]"), { scaleX: 1, duration: 0.7, ease: "expo.out" }, "-=0.3");
      tl.to(q("[data-search]"), { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.25");
      // Digita a marca, caractere por caractere
      tl.to(
        typed,
        {
          n: query.length,
          duration: query.length * 0.07,
          ease: "none",
          onUpdate: () => {
            if (typeEl) typeEl.textContent = query.slice(0, Math.round(typed.n));
          },
        },
        "+=0.2"
      );
      // "Busca" → os resultados surgem rankeados
      tl.to(q("[data-results]"), { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, "+=0.3");
      tl.to(cards, { opacity: 1, y: 0, stagger: 0.09, duration: 0.5, ease: "power3.out" }, "-=0.05");
      tl.set(cards, { clearProps: "transform" }); // libera o hover (CSS)
      // O #1 trava com um flash verde
      tl.fromTo(
        cards[0],
        { boxShadow: `0 0 0 0 rgba(${WHATSAPP_RGB}, 0)` },
        { boxShadow: `0 0 0 3px rgba(${WHATSAPP_RGB}, 0.35)`, duration: 0.28, yoyo: true, repeat: 1, ease: "power2.inOut" },
        "-=0.1"
      );
      tl.set(cards[0], { clearProps: "boxShadow" });
      tl.to(q("[data-socials]"), { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.1");
      tl.to(q("[data-foot]"), { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.2");

      // Beacon verde no resultado #1 (loop)
      gsap.fromTo(
        q("[data-beacon]"),
        { scale: 1, opacity: 0.6 },
        { scale: 2.6, opacity: 0, duration: 2, ease: "power1.out", repeat: -1, delay: tl.duration() }
      );

      // Sociais sobem e descem em onda defasada
      socials.forEach((s, i) => {
        gsap.to(s, { y: -5, duration: 2, ease: "sine.inOut", repeat: -1, yoyo: true, delay: tl.duration() + 0.3 + i * 0.5 });
      });
    },
    { scope: root }
  );
}
