"use client";

import { useState } from "react";

const ITEMS = [
  {
    q: "Vou perder meu Google?",
    a: "Não. A gente mapeia cada link dos seus anúncios e redireciona pro lugar novo. Ranking e campanhas seguem de pé.",
  },
  {
    q: "Quanto tempo?",
    a: "Cerca de 2 a 4 semanas, puxado mais pela troca de material e pelos ajustes do que pela construção. Sem pressa: lança quando estiver certo.",
  },
  {
    q: "E meu domínio?",
    a: "Continua seu. A gente aponta ele pro site novo, você segue como dono.",
  },
  {
    q: "Consigo mexer sozinho?",
    a: "Sim. Preço, texto, foto, banner e campanha ficam num painel simples. Travou, me chama.",
  },
  {
    q: "E se eu quiser vender com pagamento no site depois?",
    a: "Dá pra somar. A base já fica pronta pra receber Pix e cartão quando o negócio pedir.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number[]>([0]);
  const toggle = (i: number) =>
    setOpen((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i],
    );

  return (
    <div className="flex flex-col gap-3">
      {ITEMS.map((item, i) => {
        const isOpen = open.includes(i);
        return (
          <div
            key={i}
            className="border border-cocoa/15 bg-cream-2 rounded-[var(--radius-card)] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 cursor-pointer"
            >
              <span className="font-display text-lg md:text-xl text-cocoa">
                {item.q}
              </span>
              <span
                className={`text-gold text-2xl leading-none transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-ink/80 max-w-2xl">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
