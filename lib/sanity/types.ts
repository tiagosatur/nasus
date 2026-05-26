export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  alt?: string
}

export interface Category {
  _id: string
  title: string
  slug: { current: string }
  description?: string
  language: string
}

export interface Post {
  _id: string
  _type: 'post'
  title: string
  slug: { current: string }
  language: string
  publishedAt: string
  excerpt?: string
  coverImage?: SanityImage
  body: unknown[]
  categories?: Category[]
  readingTime?: number
  translationKey?: string
}

export interface PostSummary {
  _id: string
  title: string
  slug: { current: string }
  language: string
  publishedAt: string
  excerpt?: string
  coverImage?: SanityImage
  categories?: Pick<Category, 'title' | 'slug'>[]
  readingTime?: number
}
