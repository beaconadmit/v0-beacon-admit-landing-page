import type { Metadata, Viewport } from 'next'
import { Outfit, Plus_Jakarta_Sans, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Script from 'next/script'
import './globals.css'

const outfit = Outfit({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-outfit',
})

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-plus-jakarta',
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

const jsonLd = [
  {
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
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is Beacon Admit HIPAA compliant?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All data is encrypted in transit and at rest. We sign BAAs with every facility and never store PHI beyond the minimum necessary for intake routing.",
        },
      },
      {
        "@type": "Question",
        name: "Does Beacon Admit replace human admissions staff?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Beacon Admit handles after-hours and overflow calls, collects intake context, and attempts warm handoffs. Your admissions team remains in control of all admission decisions.",
        },
      },
      {
        "@type": "Question",
        name: "What types of facilities does Beacon Admit support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Beacon Admit is built for detox, residential, PHP, IOP, outpatient, mental health, and dual-diagnosis programs.",
        },
      },
      {
        "@type": "Question",
        name: "How does the AI agent handle urgent or crisis calls?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Beacon Admit includes configurable escalation scripts. For urgent concerns, it follows your facility's protocols to route calls to on-call staff or emergency services immediately.",
        },
      },
    ],
  },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakarta.variable} ${geistMono.variable} bg-background`}>
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
        <Script
          id="retell-widget"
          src="https://dashboard.retellai.com/retell-widget.js"
          type="module"
          strategy="lazyOnload"
          data-public-key={process.env.NEXT_PUBLIC_RETELL_PUBLIC_KEY || 'public_key_6a7d0e0da4e7b953cc009'}
          data-agent-id="agent_3a6c9af5e44128c99fb6abc2fa"
        />
      </body>
    </html>
  )
}
