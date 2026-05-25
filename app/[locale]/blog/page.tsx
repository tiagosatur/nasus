import { getTranslations, getLocale } from 'next-intl/server'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PostCard } from '@/components/blog/PostCard'
import { getAllPosts, getAllCategories } from '@/lib/sanity/queries'
import { Link } from '@/navigation'
import type { Metadata } from 'next'

export const revalidate = 300 // revalida a cada 5 min após publicar novo post

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'blog' })
  return {
    title: `${t('title')} — Nasus Digital`,
    description: t('description'),
    alternates: {
      canonical: locale === 'pt' ? '/blog' : '/en/blog',
      languages: { pt: '/blog', en: '/en/blog' },
    },
  }
}

export default async function BlogPage() {
  const locale = await getLocale()
  const t = await getTranslations('blog')

  const [posts, categories] = await Promise.all([
    getAllPosts(locale),
    getAllCategories(locale),
  ])

  return (
    <>
      <Header />
      <main className="bg-bg-primary flex-1 flex flex-col pt-[104px]">


        {/* Cabeçalho da página */}
        <div className="px-6 md:px-12 lg:px-24 pt-10 pb-10">
          <div className="max-w-6xl mx-auto flex items-start justify-between gap-8">
            <div>
              <h1 className="font-display text-4xl md:text-5xl text-text-primary leading-tight">
                {t('title')}
              </h1>
              <p className="text-sm text-text-muted mt-2 max-w-sm">
                {t('description')}
              </p>
            </div>

            {categories.length > 0 && (
              <div className="hidden sm:flex flex-wrap gap-2 pt-2 justify-end">
                {categories.map((cat) => (
                  <Link
                    key={cat._id}
                    href={`/blog/categoria/${cat.slug.current}` as '/blog/categoria/[category]'}
                    className="text-xs font-mono uppercase tracking-wider text-text-muted border border-border px-3 py-1.5 rounded-sm hover:text-accent hover:border-accent transition-colors duration-200 whitespace-nowrap"
                  >
                    {cat.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Posts */}
        <div className="px-6 md:px-12 lg:px-24 pb-16 flex-1">
          <div className="max-w-6xl mx-auto">
            {posts.length === 0 ? (
              <div className="flex flex-col items-start gap-1 pb-24">
                <span className="font-display text-3xl italic text-text-muted">Em breve</span>
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
