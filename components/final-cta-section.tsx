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
            Ready to Stop Losing Admissions Calls?
          </h2>
          <p className="mt-6 text-base text-muted-foreground leading-relaxed">
            See how Beacon Admit can help your team answer faster, qualify more inquiries, and recover missed opportunities after hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" asChild className="gap-2 h-12 px-8 bg-primary hover:bg-primary/90 text-base">
              <Link href="#demo">
                Book a Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={onTalkToAgent} 
              className="gap-2 h-12 px-8 border-accent text-accent hover:bg-accent/10 text-base"
            >
              <Phone className="w-4 h-4" />
              Talk to Our AI Agent
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
