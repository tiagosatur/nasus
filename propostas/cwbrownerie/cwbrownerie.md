# Proposta CWBrownerie — PRD & Plano

**Cliente:** Leonardo — CWBrownerie (cwbrownerie.com.br) · cestas/boxes de presente, Curitiba
**Autor:** Tiago Satur (Nasus)
**Origem:** Reunião de 28/07/2026 (Granola) + respostas do Leonardo (28–29/07)
**Rota da proposta:** `/propostas/cwbrownerie` (nasus.digital)
**Status:** escopo e arquitetura travados. Pendente pra fechar números: **ancoragem de valor** dos dois modelos (§7). Insumos operacionais são coletados no lançamento (§13).

---

## Como ler este documento

Duas partes num arquivo só:

- **Parte 1 — Escopo do Projeto:** as regras do que vamos vender (o site do CWBrownerie). É a fonte da verdade do escopo.
- **Parte 2 — PRD da Página de Proposta:** copy, estratégia de closer e UI da LP que vai fechar o negócio.

Mantemos um arquivo enquanto couber. Se a Parte 1 virar spec de engenharia detalhada (schemas campo a campo, contratos), ela sai pra `cwbrownerie-escopo.md` e este vira só a proposta.

---

# PARTE 1 — Escopo do Projeto

## 1. Contexto do cliente

- Cestas de café da manhã e presentes, ~8 anos, Curitiba. Expandindo pra linha de presentes não-alimentícios (canecas, drinks), mirando mercado maior — potencialmente nacional/internacional no futuro.
- Site atual no **Wix**; produtos geridos manualmente, sem estoque integrado.
- Usa **Bling** (ERP) pra financeiro/marketplace.
- **WhatsApp é o canal de venda**: todo pedido fecha lá, na mão.

**Tráfego (print do Wix Analytics, 2–9 mai):** 4.336 sessões / 3.587 únicos em 7 dias (~17–18k/mês), **+167%** no período. Origem: **Google Pago 1.880 (43%)**, Direto 813 (19%).
→ **Insight comercial:** ele já paga por tráfego, mas a camada comercial é manual — perde qualificação e conversão depois do clique. Esse é o gancho da venda **e** a justificativa do retainer.

## 2. Dor atual

- Jornada fragmentada: navega no site → manda print/mensagem no WhatsApp → ele coleta endereço, data, janela, produto e pagamento na mão.
- "Monte sua box" existe (`/monte-sua-box`), mas **sem preço e sem carrinho** — só lista de itens + WhatsApp.
- Páginas sazonais (Dia dos Pais/Mães) são **estáticas**, não editáveis sem dev.
- CRMs testados e abandonados — clientes preferem contato humano (mandam áudio).
- **Objetivo central:** mover a camada comercial pro site pra o cliente chegar no WhatsApp **pré-qualificado**, com tudo pronto.

## 3. Decisões de arquitetura (travadas)

| Decisão | Definição |
|---|---|
| **Fora do Wix** | Rebuild limpo em **Astro** (SSG, ~zero JS → SEO/performance fortes nas páginas de conteúdo). Partes interativas (carrinho, stepper, configurador) como **islands** React/Svelte. Wix não exporta código útil → serve só de **referência pixel-perfect** (cores, tipografia, espaçamento, imagens, copy). |
| **Sem backend (v1)** | Nada de servidor Node/Postgres. Frontend estático + Sanity (dados) + lógica client-side (carrinho, configurador, deep link WhatsApp). Preço do configurador é **indicativo** — o valor final o Leonardo confirma no WhatsApp, então não precisa validação server-side. Backend (serverless) só entra na v2: checkout/Stripe ou pedidos persistidos. |
| **CMS: Sanity (Free basta)** | Camada de conteúdo self-serve: produtos, campanhas sazonais, banners, páginas. Ele edita sem dev. Free cobre tudo: 20 seats, 10k docs, 100 GB banda, 1M req CDN/mês, e **gestão de imagens** (crop/hotspot/transform) inclusa. Nenhum recurso força upgrade. |
| **Tudo no Sanity (sem ERP)** | Produto gerido só no Sanity, um dono por campo. **Trade-off aceito:** preço do site é manual (pode divergir de marketplace). Integração com ERP está **fora do escopo** (decisão do Leonardo). |
| **Sem pagamento no site** | Fim do fluxo = **handoff pro WhatsApp** (1 número, deep link com texto pré-preenchido) contendo lead validado: produtos, endereço, forma de pagamento. Frete/valor final o Leonardo define no WhatsApp via link. |
| **Carrinho em localStorage** | Persiste ao recarregar a página. |
| **Idioma** | Português apenas. |
| **Ownership** | Cliente é dono do código e do repositório. |

**Stack de conteúdo × comercial:** Sanity é fonte de tudo — produtos, campanhas, banners, textos e fotos.

## 4. Modelo de preços do catálogo (técnico)

**Cestas prontas** — confirmado pelo Leonardo: **base fixa + o cliente escolhe 1 variante (bebida), só a bebida varia, sem exceções.** Cada variante tem seu próprio preço. É "pick 1 of N", não soma à-la-carte. Modelagem trivial no Sanity: `Cesta → [variantes]`, cada variante com label, lista de itens e preço no Pix.

**Crédito e parcelamento derivam do Pix por regra global** (conferido nas páginas reais):
- Crédito à vista ≈ **+5%** · 2x ≈ **+8,3%** · 3x ≈ **+12,5%** (arredondando pra cima)
- → Admin cadastra **só o Pix**; o site calcula o resto. Com **override manual** se alguma cesta fugir da regra.

**Monte Sua Box — preço ao vivo** (confirmado pelo Leonardo): o valor soma na tela enquanto a pessoa monta a caixa → **configurador com engine de cálculo + preço por item no Sanity**. É o **principal driver de custo do projeto**.
- **Fórmula (travada, genérica):** `total = baseFee + Σ(preçoItem × qtd)`, com `baseFee` default 0 (setar > 0 cobre "caixa base + itens"; = 0 cobre "soma pura" — a codificação é idêntica). Gates de `valorMínimo` e/ou `qtdMínima` configuráveis (há mínimo, confirmado). Crédito/parcelamento pela **mesma regra global** sobre o total. Preço unitário por item existe; a tabela é montada junto na fase de conteúdo.

**Opção vegetariana:** não vira item descrito — entra como **observação no pedido** (checkbox/campo no fluxo, repassado no WhatsApp). A refinar ("temos que pensar" — Leonardo).

**Catálogo atual:** 24 cestas em 7 categorias.

## 5. Escopo funcional

### v1 — incluído
- Rebuild do visual atual (idêntico por fora, mantível por dentro), com **otimização de performance e imagens**.
- **Catálogo único com filtros laterais** (café da manhã, bebidas, box empresarial, fitness, temáticas, brownie, todos).
- **Página de cesta** com variantes e preço (Pix + crédito/parcelamento derivados).
- **Gerenciar produtos** (nome, descrição, foto, preço) e **criar categorias/temáticas** novas, realocando produtos (ex.: Aniversário) — sem depender de dev.
- **Monte Sua Box — configurador com preço ao vivo** (fórmula em §4). Principal driver de custo.
- **Jornada de compra (stepper):** produtos → endereço/CEP → data/período → forma de pagamento → **redirect WhatsApp** com tudo pré-preenchido. Com **aviso de que o pedido fecha no WhatsApp** (não é checkout online).
- **Carrinho** em localStorage.
- **Versões mobile e desktop** (mobile-first — maioria acessa no celular).
- **Páginas sazonais gerenciáveis** (campanhas): URL própria, seleção de produtos, banner, **blocos editáveis de horário de entrega e formas de pagamento**, e **visibilidade agendada** (aparece/some sozinha na data). As infos de entrega/pagamento aparecem **também na jornada** (reforço — regra de negócio pra filtrar o cliente: ex. entrega só 6h30–10h30). *Mecanismo estático: rebuild agendado (cron) ou checagem de data no edge — sem backend.*
- **Hero editável** (imagem + texto) em **todas as páginas, incluindo a home**; **banners** editáveis na home e nas sazonais.
- **Edição de textos** do site pelo painel (Sanity Studio), sem dev.
- **Home mostra produto logo**; "Sobre nós" vira seção no rodapé / página secundária.
- **GA4 + funil de conversão** (cliques no carrinho, redirect pro WhatsApp).
- **Monitoramento de uptime** nos picos (Dia das Mães, Namorados, Natal).
- **Migração de conteúdo/assets** + **redirects das URLs atuais** (protege os anúncios do Google).
- **Código e repositório no nome do cliente.**

### v2 — fora agora (roadmap / add-ons)
- Checkout online (Stripe) se escalar nacional.
- Multi-idioma / internacional.
- Blog/SEO de conteúdo (receitas) pra ranquear "cestas de café da manhã em Curitiba" e discoverability em IA.

## 6. Matriz de complexidade / esforço

> Sizing de **complexidade relativa** (build assistido por Claude Code) — pra ver **onde está o peso**. Módulos de código comprimem; conteúdo e QA menos. Ranges = incerteza honesta.

| # | Módulo | Esforço | Dias | Driver |
|---|---|---|---|---|
| 1 | Setup & infra (repo Astro, deploy, projeto Sanity) | S | 0,5–1 | baixo |
| 2 | Design system / base (tokens do Wix, nav, footer, componentes, responsivo) | M | 2–3 | fidelidade visual |
| 3 | Institucionais (Home c/ hero editável, Sobre, Contato) | S–M | 1–2 | — |
| 4 | Catálogo único + filtros laterais (7 categorias) | S–M | 1–1,5 | — |
| 5 | Página de cesta (variantes + preço derivado) | S–M | 1–1,5 | — |
| 6 | Carrinho (localStorage) + stepper → handoff WhatsApp | M | 1,5–2,5 | fluxo comercial |
| 7 | **Monte Sua Box — configurador c/ preço ao vivo** | **M–L** | **2–4** | **maior driver** |
| 8 | CMS Sanity (schemas: cesta, campanha, banner, página, config + Studio) | M | 1,5–2,5 | self-serve |
| 9 | Páginas sazonais (template + visibilidade agendada + menu derivado) | S–M | 1–1,5 | — |
| 10 | Migração de conteúdo/assets (24 cestas + variantes + fotos) + redirects | M | 2–3 | preso a conteúdo do cliente |
| 11 | GA4 + funil (cliques carrinho, redirect WhatsApp) | S | 0,5 | baixo |
| 12 | QA, responsivo, cutover/DNS, launch | M | 1,5–2,5 | preso a validação |
| | **Total** | | **~16–27** | |

**Leitura pro preço:** módulos 6+7 (fluxo + configurador) concentram o valor percebido — âncora do one-time. Retainer se ancora no módulo 9 + otimização (o que se paga com os ads).

v1 realista: **~2–4 semanas de calendário** — gargalo é conteúdo/revisão do cliente, não código.

## 7. Modelo comercial (a oferta)

Dois caminhos, apresentados lado a lado:

- **A) Pagamento único** — build + entrega, cliente dono do código. Sem mensalidade. Evoluções futuras cobradas à parte.
- **B) Acompanhamento anual (retainer)** — build + manutenção contínua: gestão de hosting, monitoramento nas datas-pico, montagem/edição das campanhas sazonais, otimização de conversão e evolução do produto.

**Custos recorrentes por conta do cliente:** domínio e hospedagem (baixos — site estático) ficam no nome dele e ele paga. Sanity é gratuito. No retainer, a Nasus **gerencia** a hospedagem, mas a conta é do cliente. Deixar explícito na proposta (feito no LP: item no escopo + nota no Investimento).

**Ângulo de closer:** o retainer **se paga com a verba de ads que ele já queima** (43% do tráfego é Google Pago). LP e páginas sazonais otimizadas aumentam a conversão do tráfego que já existe — o custo do acompanhamento sai do desperdício atual, não do bolso.

**Precificação value-based, não por horas** — o cliente paga pelo resultado (sistema custom, dele, sem lock-in), não pelo tempo de build. A matriz (§6) é pra entender complexidade, não pra cotar por hora.

**Pra definir os números com clareza — 4 inputs:**
- *Do Leonardo:* (1) **gasto mensal em Google Ads** — âncora do orçamento dele e do teto do retainer; (2) **ticket médio + volume de pedidos/mês** — modela o ROI (quanto 1–2 pontos de conversão valem em R$).
- *Do mercado (pesquisar):* (3) **faixa BR** pra e-commerce custom + retainer de agência — âncora externa.
- *Seu:* (4) **piso** — o mínimo abaixo do qual não vale (custo de oportunidade).

Preço = valor (ROI + ads + comparável de mercado), com chão no seu piso. **Números:** a definir com os 4 inputs acima.

---

# PARTE 2 — PRD da Página de Proposta (`/propostas/cwbrownerie`)

## 8. Objetivo

Fechar o Leonardo. Não é um PDF nem um orçamento seco — é uma **LP de proposta personalizada** que prova, em 30 segundos de rolagem, que a gente entende o negócio dele. Um único objetivo de conversão: **ele responder "bora"**.

## 9. Estratégia de closer (frameworks aplicados)

- **Personalização extrema:** nome, marca, **paleta dele**, os **dados de tráfego dele**. Sensação de sob medida, não template.
- **Problema → Agitação → Solução:** dor (fluxo manual + tráfego pago desperdiçado) → agita com os números reais → resolve com o build.
- **Prova social:** reviews de clientes dele no hero (como na referência que ele curtiu).
- **Ancoragem de valor:** retainer se paga com ads; comparar com Shopify ($/mês + lock-in + plugins pagos).
- **Redução de risco:** dono do código, sem lock-in, sem mensalidade de plataforma, visual idêntico ao atual.
- **Urgência real:** datas sazonais como deadline natural — se quer a loja pronta pro Natal / Dia das Mães, o relógio já está correndo.
- **Especificidade:** dados e escopo concretos batem genérico em qualquer dia.

## 10. Estrutura de seções + direção de copy

> Copy final + layout por seção vivem em **`cwbrownerie-copy.md`** (fonte da verdade da LP). Abaixo, só o mapa das seções.

1. **Hero** — headline de resultado, não de serviço.
   *Ex.:* "Seu site vende. O WhatsApp só fecha." / sub: "Transformamos o CWBrownerie num fluxo onde o cliente chega no seu WhatsApp já com cesta, endereço, data e pagamento escolhidos — pronto pra fechar."
   CTA único + visual da cesta + cards de review de clientes (ver §11).

2. **Diagnóstico com os dados dele** — mostra que estudamos o negócio.
   *Ex.:* "Em uma semana: 4.336 visitas, R$ investidos em Google Ads — e cada pedido ainda montado na mão, print por print." Aponta o vazamento: paga pelo clique, perde na qualificação.

3. **A visão** — o depois. Cliente pré-qualificado, você só fecha.

4. **O que está incluso** — features em benefício (catálogo com filtros, jornada até o WhatsApp, sazonais gerenciáveis, admin de preços, banners, código seu).

5. **Como a gente trabalha** — o processo de estúdio (descoberta → proposta → aprovação → desenvolvimento → apresentação → lançamento → acompanhamento). Vende que ele contrata método, não freela solto.

6. **Por que não Shopify** — custo real somado: ~US$ 117/mês (Basic $39 + Zapiet $29,99 + Better Reports $19,90 + Loox $9,99 + PageFly $18) + 2% por venda (Shopify Payments não roda no BR). Contra: seu site, uma vez, código seu.

7. **Investimento** — dois modelos (único vs anual) lado a lado, com o enquadramento "o retainer sai do que você já gasta em ads".

8. **Quem faz** — Nasus, credibilidade, garantia/como trabalhamos.

9. **FAQ** — objeções: prazo, migração, "perco meu Google?", domínio, "e se eu quiser vender online depois?".

10. **CTA final** — um único caminho pra fechar.

## 11. Direção de UI / Design

**Nicho:** presente artesanal premium, quente, elegante. A UI tem que **cheirar a cesta bem embrulhada**, não a SaaS.

**Paleta = a MESMA do site do CWBrownerie** (requisito: a proposta veste a marca do cliente). Valores abaixo afinados contra o site real:

| Token | Hex (real) | Uso |
|---|---|---|
| `--cream-100` | `#FFF2E3` | fundo creme quente (bg principal) |
| `--cocoa-900` | `#452816` | nav/footer, chocolate escuro |
| `--cocoa-700` | `#734120` | blocos, marrom médio |
| `--cocoa-500` | `#A8845C` | camel/tan (colunas de produto) |
| `--gold-500` | `#C1971E` | dourado (colunas de produto), acento |
| `--taupe` | `#756F63` | texto de título/apoio (muted — usado no site) |
| `--ink` | `#272521` | texto forte |
| `--whatsapp` | `#25A34A` | CTA de WhatsApp |

> **Não** usar a paleta da referência (verde/roxo) — usar a do cliente acima. Textura sutil de damasco/ornamento (o site dele já usa marca d'água ornamental); motivo de **fita de cetim** como detalhe.

**Tipografia (real do site):**
- **Display/títulos: Cinzel** (Google Font, grátis) — carrega a identidade da marca.
- **Sans (corpo/nav): MADE Tommy** é a original, mas é **paga** → na proposta, substituir por geométrica grátis próxima (Poppins/Questrial) ou o Geist do projeto. Cinzel é o que faz parecer "deles".
- Secundária serif opcional: Playfair Display (também usada no site).

**Hero — imagem real a usar:** `propostas/cwbrownerie/cesta.jpg`. Layout:
- Imagem grande de **cesta** à direita.
- Título serif + subtexto + **CTA** à esquerda.
- **Cards de review de clientes** flutuando sobre a imagem (prova social).
- "Stats" no lugar de calorias/proteína: **anos de mercado, nº de entregas, nota média**.
- Faixa de **miniaturas de cestas** embaixo → pode virar carrossel.

**Componentes-chave:** card de cesta, stepper da jornada, tabela de escopo/investimento, accordion de FAQ, faixa de social proof.

## 12. Técnico da página

- Rota **`/propostas/cwbrownerie`** no nasus.digital.
- **Stack: Next.js 16 + Tailwind v4 + GSAP** (mesma do nasus.digital) — componentizar a LP em seções reutilizáveis. Fontes já no projeto: Instrument Serif (display) + Geist (corpo).
- Responsivo (mobile-first — ele abriu tudo no celular).
- **OG tags** caprichadas: o link vai cair no WhatsApp dele; preview tem que vender sozinho.
- **Privacidade:** proposta é semi-privada — slug não-óbvio + `noindex`. Não queremos concorrente achando no Google.

## 13. Plano de execução (build da LP)

**Feito:** tema travado (paleta real §11 + Cinzel), copy + layout (`cwbrownerie-copy.md`), hero A escolhido, **LP construída e rodando** em `app/propostas/cwbrownerie/` (rota `/propostas/cwbrownerie`, isolada do tema Nasus via branch próprio + exclusão no middleware). Typecheck limpo, HTTP 200, 10 seções renderizando com a paleta do cliente.

**Placeholders a preencher antes de enviar:** número do WhatsApp do Tiago (`page.tsx` const `WHATSAPP`), preços R$ (§7, 2 cards), depoimentos + nota Google + nº entregas (hero), logo (monograma "N" provisório em "Quem faz"), prova/cases da Nasus.

**Pré-requisitos (paralelos, não bloqueiam o build):**
- Assets: `cesta.jpg` (ok), logo do CWBrownerie, +1–2 fotos de cesta.
- Dados reais: depoimentos, nota Google, nº de entregas (Leonardo); valores de preço (§7).

**Build:**
0. **Fontes/tokens** — Cinzel (Google) + sans geométrica grátis; tokens da paleta (§11) escopados na rota, sem vazar no tema do nasus.
1. **Scaffold** da rota `/propostas/cwbrownerie` no Next 16 (ler `node_modules/next/dist/docs/` antes — AGENTS.md), com `noindex` + OG tags.
2. **Seções**, componente a componente, seguindo o deck (layout por seção): hero split → faixa escura → fluxo → bento → timeline → Shopify → cards → banda → accordion → CTA.
3. **Animações** GSAP sutis no scroll.
4. **Conteúdo** real do deck; placeholder no que falta (preços, depoimentos).
5. **Responsivo** mobile-first + OG image + performance.
6. **Deploy** (Vercel), slug semi-privado + `noindex`, link pro Leonardo.

Os números de preço entram na seção Investimento por último; o resto sobe com placeholder.

**Insumos a coletar do Leonardo (não travam a proposta — entram no build/lançamento):**
- **Domínio:** confirmar no cutover se o Wix é só host ou também **registrador** (muda o passo de DNS).
- **URLs de anúncio ativas:** lista pra montar os redirects (módulo 10).
- **Fotos em alta + logo/brand assets** (senão extraímos do Wix — qualidade limita um site de presente).
- **Tabela de preço por item** da Monte Sua Box (montar junto na fase de conteúdo).

## 14. Aberto para você decidir

- **UI:** a direção do §11 fecha com o que você imaginou, ou quer mandar mais referências antes de eu detalhar os componentes?
