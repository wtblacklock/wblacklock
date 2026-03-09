import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClientLayout } from './client-layout'
import { BrandAnimationProvider } from '../contexts/BrandAnimationContext'

const inter = Inter({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export const metadata: Metadata = {
  title: 'William Blacklock - Portfolio',
  description: 'Portfolio of William Blacklock',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <BrandAnimationProvider>
          <ClientLayout>{children}</ClientLayout>
        </BrandAnimationProvider>
      </body>
    </html>
  )
}
