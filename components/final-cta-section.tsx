"use client"

import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface FinalCTASectionProps {
  onTalkToAgent: () => void
}

export function FinalCTASection({ onTalkToAgent }: FinalCTASectionProps) {
  return (
    <section className="py-16 lg:py-24 bg-secondary border-y border-border">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold text-foreground leading-[1.2] text-balance">
            Ready to Recover More Admissions Calls?
          </h2>
          <p className="mt-6 text-base text-muted-foreground leading-relaxed">
            See how Beacon Admit answers every call, captures inquiry details, and routes qualified opportunities to your team in real time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              size="lg" 
              onClick={onTalkToAgent} 
              className="gap-2 h-12 px-8 bg-accent hover:bg-[oklch(0.45_0.10_185)] text-accent-foreground text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
            >
              <Phone className="w-4 h-4" />
              Try the AI Agent
            </Button>
            <Button size="lg" variant="outline" asChild className="gap-2 h-12 px-8 border-primary text-primary hover:bg-[oklch(0.28_0.08_250/0.15)] text-base transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20">
              <Link href="#demo">
                Get Early Access
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">
            Built for small and mid-sized behavioral health programs that need 24/7 admissions coverage without building a full call center.
          </p>
        </div>
      </div>
    </section>
  )
}
