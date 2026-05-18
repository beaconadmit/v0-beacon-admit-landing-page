"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { SolutionSection } from "@/components/solution-section"
import { BehavioralHealthSection } from "@/components/behavioral-health-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { UseCasesSection } from "@/components/use-cases-section"
import { ComplianceSection } from "@/components/compliance-section"
import { ROICalculator } from "@/components/roi-calculator"
import { FounderSection } from "@/components/founder-section"
import { FAQSection } from "@/components/faq-section"
import { DemoFormSection } from "@/components/demo-form-section"
import { FinalCTASection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"
import { RetellCallModal } from "@/components/retell-call-modal"

export default function Home() {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false)

  const handleTalkToAgent = () => {
    setIsCallModalOpen(true)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar onTalkToAgent={handleTalkToAgent} />
      
      {/* 1. Hero */}
      <HeroSection onTalkToAgent={handleTalkToAgent} />
      
      {/* 2. Problem */}
      <ProblemSection />
      
      {/* 3. Solution */}
      <SolutionSection />
      
      {/* 4. Built for Behavioral Health */}
      <BehavioralHealthSection />
      
      {/* 5. How It Works */}
      <HowItWorksSection />
      
      {/* 6. Use Cases */}
      <UseCasesSection />
      
      {/* 7. Compliance & Safety */}
      <ComplianceSection />
      
      {/* 8. ROI Calculator */}
      <ROICalculator />
      
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

      {/* Retell Call Modal */}
      <RetellCallModal 
        isOpen={isCallModalOpen} 
        onClose={() => setIsCallModalOpen(false)} 
      />
    </main>
  )
}
