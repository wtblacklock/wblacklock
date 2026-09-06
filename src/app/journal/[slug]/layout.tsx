import type { Metadata } from 'next'
import { posts } from '../../../data/posts'

/**
 * Server layout supplying per-article metadata; the article page itself is a
 * client component.
 */
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `/journal/${post.slug}`,
      siteName: 'William Blacklock',
      publishedTime: post.date,
      authors: ['William Blacklock'],
      // Declaring `openGraph` here overrides the inherited root card, so the
      // site image has to be named explicitly or articles unfurl with no image.
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: ['/opengraph-image'],
    },
  }
}

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export default function JournalPostLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
