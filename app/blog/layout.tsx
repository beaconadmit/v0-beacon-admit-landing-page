import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Blog | Beacon Admit — AI Admissions Insights for Behavioral Health",
  description:
    "Expert insights on AI-powered admissions, after-hours coverage, HIPAA compliance, and revenue recovery for behavioral health treatment centers.",
  openGraph: {
    title: "Blog | Beacon Admit",
    description:
      "Expert insights on AI-powered admissions for behavioral health.",
    url: "https://beaconadmit.com/blog",
    type: "website",
    siteName: "Beacon Admit",
  },
}

/**
 * Blog layout — wraps all /blog routes with shared nav/footer chrome.
 */
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">{children}</main>
      <Footer />
    </>
  )
}
