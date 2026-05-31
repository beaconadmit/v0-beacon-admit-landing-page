import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://beaconadmit.com'),
  title: 'Beacon Admit | 24/7 AI Admissions Coordinator for Behavioral Health',
  description: 'Never miss a treatment inquiry after hours again. Beacon Admit is a 24/7 AI admissions coordinator built for behavioral health, detox, residential, PHP, and IOP programs.',
  generator: 'v0.app',
  keywords: ['behavioral health', 'admissions', 'AI', 'treatment center', 'detox', 'residential treatment', 'PHP', 'IOP', 'after hours', 'HIPAA'],
  openGraph: {
    title: 'Beacon Admit | 24/7 AI Admissions Coordinator',
    description: 'Never miss a treatment inquiry after hours again. AI-powered admissions coverage for behavioral health programs.',
    url: 'https://beaconadmit.com',
    type: 'website',
    siteName: 'Beacon Admit',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beacon Admit | 24/7 AI Admissions Coordinator',
    description: 'Never miss a treatment inquiry after hours again.',
  },
  icons: {
    icon: [
      {
        url: '/beacon_admit_favicon.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/beacon_admit_favicon.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0B2B5E',
  width: 'device-width',
  initialScale: 1,
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Beacon Admit",
  applicationCategory: "HealthcareApplication",
  description: "24/7 AI Admissions Coordinator for Behavioral Health facilities. Never miss a treatment inquiry after hours.",
  url: "https://beaconadmit.com",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  operatingSystem: "Web",
  creator: {
    "@type": "Organization",
    name: "Agile AI Lab",
    url: "https://agileailab.org",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable} bg-background`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <SpeedInsights />
      </body>
    </html>
  )
}
