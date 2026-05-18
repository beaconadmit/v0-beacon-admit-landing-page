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
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-background to-background" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse-soft" />
              24/7 AI Admissions Coverage
            </div>

            <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold text-foreground leading-[1.15] text-balance">
              Never Miss a Treatment Inquiry After Hours Again
            </h1>

            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Beacon Admit is a 24/7 AI admissions coordinator built for behavioral health, detox, residential, PHP, and IOP programs. It answers calls, captures inquiry details, screens for fit, and routes qualified admissions opportunities to your team in real time.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button size="lg" asChild className="gap-2 h-12 px-8 bg-primary hover:bg-primary/90 text-base">
                <Link href="#demo">
                  Book a Live Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={onTalkToAgent} 
                className="gap-2 h-12 px-8 border-accent text-accent hover:bg-accent/10 text-base"
              >
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
            <div className="relative bg-card border border-border rounded-xl p-6 shadow-lg shadow-foreground/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-success animate-pulse-soft" />
                <span className="text-sm font-semibold text-accent">New Admissions Inquiry</span>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs uppercase tracking-wide">Caller</span>
                    <p className="text-foreground font-medium mt-0.5">Mother seeking detox for son</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs uppercase tracking-wide">Substance</span>
                    <p className="text-foreground font-medium mt-0.5">Alcohol</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs uppercase tracking-wide">Insurance</span>
                    <p className="text-foreground font-medium mt-0.5">Blue Cross PPO</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs uppercase tracking-wide">Location</span>
                    <p className="text-foreground font-medium mt-0.5">Los Angeles, CA</p>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-muted-foreground text-xs uppercase tracking-wide">Urgency</span>
                      <p className="text-warning font-semibold mt-0.5">Same day</p>
                    </div>
                    <div className="text-right">
                      <span className="text-muted-foreground text-xs uppercase tracking-wide">Risk Flag</span>
                      <p className="text-destructive font-semibold mt-0.5">Currently intoxicated</p>
                    </div>
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">Recommended Action</span>
                  <p className="text-accent font-semibold text-sm mt-0.5">Immediate admissions callback</p>
                </div>
              </div>
            </div>

            {/* Floating response time badge */}
            <div className="absolute -top-4 -right-4 bg-card border border-border rounded-lg p-3 shadow-md">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Response Time</div>
              <div className="text-2xl font-bold text-accent">&lt;30s</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
