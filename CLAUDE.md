@AGENTS.md

# nasus.digital

Site institucional da Nasus Digital — empresa de presença digital para profissionais liberais brasileiros (estética, odontologia, direito, coaches).

Plano completo em `PLANO.md`.

## Stack
- Next.js 16 + TypeScript + Tailwind CSS v4 + GSAP 3
- Deploy: Vercel (DNS na Hostinger)
- Dev: `pnpm dev` → localhost:3000

## Estado atual
- [x] Projeto inicializado e rodando
- [x] Design system: tokens de cor, tipografia (Instrument Serif + Geist), grain overlay, cursor customizado
- [x] Componentes base: `Button`, `GoldLine`, `CustomCursor`
- [x] Seção Hero com animações GSAP (SplitText char-by-char, linha dourada, fade CTAs)
- [ ] **PRÓXIMO: redesign visual completo** — paleta atual (dark #111 + gold) não agradou. Usar `/ui-ux-pro-max` ou `/frontend-design` com o prompt abaixo

## Próximo passo — prompt para skill de design

```
/ui-ux-pro-max

Redesenha o site nasus.digital visualmente.

NEGÓCIO: Nasus Digital — empresa especializada em presença
digital para profissionais liberais brasileiros (clínicas de
estética, dentistas, advogados).

PÚBLICO-ALVO: Dono de clínica ou consultório, 35-55 anos.
Confia em marcas sérias e humanas ao mesmo tempo.
O nicho de estética tem forte afinidade com paletas quentes e cremosas.

DIREÇÃO VISUAL: Light mode quente. Off-whites cremosos como
base, acento terracota ou âmbar, tipografia com peso e presença.
Elegante e confiável — não frio corporativo, não agência criativa escura.

OBJETIVO DE CONVERSÃO: CTA principal é WhatsApp verde
(#25D366) — deve ter destaque absoluto na página.

STACK: Next.js + Tailwind v4 + GSAP (animações sutis, scroll-driven).
Fonte display: Instrument Serif. Fonte body: Geist Sans.

ENTREGUE:
1. Paleta completa com justificativa (base, secundária, acento, texto, bordas, CTA)
2. Hero section reimaginada com novo esquema visual
3. globals.css atualizado com os novos tokens
```

## Seções a implementar (em ordem)
1. Hero ← já existe, será redesenhada
2. Problema — funil visual mostrando paciente encontrando concorrente
3. Solução — 3 camadas do sistema (site → SEO → LP)
4. Prova — dados do medspa-leads ("78% das clínicas invisíveis no Google")
5. Como funciona — 3 passos com ScrollTrigger pinning
6. Sobre — Nasus Digital como marca, fundador técnico visível
7. CTA Final — diagnóstico gratuito

## Decisões já tomadas
- Sem tabela de preços no site (conversa → proposta personalizada)
- Nicho primário: estética/saúde (ferramenta medspa-leads em Documents/medspa-leads já prospecta ativamente)
- Mensalidade SEO nomeada "Presença Contínua no Google" (não "SEO")
- WhatsApp com mensagem pré-preenchida qualificando o lead
- Seção de prova: dados reais do medspa-leads, sem cases inventados
