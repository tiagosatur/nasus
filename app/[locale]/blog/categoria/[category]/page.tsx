import { getTranslations, getLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PostCard } from '@/components/blog/PostCard'
import { getPostsByCategory, getAllCategories } from '@/lib/sanity/queries'
import { Link } from '@/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ category: string }>
}

export const revalidate = 300

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getLocale()
  const { category } = await params
  const categories = await getAllCategories(locale)
  const cat = categories.find((c) => c.slug.current === category)

  return {
    title: cat ? `${cat.title} — Blog — Nasus Digital` : 'Blog — Nasus Digital',
    description: cat?.description,
  }
}

export default async function CategoryPage({ params }: Props) {
  const locale = await getLocale()
  const t = await getTranslations('blog')
  const { category } = await params

  const [posts, categories] = await Promise.all([
    getPostsByCategory(category, locale),
    getAllCategories(locale),
  ])

  const currentCategory = categories.find((c) => c.slug.current === category)
  if (!currentCategory) notFound()

  return (
    <>
      <Header />
      <main className="bg-bg-primary flex-1 flex flex-col pt-[104px]">


        {/* Cabeçalho */}
        <div className="px-6 md:px-12 lg:px-24 pt-10 pb-10">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/blog"
              className="text-xs font-mono text-text-muted hover:text-accent transition-colors duration-200 mb-4 block"
            >
              {t('backToBlog')}
            </Link>
            <h1 className="font-display text-4xl md:text-5xl text-text-primary leading-tight">
              {currentCategory.title}
            </h1>
            {currentCategory.description && (
              <p className="text-sm text-text-muted mt-2 max-w-sm">
                {currentCategory.description}
              </p>
            )}
          </div>
        </div>

        {/* Posts */}
        <div className="px-6 md:px-12 lg:px-24 pb-16 flex-1">
          <div className="max-w-6xl mx-auto">
            {posts.length === 0 ? (
              <div className="flex flex-col items-start gap-1 pb-24">
                <span className="font-display text-3xl italic text-text-muted">{t('comingSoon')}</span>
                <p className="text-sm text-text-muted">{t('noPosts')}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                <PostCard post={posts[0]} locale={locale} variant="featured" />
                {posts.length > 1 && (
                  <div className="divide-y divide-border">
                    {posts.slice(1).map((post) => (
                      <PostCard key={post._id} post={post} locale={locale} variant="editorial" />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
