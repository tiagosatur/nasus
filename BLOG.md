# BLOG.md — Processo de criação de posts

Complementa a estratégia em `PLANO.md` (Seção 9). Este arquivo define **como executar** cada post: pesquisa, escrita, estrutura e publicação.

**Público-alvo do site**: profissionais liberais brasileiros — clínicas de estética, dentistas, advogados, médicos, coaches, consultores. O blog cobre qualquer um desses nichos.

---

## 1. Pesquisa — fontes por ordem de confiança

### Usar primeiro

| Fonte | Tipo | Por quê |
|---|---|---|
| CFO, ABIMO, ANS, IBGE | Primária / oficial | Dados do setor com metodologia verificável |
| SciELO, Google Scholar | Acadêmica | Estudos peer-reviewed sobre saúde e comportamento |
| Google/Deloitte, BrightLocal, Statista | Pesquisas de mercado originais | Métricas de comportamento digital com metodologia pública |
| Reddit (r/odontologia, r/estetica, r/marketing, r/brdev, r/smallbusiness, r/direito, r/medicina) | Comunidade real | Perspectiva de praticantes sem interesse comercial |
| Fóruns profissionais (CRO, CFO, OAB) | Associações | Regulamentações, restrições éticas, números do setor |
| Sites oficiais do Google (developers.google.com, web.dev) | Primária técnica | PageSpeed, Core Web Vitals, SEO guidelines |

### Usar com cautela

| Fonte | Problema |
|---|---|
| Blogs de SaaS odontológico (Clinicorp, SimplesDental, OdontoResults, DentalOffice) | Alta probabilidade de conteúdo gerado por IA, sem fontes primárias citadas, viés comercial |
| Agências de marketing digital (Tulipia, Freshlab, C4Marketing) | Idem — conteúdo produzido para ranquear, não para informar |
| Sites de "X estatísticas sobre Y" sem links para fonte original | Números propagados sem verificação |
| Qualquer stat sem fonte rastreável | Não usar — se não tem fonte, não entra |

### Regra de ouro para stats

> Se não consigo abrir a pesquisa original e verificar o número, não cito.  
> Alternativa aceitável: citar como "segundo [fonte secundária]" e notar que é dado reportado.

---

## 2. Processo — passo a passo

**Antes de escrever:**

1. Ler a seção do `PLANO.md` correspondente ao post (ângulo, queries-alvo, competidores)
2. Verificar os competidores listados no PLANO.md — ler os top 3 do SERP para identificar o que já existe e o que está faltando
3. Pesquisar em fontes primárias e Reddit antes de aceitar dados de blogs de SaaS
4. Definir o ângulo diferenciador: o que este post diz que os outros não dizem?

**Na escrita:**

5. Intro: hook com dado real + o que o leitor vai encontrar (sem fluff, sem "neste artigo vamos ver...")
6. Cada H2 em formato de pergunta genuína (algo que o paciente/cliente realmente pesquisaria)
7. Answer capsule imediata após cada H2 — primeira frase responde standalone, sem precisar ler o parágrafo todo
8. Desenvolver com evidências: dados, tabelas, listas, exemplos concretos
9. Checklist quando o H2 pedir ação — específico o suficiente para implementar sozinho
10. Tabelas para comparações — LLMs as extraem verbatim, é o formato de maior autoridade por custo
11. CTA sutil como blockquote em pontos naturais — nunca interrompendo leitura no meio de um raciocínio

**Ao terminar:**

12. Verificar checklist de qualidade (Seção 4 abaixo)
13. Criar no Sanity como draft — nunca publicar direto
14. Tiago revisa, adiciona imagem de capa e publica

---

## 3. Template de estrutura

```
[Intro — 2-3 parágrafos]
  ↳ Parágrafo 1: dado concreto que cria urgência / contexto
  ↳ Parágrafo 2: tensão — o problema que persiste
  ↳ Parágrafo 3: o que este guia entrega (sem ser "neste artigo...")

[H2 em pergunta — answer capsule + desenvolvimento]
  ↳ Resposta direta na 1ª frase
  ↳ Dado ou evidência
  ↳ Contexto / nuance
  ↳ Exemplo concreto quando útil

[H3 quando cabe checklist, tabela ou subtópico]

[H2 em pergunta — ...]
[H2 em pergunta — ...]

[H2: Checklist completo — nome do tema]
  ↳ Agrupado por categoria (bold subtitle)
  ↳ Itens específicos e verificáveis

[H2: Perguntas frequentes]
  ↳ 3-5 H3s com pergunta + resposta direta
  ↳ Formato FAQ → schema FAQPage

[H2: Conclusão]
  ↳ Síntese em 2-3 parágrafos
  ↳ Blockquote final com CTA para WhatsApp / diagnóstico
```

---

## 4. Checklist de qualidade antes de criar no Sanity

**Conteúdo**
- [ ] Todo stat tem fonte identificável (não "segundo pesquisas")
- [ ] Nenhum parágrafo começa com "Neste artigo" ou "Como vimos"
- [ ] Cada H2 é uma pergunta que alguém realmente pesquisaria no Google
- [ ] O answer capsule da 1ª frase faz sentido lido isoladamente
- [ ] Nenhuma lista de bullet com itens vagos (ex: "tenha presença digital" — muito abstrato)
- [ ] Checklists têm itens acionáveis, específicos o suficiente para implementar sem ajuda

**Voz e tom**
- [ ] Tiago fala como engenheiro que entende os dados, não como agência de marketing
- [ ] Direto: diz o que não funciona, sem blindar todos os lados
- [ ] "Você" consistente (dono de clínica ou consultório, 35-55 anos)
- [ ] Sem frases de enchimento — cada parágrafo tem uma função
- [ ] Não inventa casos de sucesso — usa dados reais ou diz "ainda não temos cases"

**Técnico / SEO**
- [ ] Título tem a keyword principal + benefício claro
- [ ] Excerpt é uma frase que responde "por que ler isso?" em ≤ 160 chars
- [ ] H2s cobrem variações semânticas da keyword principal
- [ ] Tabelas têm header row + separator row antes dos dados
- [ ] FAQ cobre perguntas de cauda longa reais (verificar Google "Pessoas também perguntam")

---

## 5. Voz do Tiago — guia rápido

| Fazer | Evitar |
|---|---|
| Dados concretos com fonte | Stats sem origem |
| Ser honesto sobre limitações ("SEO leva 3-6 meses") | Prometer resultados garantidos |
| Mostrar o raciocínio de engenheiro | Linguagem de copywriter genérico |
| Comparar opções com trade-offs reais | Dizer que tudo é ótimo ou tudo é ruim |
| Citar o medspa-leads como prova de processo quando relevante | Inventar cases |
| POV: "engenheiro solo, sem agência no meio" | Soar como SaaS vendendo produto |
| Exemplos que qualquer pessoa entende (velocidade de carregamento, posição no Google) | Jargão técnico sem analogia (TTI, FCP, hydration sem contexto) |

Tom: didático mas direto. Não paternalista. Fala com dono de clínica ou escritório — 35-55 anos, boa discernimento, mas não é técnico. Explica o "por quê" em termos de resultado de negócio, não de implementação. Analogias simples quando o conceito é técnico.

---

## 6. Publicação no Sanity

**Checklist técnico:**
- [ ] `_id`: formato `post-slug-do-post` (ex: `post-como-atrair-pacientes-odontologico`)
- [ ] `slug.current`: kebab-case, mesma keyword do título
- [ ] `language`: `"pt"` ou `"en"`
- [ ] `publishedAt`: data real de publicação em ISO 8601
- [ ] `excerpt`: ≤ 160 chars, responde "por que ler" sem spoilar a resposta
- [ ] `body`: Portable Text via `create_documents_from_json`

**Categorias — Claude faz isso, não Tiago:**
- Antes de criar o post, consulte `*[_type == "category" && language == $lang]` para ver as categorias existentes
- Se a categoria adequada não existir, crie via Mutations API com `createOrReplace` e ID legível (ex: `category-presenca-no-google-pt`)
- Ao criar o post, inclua o array `categories` com a referência já linkada
- Se precisar linkar depois, use `patch` via Mutations API: `set: { categories: [{ _type: 'reference', _ref: 'id-da-categoria', _key: 'cat1' }] }`

**Após criar o draft:**
- [ ] Claude adiciona categoria (ver acima)
- [ ] Tiago adiciona `mainImage` no Sanity Studio
- [ ] Tiago revisa e publica

**Categorias existentes (verificar antes de criar nova):**

```
query: *[_type == "category"]{ _id, title, language }
resource: { projectId: "csj6iko2", dataset: "production" }
```

---

## 7. Posts planejados (status)

Ver `PLANO.md` Seção 9.8 para a lista completa e ângulo de cada post.

| # | Título PT | Status |
|---|---|---|
| 1 | Site para clínica de estética: o que muda em 2026 | ✅ Publicado (EN) |
| 2 | Como atrair pacientes para o consultório odontológico | 🟡 Draft no Sanity |
| 3 | Marketing digital pra clínica de estética: o que você está pagando pra uma agência fazer | ⬜ Pendente |
| 4 | Site para advogado: por que template genérico está custando seus clientes | ⬜ Pendente |
| 5 | Como ser citado por ChatGPT como referência no seu nicho | ⬜ Pendente |
