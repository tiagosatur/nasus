# nasus.digital

Site institucional da [Nasus Digital](https://nasus.digital) — presença digital para profissionais liberais brasileiros.

## Stack

- **Next.js 16** + TypeScript + App Router
- **Tailwind CSS v4**
- **GSAP 3** (SplitText, ScrollTrigger)
- **next-intl** — i18n pt-BR / en
- **Sanity** — CMS headless para o blog (projeto `csj6iko2`, dataset `production`)
- **Vercel** (deploy) · DNS na Hostinger

## Dev

```bash
pnpm dev      # localhost:3000
pnpm build
pnpm lint
```

## Blog (Sanity CMS)

Posts gerenciados via [sanity.io/manage](https://sanity.io/manage) ou pelo MCP do Sanity.

**Rendering strategy (ISR):**

| Rota | Estratégia | Revalida |
|---|---|---|
| `/blog` | ISR | 5 min |
| `/blog/[slug]` | SSG + ISR | 1h |
| `/blog/categoria/[cat]` | ISR | 5 min |

Novos posts publicados no Sanity aparecem automaticamente sem redeploy (dentro do intervalo de revalidação).

**Env vars necessárias:**
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — `csj6iko2`
- `NEXT_PUBLIC_SANITY_DATASET` — `production`
- `SANITY_API_READ_TOKEN` — token de leitura (Sanity → API → Tokens)

## Estrutura

```
app/
  [locale]/           # Rotas pt (/) e en (/en)
    layout.tsx
    page.tsx
    blog/
      page.tsx        # Índice do blog (ISR 5min)
      [slug]/
        page.tsx      # Post individual (SSG + ISR 1h)
      categoria/
        [category]/
          page.tsx    # Filtro por categoria (ISR 5min)
  globals.css         # Design tokens + base styles
components/
  layout/
    Header/           # Header.tsx + Header.module.css
    Footer.tsx
  sections/           # Hero, Problem, Solution, Proof, Process, About, FinalCTA
  blog/               # PostCard, CategoryBar, PortableTextRenderer
  ui/                 # Button, WhatsAppIcon, BookButton, CustomCursor, GoldLine
lib/
  sanity/             # client.ts, queries.ts, types.ts, image.ts
  jsonLd.ts           # Schema.org Organization + Person
  gsap.ts
  whatsapp.ts
messages/             # Traduções pt.json / en.json
i18n/                 # Configuração next-intl
public/
  logo.svg
  logo-on-dark.svg
  tiago.png
```

## Deploy

GitHub Actions → Vercel (free tier). DNS na Hostinger.

- Push para `main` → deploy em produção (`nasus.digital`)
- Pull request → deploy de preview

Secrets necessários no GitHub (`Settings → Secrets → Actions`):
- `VERCEL_TOKEN` — token de acesso da Vercel
- `VERCEL_ORG_ID` — ID da organização (Vercel → Settings → General)
- `VERCEL_PROJECT_ID` — ID do projeto (Vercel → Project → Settings → General)

Variáveis de ambiente na Vercel (`Project → Settings → Environment Variables`):
- `NEXT_PUBLIC_SENTRY_DSN` — DSN do projeto Sentry (não marcar como Sensitive — é público por design, vai no bundle do browser)
- `NEXT_PUBLIC_SANITY_PROJECT_ID` — `csj6iko2`
- `NEXT_PUBLIC_SANITY_DATASET` — `production`
- `SANITY_API_READ_TOKEN` — token de leitura do Sanity

Fluxo: `pnpm install` → `vercel pull` → `vercel build` → `vercel deploy --prebuilt`

Serviços:
- Sentry: https://nasus-digital.sentry.io
- https://www.sanity.io
- Google Search Console (GSC): https://search.google.com/search-console
- Vercel: https://vercel.com/tiagosaturs-projects/nasus