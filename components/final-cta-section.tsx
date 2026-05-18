"use client"

import { ArrowRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface FinalCTASectionProps {
  onTalkToAgent: () => void
}

export function FinalCTASection({ onTalkToAgent }: FinalCTASectionProps) {
  return (
    <section className="py-20 lg:py-32 bg-primary/5 border-y border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Ready to Stop Losing Admissions Calls?
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            See how Beacon Admit can help your team answer faster, qualify more inquiries, and recover missed opportunities after hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" asChild className="gap-2">
              <Link href="#demo">
                Book a Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" onClick={onTalkToAgent} className="gap-2">
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
