import { getTranslations, getLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PortableTextRenderer } from '@/components/blog/PortableTextRenderer'
import { PostCard } from '@/components/blog/PostCard'
import { getPostBySlug, getAllPostSlugs, getAllPosts, getAllCategories } from '@/lib/sanity/queries'
import { urlFor } from '@/lib/sanity/image'
import { Link } from '@/navigation'
import { WA_DIAGNOSTIC } from '@/lib/whatsapp'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export const revalidate = 3600 // posts mudam menos que o índice

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map(({ slug, language }) => ({
    locale: language === 'en' ? 'en' : 'pt',
    slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug, locale)
  if (!post) return {}

  const imageUrl = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : undefined

  return {
    title: `${post.title} — Nasus Digital`,
    description: post.excerpt,
    alternates: {
      canonical: locale === 'pt' ? `/blog/${slug}` : `/en/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      ...(imageUrl && { images: [{ url: imageUrl, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params
  const t = await getTranslations('blog')

  const post = await getPostBySlug(slug, locale)
  if (!post) notFound()

  const [allPosts, categories] = await Promise.all([
    getAllPosts(locale),
    getAllCategories(locale),
  ])
  const relatedPosts = allPosts
    .filter((p) => p._id !== post._id)
    .slice(0, 3)

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    locale === 'en' ? 'en-US' : 'pt-BR',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )

  const ctaLink = locale === 'en'
    ? 'https://calendly.com/nasus-digital/auditoria'
    : WA_DIAGNOSTIC

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Tiago Satur',
      url: 'https://nasus.digital',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Nasus Digital',
      url: 'https://nasus.digital',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': locale === 'pt' ? `https://nasus.digital/blog/${slug}` : `https://nasus.digital/en/blog/${slug}`,
    },
    ...(post.coverImage?.asset && {
      image: urlFor(post.coverImage).width(1200).height(630).url(),
    }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="bg-bg-primary pt-[104px]">
        {/* Post hero */}
        <article>
          <header className="pt-10 pb-12 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
              <Link
                href="/blog"
                className="text-sm text-text-muted hover:text-accent transition-colors duration-200 mb-6 block"
              >
                {t('backToBlog')}
              </Link>

              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.map((cat) => (
                    <Link
                      key={cat._id}
                      href={`/blog/categoria/${cat.slug.current}` as '/blog/categoria/[category]'}
                      className="text-xs font-mono uppercase tracking-wider text-accent bg-accent-muted px-2 py-0.5 rounded-sm hover:bg-accent hover:text-bg-primary transition-colors duration-200"
                    >
                      {cat.title}
                    </Link>
                  ))}
                </div>
              )}

              <h1 className="font-display text-4xl md:text-5xl text-text-primary leading-tight mb-6">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-lg text-text-secondary leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              )}

              <div className="flex items-center gap-4 text-sm text-text-muted">
                <span>
                  {t('authorBy')} <span className="text-text-primary font-medium">Tiago Satur</span>
                </span>
                <span>·</span>
                <time dateTime={post.publishedAt}>{formattedDate}</time>
                {post.readingTime && (
                  <>
                    <span>·</span>
                    <span>{t('readingTime', { minutes: post.readingTime })}</span>
                  </>
                )}
              </div>
            </div>
          </header>

          {post.coverImage?.asset && (
            <div className="w-full bg-bg-secondary">
              <div className="max-w-4xl mx-auto">
                <Image
                  src={urlFor(post.coverImage).width(1200).height(600).url()}
                  alt={post.coverImage.alt ?? post.title}
                  width={1200}
                  height={600}
                  className="w-full object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Body */}
          <div className="bg-bg-primary py-16 px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
              <PortableTextRenderer body={post.body} />

              {/* Author bio */}
              <div className="mt-16 pt-8 border-t border-border flex gap-4 items-start">
                <Image
                  src="/tiago.png"
                  alt="Tiago Satur"
                  width={56}
                  height={56}
                  className="rounded-full w-14 h-14 object-cover flex-shrink-0"
                />
                <div>
                  <p className="text-sm font-semibold text-text-primary">Tiago Satur</p>
                  <p className="text-sm text-text-secondary mt-1">
                    {locale === 'en'
                      ? 'Software engineer specialized in digital presence for independent practitioners.'
                      : 'Engenheiro de software especializado em presença digital para profissionais liberais.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* CTA */}
        <section className="bg-surface-terra px-6 md:px-12 lg:px-24 py-16" data-cursor-dark>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-text-inverse mb-3">
              {t('ctaTitle')}
            </h2>
            <p className="text-text-inverse-muted mb-8">{t('ctaDescription')}</p>
            <a
              href={ctaLink}
              target={locale === 'en' ? '_blank' : undefined}
              rel={locale === 'en' ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-white font-semibold px-8 py-3 rounded-sm transition-colors duration-200"
            >
              {t('ctaButton')}
            </a>
          </div>
        </section>

        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-bg-secondary px-6 md:px-12 lg:px-24 py-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-display text-2xl text-text-primary mb-8">
                {t('relatedPosts')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((p) => (
                  <PostCard key={p._id} post={p} locale={locale} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
