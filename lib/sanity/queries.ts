import { client } from './client'
import type { Post, PostSummary, Category } from './types'

/**
 * Projeção GROQ compartilhada por queries que listam posts em formato
 * de "card" (índice, categoria). Mantida como fragmento string para evitar
 * divergência entre listagens — se um campo for adicionado/removido aqui,
 * todas as listagens refletem automaticamente.
 *
 * Não inclui `body` (Portable Text) porque listagens não renderizam o
 * conteúdo completo — buscar bodies de N posts seria desperdício de
 * banda e payload na resposta da CDN do Sanity.
 */
const postSummaryFields = `
  _id,
  title,
  slug,
  language,
  publishedAt,
  excerpt,
  coverImage { asset, alt },
  categories[]-> { title, slug },
  readingTime
`

/**
 * Lista todos os posts publicados de um idioma, ordenados do mais recente
 * para o mais antigo (padrão esperado em página de blog).
 *
 * `defined(publishedAt)` filtra rascunhos — posts no Sanity podem existir
 * sem data de publicação enquanto estão sendo escritos, e não queremos
 * exibi-los em produção.
 */
export async function getAllPosts(language: string): Promise<PostSummary[]> {
  return client.fetch(
    `*[_type == "post" && language == $language && defined(publishedAt)] | order(publishedAt desc) {
      ${postSummaryFields}
    }`,
    { language }
  )
}

/**
 * Busca um post específico por slug + idioma para a rota `/blog/[slug]`.
 *
 * Retorna o post completo (com `body` para renderizar Portable Text e
 * `translationKey` para o seletor de idioma encontrar a versão traduzida).
 * `categories[]->` faz dereference das referências, devolvendo os objetos
 * de categoria inline em vez de só os IDs — evita uma segunda query.
 *
 * Retorna `null` se não houver post com esse slug naquele idioma, o que
 * o caller usa para chamar `notFound()`.
 */
export async function getPostBySlug(slug: string, language: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug && language == $language][0] {
      _id, _type, title, slug, language, publishedAt, excerpt, coverImage { asset, alt },
      body, categories[]-> { _id, title, slug, description, language }, readingTime, translationKey
    }`,
    { slug, language }
  )
}

/**
 * Dado o `translationKey` de um post (chave compartilhada entre versões
 * em idiomas diferentes), descobre qual é o slug da versão no idioma alvo.
 *
 * Usado pelo seletor de idioma na página de post: quando o usuário troca
 * pt→en, precisamos navegar para o slug em inglês daquela mesma matéria
 * (que geralmente é diferente do slug em português, ex.: "como-vender"
 * vs "how-to-sell"). Sem isso, o switch jogaria o usuário no 404.
 *
 * Retorna `null` se não houver tradução publicada — o caller pode então
 * cair para a home do idioma ou mostrar mensagem.
 */
export async function getTranslatedSlug(translationKey: string, language: string): Promise<string | null> {
  const result = await client.fetch(
    `*[_type == "post" && translationKey == $translationKey && language == $language][0].slug.current`,
    { translationKey, language }
  )
  return result ?? null
}

/**
 * Lista posts de uma categoria específica para `/blog/categoria/[category]`.
 *
 * Filtra por `$categorySlug in categories[]->slug.current` — desempacota
 * a array de referências de categoria e checa se o slug procurado está
 * entre elas. Reutiliza `postSummaryFields` para consistência com o
 * índice geral do blog.
 */
export async function getPostsByCategory(categorySlug: string, language: string): Promise<PostSummary[]> {
  return client.fetch(
    `*[_type == "post" && language == $language && $categorySlug in categories[]->slug.current && defined(publishedAt)] | order(publishedAt desc) {
      ${postSummaryFields}
    }`,
    { categorySlug, language }
  )
}

/**
 * Lista todas as categorias de um idioma, ordenadas alfabeticamente.
 *
 * Usado pelo navegador de categorias no cabeçalho do blog. Categorias
 * são idioma-específicas (não compartilham translationKey entre pt/en),
 * então não há lógica de tradução aqui.
 */
export async function getAllCategories(language: string): Promise<Category[]> {
  return client.fetch(
    `*[_type == "category" && language == $language] | order(title asc) {
      _id, title, slug, description, language
    }`,
    { language }
  )
}

/**
 * Lista compacta de todos os posts (slug + idioma) para `generateStaticParams`
 * da rota `/blog/[slug]` — o Next precisa saber em build-time quais combinações
 * de locale + slug existem para pré-renderizar as páginas estáticas.
 *
 * Projeção mínima de propósito: payload menor = build mais rápido.
 */
export async function getAllPostSlugs(): Promise<{ slug: string; language: string }[]> {
  return client.fetch(
    `*[_type == "post" && defined(publishedAt)] { "slug": slug.current, language }`
  )
}

/**
 * Shape dos posts retornados para o sitemap. `_updatedAt` é um metacampo
 * automático do Sanity (timestamp da última edição do documento), usado
 * como `lastModified` no sitemap para sinalizar ao Google quando recrawlear.
 */
export interface SitemapPost {
  slug: string
  language: string
  translationKey?: string
  publishedAt: string
  _updatedAt: string
}

/**
 * Lista todos os posts publicados com os campos mínimos que o sitemap
 * precisa: slug (URL), language (locale prefix), translationKey (para
 * parear hreflang), e timestamps.
 *
 * Separada de `getAllPosts` porque o sitemap não precisa de coverImage,
 * excerpt nem categorias — projeção menor mantém a geração do sitemap
 * leve mesmo quando o blog tiver centenas de posts.
 */
export async function getPostsForSitemap(): Promise<SitemapPost[]> {
  return client.fetch(
    `*[_type == "post" && defined(publishedAt)] {
      "slug": slug.current, language, translationKey, publishedAt, _updatedAt
    }`
  )
}

/**
 * Shape das categorias retornadas para o sitemap — apenas o suficiente
 * para montar a URL e o `lastModified`.
 */
export interface SitemapCategory {
  slug: string
  language: string
  _updatedAt: string
}

/**
 * Lista todas as categorias para inclusão no sitemap.
 *
 * Ao contrário de `getAllCategories`, não filtra por idioma — o sitemap
 * precisa de pt e en em uma única busca, com `language` em cada item
 * para o gerador decidir qual prefixo de URL aplicar.
 */
export async function getCategoriesForSitemap(): Promise<SitemapCategory[]> {
  return client.fetch(
    `*[_type == "category"] { "slug": slug.current, language, _updatedAt }`
  )
}
