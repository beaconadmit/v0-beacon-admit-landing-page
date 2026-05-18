"use client"

import { ArrowRight, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeroSectionProps {
  onTalkToAgent: () => void
}

export function HeroSection({ onTalkToAgent }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              24/7 AI Admissions Coverage
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
              Never Miss a Treatment Inquiry After Hours Again
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Beacon Admit is a 24/7 AI admissions coordinator built for behavioral health, detox, residential, PHP, and IOP programs. It answers calls, captures inquiry details, screens for fit, and routes qualified admissions opportunities to your team in real time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button size="lg" asChild className="gap-2">
                <Link href="#demo">
                  Book a Live Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" onClick={onTalkToAgent} className="gap-2">
                <Play className="w-4 h-4" />
                See How It Works
              </Button>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Built for behavioral health admissions workflows. Human handoff, escalation rules, call summaries, and compliance-conscious intake design.
            </p>
          </div>

          {/* Right: Sample Alert Card */}
          <div className="relative lg:pl-8">
            <div className="relative bg-card border border-border rounded-2xl p-6 shadow-2xl animate-pulse-glow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-primary">New Admissions Inquiry</span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Caller</span>
                    <p className="text-foreground font-medium">Mother seeking detox for son</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Substance</span>
                    <p className="text-foreground font-medium">Alcohol</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Insurance</span>
                    <p className="text-foreground font-medium">Blue Cross PPO</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location</span>
                    <p className="text-foreground font-medium">Los Angeles, CA</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-muted-foreground text-sm">Urgency</span>
                      <p className="text-orange-400 font-semibold">Same day</p>
                    </div>
                    <div className="text-right">
                      <span className="text-muted-foreground text-sm">Risk Flag</span>
                      <p className="text-red-400 font-semibold">Currently intoxicated</p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                  <span className="text-xs text-muted-foreground">Recommended Action</span>
                  <p className="text-primary font-medium text-sm mt-1">Immediate admissions callback</p>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-card border border-border rounded-lg p-3 shadow-lg">
              <div className="text-xs text-muted-foreground">Response Time</div>
              <div className="text-2xl font-bold text-primary">&lt;30s</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
