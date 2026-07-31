import { Fragment } from "react";
import Image from "next/image";
import { Reveal } from "./_components/Reveal";
import { Faq } from "./_components/Faq";
import { Showcases } from "./_components/Showcases";

/* WhatsApp do Tiago + mensagem pré-preenchida. */
const WHATSAPP =
  "https://wa.me/5541991696767?text=" +
  encodeURIComponent("Oi Tiago! Vi a proposta da CWBrownerie e quero começar.");

function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-6 ${className}`}>{children}</div>
  );
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-medium uppercase tracking-[0.22em] text-gold">
      {children}
    </span>
  );
}

/* ─── 1. HERO ──────────────────────────────────────────────────── */
function Hero() {
  return (
    <header className="damask relative overflow-hidden">
      <Container className="grid items-center gap-12 py-16 md:grid-cols-[1.05fr_0.95fr] md:py-24">
        <div className="reveal is-visible">
          <Kicker>Proposta para a CWBrownerie</Kicker>
          <h1 className="font-display mt-5 text-4xl leading-[1.08] text-cocoa sm:text-5xl md:text-6xl">
            Transforme seu site de vitrine em máquina de vendas.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/80">
            Hoje seu site mostra a cesta e o cliente recomeça tudo no WhatsApp:
            print, endereço, data, pagamento. A gente move essa parte pro site.
            Ele chega na sua conversa com o pedido montado, pronto pra você
            confirmar.
          </p>
          <a
            href="#diagnostico"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-cocoa px-8 py-4 text-sm font-semibold uppercase tracking-wider text-cream transition-transform hover:-translate-y-0.5"
          >
            Ver a proposta
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-[var(--radius-card)] shadow-2xl shadow-cocoa/20">
            <Image
              src="/cwbrownerie/cesta.jpg"
              alt="Cesta artesanal da CWBrownerie"
              width={1213}
              height={979}
              priority
              className="h-full w-full object-cover"
            />
          </div>

          {/* Stats */}
          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              ["8", "anos em Curitiba"],
              ["24", "cestas no catálogo"],
              ["5,0", "no Google"],
            ].map(([n, l]) => (
              <div
                key={l}
                className="rounded-[var(--radius-card)] bg-cream-2 px-4 py-3 text-center"
              >
                <div className="font-display text-2xl text-brown">{n}</div>
                <div className="text-xs text-taupe">{l}</div>
              </div>
            ))}
          </div>

          {/* Depoimento real — Google */}
          <figure className="absolute -right-12 top-[30%] hidden max-w-[248px] rounded-[var(--radius-card)] bg-white/95 p-4 shadow-xl backdrop-blur lg:block">
            <div className="text-sm tracking-widest text-gold">★★★★★</div>
            <blockquote className="mt-1 text-[13px] leading-snug text-ink/80">
              &ldquo;Os produtos são selecionados e de extrema qualidade! O
              atendimento foi rápido e super atencioso, foram perfeitos do início
              ao fim!&rdquo;
            </blockquote>
            <figcaption className="mt-2 text-xs font-medium text-taupe">
              — Stefanie Heiderich, no Google
            </figcaption>
          </figure>
        </div>
      </Container>
    </header>
  );
}

/* ─── 2. DIAGNÓSTICO ───────────────────────────────────────────── */
function Diagnostico() {
  return (
    <section id="diagnostico" className="bg-cocoa-deep text-cream">
      <Container className="grid items-center gap-10 py-20 md:grid-cols-[auto_1fr] md:py-28">
        <Reveal className="shrink-0">
          <div className="font-display text-7xl leading-none text-gold sm:text-8xl md:text-[9rem]">
            4.336
          </div>
          <div className="mt-2 text-sm uppercase tracking-widest text-cream/60">
            visitas em uma semana
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="font-display text-3xl text-cream md:text-4xl">
            E cada interessado abre uma conversa que começa do zero.
          </h2>
          <div className="mt-6 max-w-xl">
            <p className="text-xs font-medium uppercase tracking-widest text-cream/50">
              As mesmas perguntas, toda vez
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["qual o valor?", "entrega no meu bairro?", "tem pra sexta?"].map(
                (q) => (
                  <span
                    key={q}
                    className="rounded-full border border-cream/20 bg-cream/5 px-4 py-1.5 text-sm text-cream/85"
                  >
                    {q}
                  </span>
                ),
              )}
            </div>

            <p className="mt-7 text-xs font-medium uppercase tracking-widest text-cream/50">
              E aí, tudo na mão
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {[
                "Você responde tudo de novo",
                "Junta endereço, data e pagamento",
                "Monta o pedido, um por um",
              ].map((t) => (
                <li key={t} className="flex gap-2.5 text-cream/85">
                  <span className="text-gold" aria-hidden="true">
                    ›
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 font-display text-lg text-gold-soft">
              Um cliente de cada vez. O dia inteiro.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ─── 3. FLUXO ─────────────────────────────────────────────────── */
const FLUXO = [
  "Escolhe ou monta a cesta com valores na tela",
  "Preenche endereço, data e horário",
  "Escolhe como pagar",
  "Cai no seu WhatsApp com tudo escrito",
];

function Fluxo() {
  return (
    <section className="damask">
      <Container className="py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <Kicker>O fluxo novo</Kicker>
          <h2 className="font-display mt-4 text-3xl text-cocoa md:text-4xl">
            O mesmo cliente, do outro jeito.
          </h2>
          <p className="mt-4 text-lg text-ink/75">
            Todo aquele trabalho manual vira o caminho do cliente. Ele resolve
            tudo sozinho e o pedido chega pronto na sua mão.
          </p>
        </Reveal>

        <Reveal className="mt-12 flex flex-col items-stretch gap-3 lg:flex-row lg:gap-0">
          {FLUXO.map((step, i) => {
            const last = i === FLUXO.length - 1;
            return (
              <Fragment key={i}>
                <div
                  className={`flex flex-1 flex-col rounded-[var(--radius-card)] p-5 ${
                    last
                      ? "bg-cocoa text-cream shadow-lg shadow-cocoa/25"
                      : "border border-cocoa/10 bg-white shadow-sm"
                  }`}
                >
                  <span
                    className={`grid h-9 w-9 place-items-center rounded-full font-display text-sm ${
                      last ? "bg-gold text-cocoa" : "bg-gold/15 text-brown"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <p
                    className={`mt-3 text-sm ${last ? "text-cream" : "text-ink/85"}`}
                  >
                    {step}
                  </p>
                </div>
                {!last && (
                  <div
                    className="flex items-center justify-center px-1 lg:px-2"
                    aria-hidden="true"
                  >
                    <span className="rotate-90 text-2xl text-gold lg:rotate-0">
                      →
                    </span>
                  </div>
                )}
              </Fragment>
            );
          })}
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-10 font-display text-2xl text-cocoa md:text-3xl">
            O site faz a triagem.{" "}
            <span className="text-gold">Você só fecha a venda.</span>
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ─── 4. O QUE A GENTE CONSTRÓI ──────────────────────────────── */
const svgProps = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
const ICONS: Record<string, React.ReactNode> = {
  filtro: (
    <svg {...svgProps}>
      <path d="M3 5h18M6 10h12M10 15h4M11 19h2" />
    </svg>
  ),
  preco: (
    <svg {...svgProps}>
      <path d="M20.5 12.5l-8 8-9-9V3.5h8z" />
      <circle cx="7.6" cy="7.6" r="1.1" />
    </svg>
  ),
  campanha: (
    <svg {...svgProps}>
      <rect x="3" y="4.5" width="18" height="16.5" rx="2" />
      <path d="M3 9.5h18M8 2.5v4M16 2.5v4" />
    </svg>
  ),
  painel: (
    <svg {...svgProps}>
      <path d="M4 8h16M4 16h16" />
      <circle cx="9" cy="8" r="2.2" />
      <circle cx="15" cy="16" r="2.2" />
    </svg>
  ),
  analytics: (
    <svg {...svgProps}>
      <path d="M3 21h18M6 21v-7M12 21V6M18 21v-10" />
    </svg>
  ),
  codigo: (
    <svg {...svgProps}>
      <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
    </svg>
  ),
};

const SUPPORT = [
  { icon: "filtro", title: "Catálogo com filtros", body: "Café, bebidas, box empresarial, fitness. O cliente acha a cesta em dois cliques." },
  { icon: "preco", title: "Preço calculado sozinho", body: "Cada bebida com o valor no Pix, crédito e parcelado, sem você fazer conta." },
  { icon: "campanha", title: "Campanhas que você agenda", body: "Dia das Mães, Natal, Namorados. Aparecem e somem sozinhas na data certa." },
  { icon: "painel", title: "Tudo no seu painel", body: "Preço, texto, foto e banner no seu controle, sem depender de dev." },
  { icon: "analytics", title: "Você vê onde perde venda", body: "Quantos chegaram no carrinho e quantos foram pro WhatsApp." },
  { icon: "codigo", title: "O código é seu", body: "Repositório no seu nome, pra sempre. Sem aluguel de plataforma." },
];

function Construimos() {
  return (
    <section className="bg-cream-3">
      <Container className="py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <Kicker>O que a gente constrói</Kicker>
          <h2 className="font-display mt-4 text-3xl text-cocoa md:text-4xl">
            Tudo que entra no seu site novo
          </h2>
          <p className="mt-4 text-lg text-ink/75">
            Não é só um site bonito. É um sistema que qualifica o cliente e
            entrega o pedido pronto na sua mão.
          </p>
        </Reveal>

        {/* 2 recursos-chave: estado compartilhado (box → valor no WhatsApp) */}
        <Showcases />

        {/* recursos de apoio */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SUPPORT.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 70}>
              <div className="flex h-full gap-4 rounded-[var(--radius-card)] border border-cocoa/10 bg-cream p-6">
                <span className="mt-0.5 shrink-0 text-brown" aria-hidden="true">
                  {ICONS[f.icon]}
                </span>
                <div>
                  <h4 className="font-display text-lg leading-tight text-cocoa">
                    {f.title}
                  </h4>
                  <p className="mt-1 text-sm text-ink/70">{f.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── 5. PROCESSO (timeline zigue-zague) ───────────────────────── */
const PROCESSO = [
  ["Briefing", "Proposta aceita: a gente senta e detalha a jornada e as regras do seu negócio (horários de entrega, precificação, exceções)."],
  ["Aprovação do plano", "Desenho o fluxo do cliente e te mostro. Você aprova antes de eu escrever a primeira linha de código."],
  ["Desenvolvimento", "Construção com entregas parciais, pra você ver de pé antes do fim."],
  ["Apresentação e ajustes", "Mostro funcionando, você testa com calma, a gente refina."],
  ["Lançamento", "No ar, com o domínio apontado e os links dos anúncios redirecionados."],
  ["Acompanhamento", "Melhoria contínua e as campanhas do ano montadas por mim (no plano anual)."],
];

function Processo() {
  return (
    <section className="damask">
      <Container className="py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <Kicker>Como a gente trabalha</Kicker>
          <h2 className="font-display mt-4 text-3xl text-cocoa md:text-4xl">
            Do briefing ao acompanhamento, um passo de cada vez
          </h2>
          <p className="mt-4 text-ink/75">
            Depois do seu sim, nada de caixa-preta. Cada etapa tem entrega e
            aprovação sua antes da próxima.
          </p>
        </Reveal>

        <ol className="mt-14 flex flex-col">
          {PROCESSO.map(([title, body], i) => (
            <Reveal as="li" key={title} delay={(i % 3) * 80} className="flex gap-5">
              <div className="flex flex-col items-center">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold font-display text-sm text-cocoa">
                  {i + 1}
                </span>
                {i < PROCESSO.length - 1 && (
                  <span className="w-[2px] flex-1 bg-gold/40" aria-hidden="true" />
                )}
              </div>
              <div className={i < PROCESSO.length - 1 ? "pb-14" : ""}>
                <h3 className="font-display text-xl text-cocoa">{title}</h3>
                <p className="mt-1.5 max-w-xl text-ink/75">{body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* ─── 6. POR QUE NÃO SHOPIFY ───────────────────────────────────── */
function Shopify() {
  return (
    <section className="bg-cream-3">
      <Container className="grid items-center gap-12 py-20 md:py-28 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <Kicker>Por que não Shopify</Kicker>
          <h2 className="font-display mt-4 text-3xl text-cocoa md:text-4xl">
            Shopify prende você. E a CWBrownerie não precisa disso.
          </h2>
          <p className="mt-4 max-w-xl text-ink/75">
            Shopify é uma boa loja pronta pra quem quer uma caixa genérica e
            despacho pelos Correios. Dois motivos pra ele não ser o caminho aqui:
          </p>

          <div className="mt-8 flex flex-col gap-5">
            <div className="border-l-2 border-gold pl-5">
              <h3 className="font-display text-xl text-cocoa">Ele te prende</h3>
              <p className="mt-1 text-sm text-ink/75">
                Você aluga a plataforma pra sempre e não é dono de nada. Parou de
                pagar, a loja sai do ar. Quis mudar de ideia depois, recomeça do
                zero.
              </p>
            </div>
            <div className="border-l-2 border-gold pl-5">
              <h3 className="font-display text-xl text-cocoa">
                Você quer o oposto de genérico
              </h3>
              <p className="mt-1 text-sm text-ink/75">
                A CWBrownerie precisa de um site rápido e sob medida, com o seu
                fluxo: cesta montada, entrega local, fecha no WhatsApp. Empilhar
                plugin sobre uma caixa que não foi feita pra isso deixa tudo mais
                lento e mais engessado.
              </p>
            </div>
          </div>

          <p className="mt-8 max-w-xl text-sm text-ink/70">
            Um site próprio é seu e roda do seu jeito. O acompanhamento anual é
            serviço pra ele vender mais, não aluguel de plataforma: você continua
            dono de tudo.
          </p>
        </Reveal>

        <Reveal delay={120} className="flex flex-col gap-6">
          <div className="rounded-[var(--radius-card)] bg-cocoa-deep p-8 text-cream">
            <div className="font-display text-2xl text-gold">Parou de pagar?</div>
            <p className="mt-2 text-sm text-cream/75">
              No Shopify, a loja sai do ar e você perde a vitrine. No seu site,
              nada muda: ele é seu, no ar, com ou sem mensalidade de serviço.
            </p>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left">
                <th className="pb-2" />
                <th className="pb-2 pr-3 font-medium text-taupe">Plataforma pronta</th>
                <th className="pb-2 font-medium text-cocoa">Seu site</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Você é dono de", "Nada, aluga", "Código e site"],
                ["Parou de pagar", "Loja fora do ar", "Continua no ar"],
                ["Seu fluxo local", "Plugin sobre plugin", "Nativo"],
                ["Performance", "Caixa genérica", "Enxuto e rápido"],
              ].map(([label, a, b]) => (
                <tr key={label} className="border-t border-cocoa/10">
                  <td className="py-2.5 pr-3 text-taupe">{label}</td>
                  <td className="py-2.5 pr-3 text-ink/55 line-through decoration-camel/60">
                    {a}
                  </td>
                  <td className="py-2.5 font-medium text-cocoa">{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Container>
    </section>
  );
}

/* ─── 7. ESCOPO — TUDO INCLUÍDO ────────────────────────────────── */
const ESCOPO: { t: string; items: string[] }[] = [
  {
    t: "Catálogo & produtos",
    items: [
      "Catálogo em página única com filtros laterais",
      "Página de cesta com variantes e preço automático (Pix → crédito e parcelado)",
      "Monte Sua Box: configurador com preço ao vivo",
      "Painel pra criar e editar produtos, categorias e temáticas (nome, descrição, foto, preço)",
    ],
  },
  {
    t: "Jornada até o WhatsApp",
    items: [
      "Carrinho que persiste ao recarregar",
      "Endereço (CEP), data e período de entrega",
      "Forma de pagamento (Pix, crédito, dinheiro)",
      "Aviso de que o pedido fecha no WhatsApp",
      "Mensagem pré-preenchida com tudo",
      "Versões mobile e desktop",
    ],
  },
  {
    t: "Home & páginas de campanha",
    items: [
      "Hero e banners editáveis (imagem + texto) em qualquer página, incl. home",
      "Páginas de campanha com URL própria (Dia das Mães, Natal…)",
      "Seleção dos produtos que entram em cada campanha",
      "Blocos de horário de entrega e formas de pagamento",
      "Aparece e some sozinha na data certa",
      "Edição dos textos do site pelo painel",
    ],
  },
  {
    t: "Medição & operação",
    items: [
      "Google Analytics + funil de conversão",
      "Monitoramento de uptime nos picos (Dia das Mães, Natal)",
      "Otimização de performance e imagens",
      "Hospedagem configurada no seu nome (custo por sua conta)",
    ],
  },
  {
    t: "Migração & propriedade",
    items: [
      "Rebuild mantendo a identidade visual atual",
      "Redirects das URLs atuais (protege seus anúncios)",
      "Código e repositório no seu nome, pra sempre",
    ],
  },
];

function Escopo() {
  return (
    <section className="bg-cocoa text-cream">
      <Container className="py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <Kicker>Escopo</Kicker>
          <h2 className="font-display mt-4 text-3xl text-cream md:text-4xl">
            Tudo que está incluído
          </h2>
          <p className="mt-4 text-cream/70">
            O projeto inteiro, item por item. Sem letra miúda.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {ESCOPO.map((g, i) => (
            <Reveal key={g.t} delay={(i % 3) * 70}>
              <h3 className="font-display text-lg text-gold">{g.t}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {g.items.map((it) => (
                  <li key={it} className="flex gap-2.5 text-sm text-cream/85">
                    <span className="mt-px shrink-0 font-semibold text-gold" aria-hidden="true">
                      ✓
                    </span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-12 rounded-[var(--radius-card)] border border-cream/15 p-6">
            <div className="text-xs font-medium uppercase tracking-widest text-gold-soft">
              Fora agora · roadmap
            </div>
            <p className="mt-2 text-sm text-cream/70">
              A base já fica pronta pra somar quando o negócio pedir: checkout com
              pagamento no site · blog e SEO de conteúdo pra ranquear no Google e
              nas IAs.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ─── 8. INVESTIMENTO ──────────────────────────────────────────── */
function Investimento() {
  return (
    <section className="damask">
      <Container className="py-20 md:py-28">
        <Reveal className="max-w-2xl">
          <Kicker>Investimento</Kicker>
          <h2 className="font-display mt-4 text-3xl text-cocoa md:text-4xl">
            Dois jeitos de fechar
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Reveal>
            <article className="flex h-full flex-col rounded-[var(--radius-card)] border border-cocoa/15 bg-cream p-8">
              <h3 className="font-display text-2xl text-cocoa">Projeto único</h3>
              <div className="mt-2 font-display text-3xl text-brown">R$ 5.500</div>
              <p className="mt-4 text-ink/75">
                Site pronto, código no seu nome, autonomia total. Manutenção e
                evoluções entram quando você pedir.
              </p>
            </article>
          </Reveal>
          <Reveal delay={100}>
            <article className="flex h-full flex-col rounded-[var(--radius-card)] border-2 border-gold bg-cocoa p-8 text-cream">
              <div className="mb-1 text-xs uppercase tracking-widest text-gold-soft">
                Recomendado
              </div>
              <h3 className="font-display text-2xl text-cream">
                Acompanhamento anual
              </h3>
              <div className="mt-2 flex flex-wrap items-baseline gap-x-3">
                <span className="font-display text-3xl text-gold">R$ 3.900</span>
                <span className="text-sm text-cream/70">de entrada</span>
                <span className="font-display text-2xl text-gold">
                  + R$ 397
                </span>
                <span className="text-sm text-cream/70">/mês</span>
              </div>
              <p className="mt-4 text-cream/80">
                Tudo do projeto único, e eu cuidando do site o ano inteiro:
              </p>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-cream/85">
                {[
                  "Campanhas de cada data montadas pra você (Mães, Pais, Namorados, Natal)",
                  "Até 4h/mês de ajustes e alterações no site",
                  "Monitoramento nos picos de venda",
                  "Gestão da hospedagem",
                  "Revisão de conversão mês a mês",
                  "Canal direto comigo",
                ].map((it) => (
                  <li key={it} className="flex gap-2.5">
                    <span
                      className="mt-px shrink-0 font-semibold text-gold"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-cream/55">
                Alterações além das 4h/mês entram a R$ 150/h, sempre com seu ok
                antes.
              </p>
            </article>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <p className="mx-auto mt-10 max-w-3xl rounded-[var(--radius-card)] bg-cream-2 p-6 text-center text-ink/80">
            Você já paga anúncio pra trazer gente. O acompanhamento anual faz esse
            dinheiro render mais: mais gente que clica vira pedido. Ele se paga com
            o tráfego que você já compra.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <p className="mx-auto mt-4 max-w-3xl text-center text-xs text-ink/55">
            Custos por sua conta (baixos, é site estático): domínio e hospedagem.
            O painel de conteúdo é gratuito.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ─── 8. QUEM FAZ ──────────────────────────────────────────────── */
function Quem() {
  return (
    <section className="bg-cocoa text-cream">
      <Container className="grid items-center gap-10 py-16 md:grid-cols-[auto_1fr] md:py-20">
        <Reveal>
          <div className="grid h-28 w-28 place-items-center rounded-full border-2 border-gold/50 font-display text-4xl text-gold">
            N
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="font-display text-3xl text-cream md:text-4xl">
            Você fala direto comigo
          </h2>
          <p className="mt-4 max-w-2xl text-cream/80">
            A Nasus constrói presença digital sob medida pra negócio brasileiro.
            Sem template, sem repassar pra terceiro: eu toco o projeto do começo ao
            fim e você trata comigo em cada etapa.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ─── 9. FAQ ───────────────────────────────────────────────────── */
function FaqSection() {
  return (
    <section className="damask">
      <Container className="py-20 md:py-28">
        <Reveal className="mx-auto mb-10 max-w-2xl text-center">
          <Kicker>Perguntas</Kicker>
          <h2 className="font-display mt-4 text-3xl text-cocoa md:text-4xl">
            O que você deve estar se perguntando
          </h2>
        </Reveal>
        <div className="mx-auto max-w-2xl">
          <Faq />
        </div>
      </Container>
    </section>
  );
}

/* ─── 10. CTA FINAL ────────────────────────────────────────────── */
function CtaFinal() {
  return (
    <section className="cta-glow text-cream">
      <Container className="py-20 text-center md:py-28">
        <Reveal>
          <h2 className="font-display mx-auto max-w-3xl text-3xl text-cream sm:text-4xl md:text-5xl">
            Bora transformar seu site em uma máquina de vendas?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-cream/75">
            Se fez sentido, me responde e a gente marca o start. O Natal é a maior
            data de presente do ano, e dá tempo de você entrar nele com o site novo
            já fechando pedido.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-wa px-9 py-4 text-sm font-semibold uppercase tracking-wider text-white shadow-lg shadow-wa/25 transition-transform hover:-translate-y-0.5 hover:bg-wa-dark"
          >
            Quero começar
          </a>
        </Reveal>
      </Container>
      <footer className="border-t border-cream/15 py-6 text-center text-xs text-cream/50">
        Proposta preparada pela Nasus · nasus.digital
      </footer>
    </section>
  );
}

export default function Page() {
  return (
    <main>
      <Hero />
      <Diagnostico />
      <Fluxo />
      <Construimos />
      <Processo />
      <Shopify />
      <Escopo />
      <Investimento />
      <Quem />
      <FaqSection />
      <CtaFinal />
    </main>
  );
}
