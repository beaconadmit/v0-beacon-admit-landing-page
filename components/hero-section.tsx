"use client"

import { ArrowRight, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface HeroSectionProps {
  onTalkToAgent: () => void
}

/** Voice wave bar heights and animation delays matching the mockup console */
const WAVE_BARS = [
  { height: 24, delay: "0.05s" },
  { height: 46, delay: "0.12s" },
  { height: 66, delay: "0.19s" },
  { height: 38, delay: "0.26s" },
  { height: 74, delay: "0.33s" },
  { height: 54, delay: "0.40s" },
  { height: 28, delay: "0.47s" },
  { height: 60, delay: "0.54s" },
  { height: 34, delay: "0.61s" },
] as const

/** Intake fields shown in the call console */
const CALL_FIELDS = [
  { label: "Caller intent", value: "Needs detox tonight" },
  { label: "Insurance", value: "Commercial PPO collected" },
  { label: "Facility fit", value: "Likely fit for your program" },
  { label: "Urgency", value: "Staff follow-up recommended" },
] as const

/** Micro-trust badges below hero CTAs */
const TRUST_BADGES = [
  "Configurable human handoff",
  "Minimum-necessary intake fields",
  "Escalation scripts for urgent concerns",
  "CRM or admissions queue routing",
] as const

/**
 * Hero section with two-column layout:
 * Left — headline, copy, CTAs, trust disclaimer, micro-trust badges
 * Right — animated call console with voice bars, floating metric/alert cards
 */
export function HeroSection({ onTalkToAgent }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Multi-layer gradient background with telemetry grid */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(rgba(26,139,139,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,139,139,0.04) 1px, transparent 1px),
            linear-gradient(120deg, rgba(255,255,255,0.96), rgba(255,255,255,0.85) 50%, rgba(220,251,248,0.5)),
            linear-gradient(180deg, rgba(6,35,75,0.04), transparent 60%)
          `,
          backgroundSize: '32px 32px, 32px 32px, 100% 100%, 100% 100%',
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* ── Left Column: Copy ── */}
          <div className="max-w-xl">
            {/* Kicker badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-white/80 backdrop-blur-md border border-accent/20 text-accent text-sm font-extrabold mb-6 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-success animate-pulse-ring" />
              24/7 admissions coverage for behavioral health providers
            </div>

            <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold text-primary leading-[0.96] text-balance mb-7">
              Answer admissions calls when your{" "}
              <span className="gradient-text">team cannot.</span>
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed mb-7 max-w-[650px]">
              Beacon Admit answers after-hours detox, residential, IOP/PHP, and mental health inquiries, gathers intake context, collects payer details for staff review, and attempts a warm handoff while the caller is still ready to talk.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5 mb-7">
              <Button
                size="lg"
                asChild
                className="gap-2 h-[52px] px-6 bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground text-base font-extrabold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/20"
              >
                <Link href="#demo">
                  Request Facility Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                asChild
                variant="outline"
                className="gap-2 h-[52px] px-6 bg-white/80 backdrop-blur-md border-border text-primary text-base font-extrabold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
              >
                <Link href="#roi">
                  <Calculator className="w-4 h-4" />
                  Calculate Missed-Call Revenue
                </Link>
              </Button>
            </div>

            {/* Trust disclaimer */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-5 pl-4 border-l-[3px] border-accent/30 max-w-[660px]">
              Built for human-led admissions. Beacon Admit is not an emergency, crisis, or clinical service, and it does not diagnose, provide treatment advice, verify benefits, or make admission decisions.
            </p>

            {/* Micro-trust badges */}
            <div className="flex flex-wrap gap-2.5">
              {TRUST_BADGES.map((badge) => (
                <span
                  key={badge}
                  className="bg-white/75 border border-border/60 px-3 py-2 rounded-lg text-muted-foreground text-sm font-bold shadow-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right Column: Call Console Visual ── */}
          <div className="relative lg:pl-8 pb-[180px] lg:pb-[200px]">
            {/* Call console card */}
            <div className="glass-card rounded-xl p-6 relative z-[2] lg:ml-auto max-w-[520px] border border-border/80 shadow-2xl">
              {/* Telemetry frame details */}
              <div className="absolute top-2.5 right-4 text-[9px] font-mono text-muted-foreground/60 tracking-widest pointer-events-none">
                SYS_REF: BCN-8809
              </div>

              {/* Console header */}
              <div className="flex items-center justify-between gap-3.5 mb-5 border-b border-border/40 pb-4">
                <div>
                  <p className="text-muted-foreground text-[10px] font-mono uppercase tracking-wider mb-0.5">
                    [LIVE_COORDINATOR_FEED]
                  </p>
                  <p className="text-primary font-extrabold text-lg tracking-tight">Hope | Admissions coordinator</p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-success/10 border border-success/20 text-success text-xs font-mono font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-ring" />
                  LIVE
                </div>
              </div>

              {/* Voice wave bars block */}
              <div className="mb-5">
                <div className="flex justify-between items-center px-1 mb-2 font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                  <span>[0.00s - 1.40s]</span>
                  <span>Gain: Auto</span>
                  <span>CH_01_INPUT</span>
                </div>

                <div
                  className="voice-bars h-[92px] rounded-lg border border-border/50 flex items-center justify-center"
                  style={{
                    background: `
                      linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.5)),
                      linear-gradient(135deg, rgba(24,182,178,0.12), rgba(21,87,168,0.06))
                    `,
                  }}
                  aria-hidden="true"
                >
                  {WAVE_BARS.map((bar, i) => (
                    <span
                      key={i}
                      style={{ height: bar.height, animationDelay: bar.delay }}
                    />
                  ))}
                </div>

                <div className="flex justify-between items-center px-1 mt-2 font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
                  <span>INTAKE_AGENT_VOICE</span>
                  <span>STT_LATENCY: 120ms</span>
                </div>
              </div>

              {/* Call fields grid */}
              <div className="grid gap-3 mb-5">
                {CALL_FIELDS.map((field, idx) => (
                  <div
                    key={field.label}
                    className="grid grid-cols-[140px_1fr] gap-3.5 items-center bg-white/60 border border-border/50 hover:border-accent/40 rounded-lg px-3.5 py-2.5 transition-colors duration-200"
                  >
                    <span className="font-mono text-xs text-muted-foreground uppercase tracking-tight">
                      {String(idx + 1).padStart(2, '0')}. {field.label}
                    </span>
                    <span className="text-primary font-bold text-sm">{field.value}</span>
                  </div>
                ))}
              </div>

              {/* Routing strip */}
              <div className="rounded-lg p-4 bg-primary text-white border border-primary/20 relative overflow-hidden flex items-center justify-between gap-4 shadow-md">
                {/* Accent glow effect */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--accent)_0%,transparent_60%)] opacity-30 pointer-events-none" />
                <div className="relative z-10">
                  <p className="text-white/60 font-mono text-[9px] uppercase tracking-widest mb-1">[SYS_DECISION]</p>
                  <p className="font-extrabold text-sm tracking-tight">Warm transfer to admissions</p>
                </div>
                <Button
                  asChild
                  variant="secondary"
                  size="sm"
                  className="relative z-10 bg-accent/20 hover:bg-accent/30 text-white border border-accent/40 font-mono text-xs tracking-wider"
                >
                  <Link href="#agents">INSPECT</Link>
                </Button>
              </div>
            </div>

            {/* Floating metric card — bottom-left */}
            <div className="hidden lg:block glass-card rounded-xl p-5 absolute left-0 bottom-0 w-[220px] z-[3] border border-border/70 shadow-xl">
              <div className="absolute top-2.5 right-3 font-mono text-[8px] text-muted-foreground/60 tracking-wider">
                [ROI_PROTECTED]
              </div>
              <p className="text-primary text-[2.15rem] font-extrabold leading-none mb-1 mt-1">$96K</p>
              <p className="text-muted-foreground text-xs font-bold leading-normal">
                potential monthly admissions revenue protected
              </p>
              <p className="text-success text-[10px] font-mono font-bold mt-2.5 uppercase tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
                LIVE_ESTIMATE
              </p>
            </div>

            {/* Floating alert card — bottom-right */}
            <div className="hidden lg:block glass-card rounded-xl p-4 absolute right-8 bottom-0 w-[240px] z-[3] border border-border/70 shadow-xl">
              <div className="absolute top-2.5 right-3 font-mono text-[8px] text-muted-foreground/60 tracking-wider">
                [SYS_ALERT]
              </div>
              <div className="w-8 h-8 rounded bg-warning/15 border border-warning/30 flex items-center justify-center text-warning font-mono font-bold text-sm mb-3 mt-1">
                !
              </div>
              <p className="text-primary font-extrabold text-sm mb-1 tracking-tight">New admissions inquiry</p>
              <p className="text-muted-foreground text-xs font-bold leading-normal">
                Agent collected details and attempted live transfer to on-call queue.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
