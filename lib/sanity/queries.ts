import { client } from './client'
import type { Post, PostSummary, Category } from './types'

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

export async function getAllPosts(language: string): Promise<PostSummary[]> {
  return client.fetch(
    `*[_type == "post" && language == $language && defined(publishedAt)] | order(publishedAt desc) {
      ${postSummaryFields}
    }`,
    { language }
  )
}

export async function getPostBySlug(slug: string, language: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug && language == $language][0] {
      _id, _type, title, slug, language, publishedAt, excerpt, coverImage { asset, alt },
      body, categories[]-> { _id, title, slug, description, language }, readingTime, translationKey
    }`,
    { slug, language }
  )
}

export async function getTranslatedSlug(translationKey: string, language: string): Promise<string | null> {
  const result = await client.fetch(
    `*[_type == "post" && translationKey == $translationKey && language == $language][0].slug.current`,
    { translationKey, language }
  )
  return result ?? null
}

export async function getPostsByCategory(categorySlug: string, language: string): Promise<PostSummary[]> {
  return client.fetch(
    `*[_type == "post" && language == $language && $categorySlug in categories[]->slug.current && defined(publishedAt)] | order(publishedAt desc) {
      ${postSummaryFields}
    }`,
    { categorySlug, language }
  )
}

export async function getAllCategories(language: string): Promise<Category[]> {
  return client.fetch(
    `*[_type == "category" && language == $language] | order(title asc) {
      _id, title, slug, description, language
    }`,
    { language }
  )
}

export async function getAllPostSlugs(): Promise<{ slug: string; language: string }[]> {
  return client.fetch(
    `*[_type == "post" && defined(publishedAt)] { "slug": slug.current, language }`
  )
}
