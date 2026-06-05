"use client"

import { useState, useCallback } from "react"
import { Phone, Shield, Clock, Heart, Brain, Pill, Activity, Terminal, ShieldCheck, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/** Profile key matching the API route's AGENT_ID_MAP */
export type AgentProfile = "afterhours" | "full-admissions" | "custom-agent"

interface AgentProfileData {
  key: AgentProfile
  channel: string
  frequency: string
  systemId: string
  label: string
  icon: typeof Pill
  title: string
  subtitle: string
  description: string
  capabilities: string[]
  sampleGreeting: string
  color: string
}

const AGENT_PROFILES: AgentProfileData[] = [
  {
    key: "afterhours",
    channel: "CH_01",
    frequency: "142.8 MHz",
    systemId: "AFTER_HOURS_v3.2",
    label: "After Hours",
    icon: Clock,
    title: "After Hours Intake Specialist",
    subtitle: "Extended coverage & weekend support",
    description:
      "Handles urgent after-hours calls with empathy and speed. Collects caller details, assesses urgency, and schedules next steps with your team for first thing Monday morning.",
    capabilities: [
      "After-hours & weekend intake",
      "Urgency-level assessment",
      "Call scheduling & follow-up",
      "Staff notification routing",
    ],
    sampleGreeting:
      "\"Hi, this is Beacon Admit calling. I understand you're reaching out outside regular hours. I can help gather the details and ensure this gets to the right team first thing. Can you tell me a bit about what's needed?\"",
    color: "oklch(0.52 0.10 185)", // Match clinical teal accent
  },
  {
    key: "full-admissions",
    channel: "CH_02",
    frequency: "210.4 MHz",
    systemId: "FULL_ADMISSIONS_v1.9",
    label: "Full Admissions",
    icon: Building2,
    title: "Full Admissions Coordinator",
    subtitle: "Complete intake & admissions workflow",
    description:
      "Manages complete admissions process from initial inquiry through bed placement. Gathers insurance details, runs eligibility checks, coordinates with payers, and confirms admission details.",
    capabilities: [
      "Full intake & insurance verification",
      "Eligibility & coverage checks",
      "Bed availability coordination",
      "Admission scheduling",
    ],
    sampleGreeting:
      "\"Hello, thank you for contacting us. I'm here to help complete your admissions process. I'll need to verify insurance, check bed availability, and get you scheduled. May I have a few minutes to gather some information?\"",
    color: "oklch(0.45 0.08 200)", // Lighter steel blue
  },
  {
    key: "custom-agent",
    channel: "CH_03",
    frequency: "320.1 MHz",
    systemId: "CUSTOM_AGENT_v2.5",
    label: "Custom Agent",
    icon: Terminal,
    title: "Custom Agent Builder",
    subtitle: "Tailored to your facility's needs",
    description:
      "Demonstrates how Beacon Admit can be customized for your specific programs, workflows, and integration requirements. Built dynamically based on your facility's unique configuration.",
    capabilities: [
      "Custom workflow automation",
      "EHR/EMR integration",
      "Program-specific scripts",
      "Multi-location routing",
    ],
    sampleGreeting:
      "\"Hi, this is your custom Beacon Admit agent. I've been configured specifically for [Facility Name] to handle your unique intake process. Let me walk you through how we can streamline your admissions today.\"",
    color: "oklch(0.35 0.06 250)", // Deep slate blue
  },
]

interface AgentPreviewSectionProps {
  onStartCall: (profile: AgentProfile) => void
}

/**
 * Agent Preview section — interactive profile selector.
 * Users pick Detox, IOP, or Mental Health, see contextual details,
 * and can launch a Retell demo call with the matching agent.
 */
export function AgentPreviewSection({ onStartCall }: AgentPreviewSectionProps) {
  const [activeProfile, setActiveProfile] = useState<AgentProfile>("afterhours")

  const active = AGENT_PROFILES.find((p) => p.key === activeProfile)!
  const ActiveIcon = active.icon

  const handleStartCall = useCallback(() => {
    onStartCall(activeProfile)
  }, [activeProfile, onStartCall])

  return (
    <section
      id="agents"
      className="py-20 lg:py-32 relative overflow-hidden bg-background border-t border-border"
    >
      {/* Precision Telemetry Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(26,139,139,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26,139,139,0.15) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
      
      {/* Decorative Technical Crosshairs */}
      <div className="absolute top-8 left-8 w-4 h-4 border-t border-l border-accent/20 pointer-events-none" />
      <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-accent/20 pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-accent/20 pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-accent/20 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-accent/10 border border-accent/20 text-accent font-mono text-[10px] tracking-wider mb-4 uppercase">
            <Terminal className="w-3.5 h-3.5" />
            [ACTIVE_VOICE_DEMO_POOL]
          </div>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-extrabold text-primary leading-[1.1] text-balance mb-5 tracking-tight">
            Hear How <span className="gradient-text">Each Agent</span> Handles Calls
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Select an intake channel below to review simulated workflows and launch a live audio stream demonstration.
          </p>
        </div>

        {/* ── Console Channel Selector Tabs ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
          {AGENT_PROFILES.map((profile) => {
            const Icon = profile.icon
            const isActive = profile.key === activeProfile
            return (
              <button
                key={profile.key}
                onClick={() => setActiveProfile(profile.key)}
                className={cn(
                  "relative flex flex-col items-start p-4 text-left border rounded-lg transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-white border-accent shadow-md ring-1 ring-accent/30"
                    : "bg-white/60 border-border/70 hover:bg-white hover:border-accent/30 hover:shadow-sm"
                )}
                aria-pressed={isActive}
              >
                {/* Active Indicator LED */}
                {isActive && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-0.5 rounded bg-success/10 border border-success/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-ring" />
                    <span className="text-[8px] font-mono font-bold text-success tracking-wider">SELECTED</span>
                  </div>
                )}
                
                {!isActive && (
                  <span className="absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                )}

                <div className="font-mono text-[9px] text-muted-foreground/80 tracking-widest uppercase mb-1">
                  [{profile.channel} // {profile.frequency}]
                </div>
                
                <div className="flex items-center gap-2 mt-2">
                  <div 
                    className="w-7 h-7 rounded flex items-center justify-center shrink-0"
                    style={{ background: isActive ? `color-mix(in oklch, ${profile.color} 12%, transparent)` : "var(--muted)" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: isActive ? profile.color : "var(--muted-foreground)" }} />
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-primary tracking-tight">{profile.label}</div>
                    <div className="text-[9px] font-mono text-muted-foreground uppercase">{profile.systemId}</div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* ── Active Profile Technical Console ── */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card border border-border/80 rounded-xl overflow-hidden shadow-xl">
            
            {/* System Status Frame Header */}
            <div className="bg-muted/30 border-b border-border/60 px-5 py-3 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] text-muted-foreground/85">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-primary font-bold">
                  <Terminal className="w-3.5 h-3.5 text-accent" />
                  CONSOLE: {active.systemId}
                </span>
                <span className="hidden md:inline text-border">|</span>
                <span className="hidden md:inline">LLM: CLINICAL_VOICE_v4</span>
                <span className="hidden md:inline text-border">|</span>
                <span className="hidden md:inline">PORT: AUDIO_INTAKE_SECURE</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-accent" />
                  LATENCY: ~120ms
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-success" />
                  BUF: OPTIMIZED
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-[1fr_340px] divide-y md:divide-y-0 md:divide-x divide-border/60">
              {/* Left: Intake Diagnostic Specs */}
              <div className="p-6 lg:p-8 space-y-6">
                
                {/* Profile Header */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-lg grid place-items-center shrink-0 border border-accent/20"
                    style={{ background: `color-mix(in oklch, ${active.color} 10%, transparent)` }}
                  >
                    <ActiveIcon className="w-6 h-6" style={{ color: active.color }} />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-primary tracking-tight leading-tight">{active.title}</h3>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5 uppercase tracking-wide">ROLE: {active.subtitle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">{active.description}</p>

                {/* Capabilities Grid */}
                <div className="space-y-3">
                  <h4 className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">[DIAGNOSTIC_ABILITIES]</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {active.capabilities.map((cap) => (
                      <div 
                        key={cap} 
                        className="flex items-center justify-between p-2.5 rounded border border-border/50 bg-muted/10 font-bold text-xs"
                      >
                        <span className="text-primary tracking-tight">{cap}</span>
                        <span className="text-[9px] font-mono text-accent uppercase bg-accent/5 px-1.5 py-0.5 rounded border border-accent/10">
                          [OK]
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample greeting / transcription */}
                <div className="space-y-2">
                  <h4 className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">[SPEECH_SYNTHESIS_LOG]</h4>
                  <div className="p-4 rounded border border-border bg-muted/20 relative font-mono text-xs leading-relaxed text-primary">
                    {/* Visual waveform decoration inside text box */}
                    <div className="absolute top-2 right-3 opacity-20">
                      <Activity className="w-4 h-4 text-accent" />
                    </div>
                    <div className="text-[8px] text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      Hope (Synthetic Coordinator Voice):
                    </div>
                    <p className="italic text-muted-foreground">{active.sampleGreeting}</p>
                  </div>
                </div>
              </div>

              {/* Right: Audio Waveform & Start Call Panel */}
              <div className="dark-gradient-panel results-telemetry-grid p-6 lg:p-8 flex flex-col justify-between items-center text-center">
                
                {/* Precision Equalizer Core */}
                <div className="w-full flex-1 flex flex-col justify-center items-center py-6">
                  <div className="w-20 h-20 rounded-full border border-white/10 bg-white/5 flex items-center justify-center mb-6 relative shadow-inner">
                    {/* Pulsing ring outer */}
                    <div className="absolute inset-0 rounded-full border border-accent/30 animate-pulse-soft scale-110" />
                    
                    <div className="voice-bars" aria-hidden="true">
                      {[18, 36, 50, 28, 40].map((h, i) => (
                        <span
                          key={i}
                          style={{
                            height: h,
                            animationDelay: `${i * 0.12}s`,
                            background: `linear-gradient(180deg, white, ${active.color})`,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  <h4 className="text-white font-extrabold text-lg tracking-tight mb-2">Initialize Audio Stream</h4>
                  <p className="text-white/50 text-xs mb-8 max-w-[240px] leading-relaxed">
                    Test the {active.label} agent's interactive speech engine in real-time on this device.
                  </p>

                  <Button
                    size="lg"
                    onClick={handleStartCall}
                    className="w-full gap-2 h-[52px] bg-gradient-to-r from-accent to-[oklch(0.45_0.10_185)] hover:from-[oklch(0.55_0.12_180)] hover:to-[oklch(0.48_0.11_182)] text-white font-bold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent/20 border-t border-white/20 font-mono text-xs uppercase tracking-wider"
                  >
                    <Phone className="w-4 h-4" />
                    [LAUNCH_DEMO_CALL]
                  </Button>
                </div>

                {/* Diagnostic badges for transfer protocol */}
                <div className="w-full pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-4 text-[9px] font-mono text-white/40">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                    [SECURE_AES_256]
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-accent" />
                    [EST_TIME: ~2MIN]
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
