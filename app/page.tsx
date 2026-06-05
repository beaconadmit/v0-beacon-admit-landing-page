"use client"

import { useState, useMemo } from "react"
import { Play, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { TrustBanner } from "@/components/trust-banner"
import { ProblemSection } from "@/components/problem-section"
import { SolutionSection } from "@/components/solution-section"
import { BehavioralHealthSection } from "@/components/behavioral-health-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { ComplianceSection } from "@/components/compliance-section"
import { ROICalculator } from "@/components/roi-calculator"
import { AgentPreviewSection, type AgentProfile } from "@/components/agent-preview-section"
import { FounderSection } from "@/components/founder-section"
import { FAQSection } from "@/components/faq-section"
import { DemoFormSection } from "@/components/demo-form-section"
import { FinalCTASection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"
import { RetellCallModal } from "@/components/retell-call-modal"

export default function Home() {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState<AgentProfile | undefined>(undefined)

  /** Opens Retell modal without a profile (generic agent) */
  const handleTalkToAgent = () => {
    setSelectedProfile(undefined)
    setIsCallModalOpen(true)
  }

  /** Opens Retell modal with a specific profile from Agent Preview */
  const handleStartProfileCall = (profile: AgentProfile) => {
    setSelectedProfile(profile)
    setIsCallModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar onTalkToAgent={handleTalkToAgent} />

      {/* 1. Hero */}
      <HeroSection onTalkToAgent={handleTalkToAgent} />

      {/* 1b. Trust Banner */}
      <TrustBanner />

      {/* 2. Problem */}
      <ProblemSection />

      {/* 3. Solution */}
      <SolutionSection />

      {/* 4. Built for Behavioral Health */}
      <BehavioralHealthSection />

      {/* 5. ROI Calculator */}
      <ROICalculator />

      {/* 6. How It Works */}
      <HowItWorksSection />

      {/* 7. Agent Preview (replaces Use Cases) */}
      <AgentPreviewSection onStartCall={handleStartProfileCall} />

      {/* 8. Compliance & Safety */}
      <ComplianceSection />

      {/* 9. Founder Credibility */}
      <FounderSection />

      {/* 10. FAQ */}
      <FAQSection />

      {/* 11. Demo Form */}
      <DemoFormSection />

      {/* 12. Final CTA */}
      <FinalCTASection onTalkToAgent={handleTalkToAgent} />

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile CTA Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border p-3 flex gap-2">
        <Button
          onClick={handleTalkToAgent}
          className="flex-1 gap-2 h-11 bg-accent hover:bg-[oklch(0.45_0.10_185)] text-accent-foreground text-sm font-extrabold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
        >
          <Play className="w-4 h-4" />
          Try AI Demo
        </Button>
        <Button
          asChild
          variant="outline"
          className="flex-1 gap-2 h-11 border-primary text-primary hover:bg-[oklch(0.28_0.08_250/0.15)] text-sm font-extrabold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
        >
          <Link href="#demo">
            Get Early Access
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>

      {/* Retell Call Modal — profile-aware */}
      <RetellCallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        agentProfile={selectedProfile}
      />
    </main>
  )
}
