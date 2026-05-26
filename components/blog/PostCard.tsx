import Image from 'next/image'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import type { PostSummary } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/image'

interface PostCardProps {
  post: PostSummary
  locale: string
  variant?: 'featured' | 'editorial'
}

export function PostCard({ post, locale, variant = 'editorial' }: PostCardProps) {
  const t = useTranslations('blog')
  const href = `/blog/${post.slug.current}` as '/blog/[slug]'

  const formattedDate = new Date(post.publishedAt).toLocaleDateString(
    locale === 'en' ? 'en-US' : 'pt-BR',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )

  if (variant === 'featured') {
    const hasImage = Boolean(post.coverImage?.asset)
    return (
      <article className={`group relative bg-bg-card border border-border rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer ${hasImage ? 'grid grid-cols-1 md:grid-cols-[1fr_1.1fr]' : 'block'}`}>
        {/* Content */}
        <div className="flex flex-col justify-center p-8 md:p-12 gap-5 order-2 md:order-1">
          {post.categories && post.categories.length > 0 && (
            <div className="relative z-10 flex flex-wrap gap-2">
              {post.categories.map((cat) => (
                <span
                  key={cat.slug.current}
                  className="text-xs font-mono uppercase tracking-wider text-accent bg-accent-muted px-2 py-0.5 rounded-sm"
                >
                  {cat.title}
                </span>
              ))}
            </div>
          )}

          <h2 className="font-display text-3xl md:text-4xl text-text-primary leading-snug group-hover:text-accent transition-colors duration-200">
            {/* stretched link: after covers the entire card */}
            <Link
              href={href}
              className="after:absolute after:inset-0 after:content-[''] after:z-[1]"
            >
              {post.title}
            </Link>
          </h2>

          {post.excerpt && (
            <p className="text-base text-text-secondary leading-relaxed">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center gap-3 text-xs text-text-muted pt-2">
            <time dateTime={post.publishedAt}>{formattedDate}</time>
            {post.readingTime && (
              <>
                <span aria-hidden>·</span>
                <span>{t('readingTime', { minutes: post.readingTime })}</span>
              </>
            )}
          </div>

          <span className="relative z-10 inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:gap-3 transition-all duration-200" aria-hidden>
            {t('readMore')}
            <span>→</span>
          </span>
        </div>

        {/* Image */}
        {post.coverImage?.asset && (
          <div className="order-1 md:order-2 overflow-hidden bg-bg-secondary aspect-video md:aspect-auto min-h-[240px]">
            <Image
              src={urlFor(post.coverImage).width(800).height(600).url()}
              alt={post.coverImage.alt ?? post.title}
              width={800}
              height={600}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>
        )}
      </article>
    )
  }

  // Editorial variant (horizontal list item)
  return (
    <article className="group relative flex gap-5 md:gap-8 py-7 px-1 cursor-pointer">
      {post.coverImage?.asset && (
        <div className="flex-shrink-0 w-32 md:w-44 overflow-hidden rounded-sm bg-bg-secondary self-start">
          <div className="aspect-video overflow-hidden">
            <Image
              src={urlFor(post.coverImage).width(352).height(198).url()}
              alt=""
              width={352}
              height={198}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2 min-w-0 flex-1">
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {post.categories.map((cat) => (
              <span
                key={cat.slug.current}
                className="text-xs font-mono uppercase tracking-wider text-accent bg-accent-muted px-2 py-0.5 rounded-sm"
              >
                {cat.title}
              </span>
            ))}
          </div>
        )}

        <h2 className="font-display text-xl md:text-2xl text-text-primary leading-snug group-hover:text-accent transition-colors duration-200">
          <Link
            href={href}
            className="after:absolute after:inset-0 after:content-[''] after:z-[1]"
          >
            {post.title}
          </Link>
        </h2>

        {post.excerpt && (
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-4">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
          <time dateTime={post.publishedAt}>{formattedDate}</time>
          {post.readingTime && (
            <>
              <span aria-hidden>·</span>
              <span>{t('readingTime', { minutes: post.readingTime })}</span>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
