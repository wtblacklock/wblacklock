import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClientLayout } from './client-layout'

const inter = Inter({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

const SITE_URL = 'https://wblacklock.com'
const TITLE = 'William Blacklock — Design, AI & Systems'
const DESCRIPTION =
  'Designer and creative operator in Austin, TX. Fifteen years across brand, ' +
  'campaigns, product and DesignOps — for IBM, the Jacksonville Jaguars, MLB, ' +
  'Fox and others.'

export const metadata: Metadata = {
  // Required so og:image and canonical URLs resolve absolutely — relative ones
  // are ignored by most link unfurlers.
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: '%s — William Blacklock',
  },
  description: DESCRIPTION,
  applicationName: 'William Blacklock',
  authors: [{ name: 'William Blacklock', url: SITE_URL }],
  creator: 'William Blacklock',
  keywords: [
    'William Blacklock', 'designer', 'Austin', 'DesignOps', 'creative direction',
    'brand design', 'campaign design', 'product design', 'AI design',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'William Blacklock',
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    // No `creator` handle set — add your X/Twitter @handle here if you want
    // posts attributed to you on that platform.
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
