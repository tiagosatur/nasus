# nasus.digital

Site institucional da [Nasus Digital](https://nasus.digital) — presença digital para profissionais liberais brasileiros.

## Stack

- **Next.js 15** + TypeScript + App Router
- **Tailwind CSS v4**
- **GSAP 3** (SplitText, ScrollTrigger)
- **next-intl** — i18n pt-BR / en
- **Vercel** (deploy) · DNS na Hostinger

## Dev

```bash
pnpm dev      # localhost:3000
pnpm build
pnpm lint
```

## Estrutura

```
app/
  [locale]/       # Rotas pt (/) e en (/en)
    layout.tsx
    page.tsx
  globals.css     # Design tokens + base styles
components/
  layout/
    Header/       # Header.tsx + Header.module.css
    Footer.tsx
  sections/       # Hero, Problem, Solution, Proof, Process, About, FinalCTA
  ui/             # Button, WhatsAppIcon, BookButton, CustomCursor, GoldLine
lib/
  jsonLd.ts       # Schema.org Organization + Person
  gsap.ts
  whatsapp.ts
messages/         # Traduções pt.json / en.json
i18n/             # Configuração next-intl
public/
  logo.svg
  logo-on-dark.svg
  tiago4.webp
```

## Deploy

Push para `main` dispara deploy automático na Vercel.
