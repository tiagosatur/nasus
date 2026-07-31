"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

const ITEMS = [
  { name: "Espumante Chandon 187ml", price: 89 },
  { name: "Queijos & charcutaria", price: 45 },
  { name: "Brownie artesanal", price: 28 },
  { name: "Macarons Le Tarti", price: 32 },
  { name: "Mix de castanhas", price: 24 },
  { name: "Café Baggio", price: 19 },
];

const PERIODS = [
  "08:00 às 10:00",
  "10:00 às 12:00 ",
  "13:00 às 15:00",
  "15:00 às 18:00",
];

const PAYMENTS = [
  { label: "Pix", mult: 1 },
  { label: "Dinheiro", mult: 1 },
  { label: "Crédito à vista", mult: 1.05 },
  { label: "Parcelado 3x", mult: 1.125 },
];

const STEPS = ["Monte a box", "Entrega", "Pagamento"];

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

type Status = "idle" | "sending" | "sent";

/** Demo interativo: jornada real do cliente à esquerda (montar → entrega →
 *  pagamento) e o WhatsApp à direita, que só recebe a mensagem depois do
 *  "Enviar" (com o "digitando…"). */
export function Showcases() {
  const [step, setStep] = useState(0);
  const [sel, setSel] = useState<number[]>([0, 1, 2]);
  const [de, setDe] = useState("Tiago");
  const [para, setPara] = useState("Letícia");
  const [endereco, setEndereco] = useState(
    "Av. do Batel, 1868 - Batel, Curitiba - PR, 80420-090",
  );
  const [data, setData] = useState("12/06/2026");
  const [periodo, setPeriodo] = useState(0);
  const [pgto, setPgto] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const toggle = (i: number) =>
    setSel((p) => (p.includes(i) ? p.filter((x) => x !== i) : [...p, i]));

  const base = sel.reduce((s, i) => s + ITEMS[i].price, 0);
  const pay = PAYMENTS[pgto];
  const total = pay.mult === 1 ? base : Math.ceil(base * pay.mult);
  const count = sel.length;

  const send = () => {
    setStatus("sending");
    timer.current = setTimeout(() => setStatus("sent"), 1600);
  };
  const reset = () => {
    if (timer.current) clearTimeout(timer.current);
    setStatus("idle");
    setStep(0);
  };

  const inputCls =
    "w-full rounded-lg border border-cocoa/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-gold";
  const labelCls =
    "text-[11px] font-medium uppercase tracking-widest text-taupe";

  return (
    <div className="mt-12">
      {/* Stepper discreto acima dos dois cards */}
      <div className="mx-auto mb-7 flex max-w-lg items-center justify-center gap-2 sm:gap-3">
        {STEPS.map((s, i) => {
          const done = i < step || status === "sent";
          const active = i === step && status !== "sent";
          return (
            <Fragment key={s}>
              <div className="flex items-center gap-2">
                <span
                  className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-medium transition-colors ${
                    done || active
                      ? "bg-gold text-cocoa"
                      : "border border-cocoa/25 text-taupe"
                  }`}
                >
                  {done ? "✓" : i + 1}
                </span>
                <span
                  className={`text-xs ${active ? "font-medium text-cocoa" : "text-taupe"}`}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <span className="h-px w-4 bg-cocoa/15 sm:w-8" aria-hidden="true" />
              )}
            </Fragment>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Card 1 — jornada interativa */}
        <Reveal>
          <article className="flex h-full flex-col rounded-[var(--radius-card)] bg-cocoa p-8 text-cream">
            <h3 className="font-display text-2xl text-gold">
              Monte Sua Box de verdade
            </h3>
            <p className="mt-2 text-cream/80">
              A pessoa monta a cesta, preenche tudo e vê o total na hora. Decide com
              o preço na frente, sem te perguntar nada.
            </p>

            <div className="mt-7 flex min-h-[420px] flex-1 flex-col rounded-xl bg-cream p-5 text-ink shadow-inner">
              {status === "sent" ? (
                <div className="flex flex-1 flex-col items-center justify-center py-8 text-center">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-wa/15 text-2xl text-wa">
                    ✓
                  </span>
                  <p className="mt-3 font-display text-lg text-cocoa">
                    Pedido enviado pro WhatsApp
                  </p>
                  <p className="mt-1 max-w-xs text-sm text-taupe">
                    O cliente saiu do site já com tudo escrito. Você só confirma.
                  </p>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-5 rounded-full border border-cocoa/20 px-5 py-2 text-sm text-cocoa transition-colors hover:bg-cocoa/5"
                  >
                    ↺ Refazer demonstração
                  </button>
                </div>
              ) : (
                <>
                  {/* Passo 1 — Monte a box */}
                  {step === 0 && (
                    <div className="flex flex-1 flex-col">
                      <div className="mb-3 flex items-center justify-between">
                        <span className={labelCls}>Monte e veja o preço</span>
                        <span className="text-[11px] font-medium text-gold">
                          clique nos itens ↓
                        </span>
                      </div>
                      <ul className="flex flex-col gap-1.5">
                        {ITEMS.map((it, i) => {
                          const on = sel.includes(i);
                          return (
                            <li key={it.name}>
                              <button
                                type="button"
                                onClick={() => toggle(i)}
                                aria-pressed={on}
                                className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                                  on
                                    ? "border-gold/60 bg-gold/10"
                                    : "border-cocoa/10 bg-white/40 hover:border-cocoa/25"
                                }`}
                              >
                                <span
                                  className={`grid h-4 w-4 shrink-0 place-items-center rounded-[4px] border text-[10px] ${
                                    on
                                      ? "border-gold bg-gold text-cocoa"
                                      : "border-cocoa/30 text-transparent"
                                  }`}
                                >
                                  ✓
                                </span>
                                <span className="flex-1">{it.name}</span>
                                <span
                                  className={on ? "font-medium text-brown" : "text-taupe"}
                                >
                                  +R$ {brl(it.price)}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {/* Passo 2 — Entrega */}
                  {step === 1 && (
                    <div className="flex flex-1 flex-col gap-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={labelCls}>Quem envia</label>
                          <input
                            className={`mt-1 ${inputCls}`}
                            value={de}
                            onChange={(e) => setDe(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className={labelCls}>Quem recebe</label>
                          <input
                            className={`mt-1 ${inputCls}`}
                            value={para}
                            onChange={(e) => setPara(e.target.value)}
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls}>Endereço de entrega</label>
                        <input
                          className={`mt-1 ${inputCls}`}
                          value={endereco}
                          onChange={(e) => setEndereco(e.target.value)}
                        />
                      </div>
                    </div>
                  )}

                  {/* Passo 3 — Data, período e pagamento */}
                  {step === 2 && (
                    <div className="flex flex-1 flex-col gap-4">
                      <div>
                        <label className={labelCls}>Data da entrega</label>
                        <input
                          className={`mt-1 ${inputCls}`}
                          value={data}
                          onChange={(e) => setData(e.target.value)}
                        />
                      </div>
                      <div>
                        <span className={labelCls}>Período</span>
                        <div className="mt-1 grid grid-cols-2 gap-2">
                          {PERIODS.map((p, i) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => setPeriodo(i)}
                              className={`rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                                periodo === i
                                  ? "border-gold bg-gold/10 text-cocoa"
                                  : "border-cocoa/15 bg-white/40 text-ink hover:border-cocoa/25"
                              }`}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className={labelCls}>Forma de pagamento</span>
                        <div className="mt-1 flex flex-wrap gap-2">
                          {PAYMENTS.map((p, i) => (
                            <button
                              key={p.label}
                              type="button"
                              onClick={() => setPgto(i)}
                              className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                                pgto === i
                                  ? "border-gold bg-gold/10 text-cocoa"
                                  : "border-cocoa/15 bg-white/40 text-ink hover:border-cocoa/25"
                              }`}
                            >
                              {p.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Total + navegação */}
                  <div className="mt-4 flex items-center justify-between border-t border-cocoa/10 pt-3">
                    <div>
                      <span className="text-[11px] text-taupe">
                        Total {pay.label !== "Pix" ? `(${pay.label})` : "no Pix"}
                      </span>
                      <div
                        key={total}
                        className="total-pulse font-display text-2xl text-brown"
                      >
                        R$ {brl(total)}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {step > 0 && (
                        <button
                          type="button"
                          onClick={() => setStep((s) => s - 1)}
                          className="rounded-full border border-cocoa/20 px-4 py-2 text-sm text-cocoa transition-colors hover:bg-cocoa/5"
                        >
                          ← Voltar
                        </button>
                      )}
                      {step < 2 ? (
                        <button
                          type="button"
                          disabled={count === 0}
                          onClick={() => setStep((s) => s + 1)}
                          className="rounded-full bg-cocoa px-5 py-2 text-sm font-medium text-cream transition-colors hover:bg-cocoa-deep disabled:opacity-40"
                        >
                          Próximo →
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={status === "sending"}
                          onClick={send}
                          className="inline-flex items-center gap-2 rounded-full bg-wa px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-wa-dark disabled:opacity-60"
                        >
                          {status === "sending" ? "Enviando…" : "Enviar pedido"}
                        </button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </article>
        </Reveal>

        {/* Card 2 — WhatsApp: vazio → digitando → mensagem */}
        <Reveal delay={100}>
          <article className="flex h-full flex-col rounded-[var(--radius-card)] bg-cocoa p-8 text-cream">
            <h3 className="font-display text-2xl text-gold">
              O pedido cai pronto no seu WhatsApp
            </h3>
            <p className="mt-2 text-cream/80">
              Produtos, endereço, data e pagamento chegam escritos na primeira
              mensagem. Você só confirma.
            </p>

            <div className="mt-7 flex flex-1 flex-col overflow-hidden rounded-xl shadow-xl ring-1 ring-black/10">
              <div className="flex items-center gap-2.5 bg-[#008069] px-4 py-2.5">
                <span className="text-lg leading-none text-white/90">‹</span>
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/25 text-[11px] font-medium text-white">
                  C
                </span>
                <div className="leading-tight">
                  <div className="text-[13px] font-medium text-white">
                    Novo cliente
                  </div>
                  <div className="text-[10px] text-white/75">
                    {status === "sending" ? "digitando…" : "online"}
                  </div>
                </div>
              </div>

              <div className="flex min-h-[300px] flex-1 flex-col justify-end bg-[url('/cwbrownerie/wa-wallpaper.png')] bg-cover bg-center p-4">
                {status === "idle" && (
                  <div className="m-auto max-w-[80%] text-center text-[12px] text-[#111b21]/45">
                    A conversa começa vazia. A mensagem aparece aqui quando o
                    cliente toca em <span className="font-medium">Enviar pedido</span>.
                  </div>
                )}

                {status === "sending" && (
                  <div className="wa-pop max-w-[40%] rounded-lg rounded-tl-sm bg-white px-3 py-3 shadow-sm">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="wa-dot h-2 w-2 rounded-full bg-black/40"
                          style={{ animationDelay: `${i * 200}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {status === "sent" && (
                  <div className="wa-pop max-w-[94%] rounded-lg rounded-tl-sm bg-white px-3 py-2.5 text-[12.5px] leading-relaxed text-[#111b21] shadow-sm">
                    <div className="mb-1 font-semibold text-[#075e54]">
                      🧺 Novo pedido · CWBrownerie
                    </div>
                    📦 Monte Sua Box · {count} {count === 1 ? "item" : "itens"}
                    {[...sel]
                      .sort((a, b) => a - b)
                      .map((i) => (
                        <Fragment key={i}>
                          <br />
                          <span className="text-[#111b21]/70">
                            {" • "}
                            {ITEMS[i].name}
                          </span>
                        </Fragment>
                      ))}
                    <br />🎁 Para {para} · De {de}
                    <br />📍 {endereco}
                    <br />🗓 {data}, {PERIODS[periodo].toLowerCase()}
                    <br />💳 {pay.label}:{" "}
                    <span className="font-semibold">R$ {brl(total)}</span>
                    <div className="mt-1 text-right text-[10px] text-black/35">
                      20:59
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </div>
  );
}
