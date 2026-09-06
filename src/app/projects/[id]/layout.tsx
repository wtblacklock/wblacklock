import type { Metadata } from 'next'
import { projects } from '../../../data/projects'

/**
 * The project page itself is a client component and cannot export metadata, so
 * this server layout supplies it. Each project unfurls with its own title,
 * summary and thumbnail rather than the generic site card.
 */
export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params
  const project = projects.find((p) => p.id === id)
  if (!project) return {}

  const title = `${project.title} — ${project.tagline}`
  const description = project.description

  return {
    title: `${project.title} — ${project.tagline}`,
    description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url: `/projects/${project.id}`,
      siteName: 'William Blacklock',
      images: project.thumbnail ? [{ url: project.thumbnail, alt: project.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: project.thumbnail ? [project.thumbnail] : undefined,
    },
  }
}

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }))
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
