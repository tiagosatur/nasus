import { Suspense } from 'react'
import { getTranslations, getLocale } from 'next-intl/server'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PostCard } from '@/components/blog/PostCard'
import { getAllPosts, getAllCategories } from '@/lib/sanity/queries'
import { Link } from '@/navigation'
import type { Metadata } from 'next'

export const revalidate = 300

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

function Bone({ className = '' }: { className?: string }) {
  return <div className={`bg-bg-secondary rounded-sm animate-pulse ${className}`} />
}

function BlogSkeleton() {
  return (
    <>
      <div className="pt-10 pb-10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 flex items-start justify-between gap-8">
          <div className="flex flex-col gap-3">
            <Bone className="h-10 md:h-12 w-36 md:w-48" />
            <Bone className="h-4 w-56 md:w-72" />
            <Bone className="h-4 w-32 md:w-44" />
          </div>
          <div className="hidden sm:flex gap-2 pt-2">
            <Bone className="h-7 w-20" />
            <Bone className="h-7 w-24" />
            <Bone className="h-7 w-16" />
          </div>
        </div>
      </div>

      <div className="pb-16 flex-1">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="flex flex-col gap-8">
          <div className="bg-bg-card border border-border rounded-md overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_1.1fr]">
            <div className="flex flex-col justify-center p-8 md:p-12 gap-5 order-2 md:order-1">
              <Bone className="h-5 w-20" />
              <div className="flex flex-col gap-2">
                <Bone className="h-8 w-full" />
                <Bone className="h-8 w-4/5" />
                <Bone className="h-8 w-3/5" />
              </div>
              <div className="flex flex-col gap-2">
                <Bone className="h-4 w-full" />
                <Bone className="h-4 w-11/12" />
                <Bone className="h-4 w-3/4" />
              </div>
              <Bone className="h-3 w-32" />
              <Bone className="h-4 w-24" />
            </div>
            <div className="order-1 md:order-2 bg-bg-secondary min-h-[240px] md:min-h-[360px]" />
          </div>

          <div className="divide-y divide-border">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-5 md:gap-8 py-7 px-1">
                <Bone className="flex-shrink-0 w-32 md:w-44 aspect-video self-start" />
                <div className="flex flex-col gap-2.5 flex-1 min-w-0">
                  <Bone className="h-4 w-16" />
                  <Bone className="h-6 w-4/5" />
                  <Bone className="h-6 w-3/5" />
                  <Bone className="h-3.5 w-full" />
                  <Bone className="h-3.5 w-11/12" />
                  <Bone className="h-3 w-28 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

async function BlogContent({ locale }: { locale: string }) {
  const t = await getTranslations('blog')
  const [posts, categories] = await Promise.all([
    getAllPosts(locale),
    getAllCategories(locale),
  ])

  return (
    <>
      <div className="pt-10 pb-10">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 flex items-start justify-between gap-8">
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

      <div className="pb-16 flex-1">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
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
    </>
  )
}

export default async function BlogPage() {
  const locale = await getLocale()
  return (
    <>
      <Header />
      <main className="bg-bg-primary flex-1 flex flex-col pt-[104px]">
        <Suspense fallback={<BlogSkeleton />}>
          <BlogContent locale={locale} />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
