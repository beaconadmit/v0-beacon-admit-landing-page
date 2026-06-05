import { 
  Heart, 
  MessageCircle, 
  Building2, 
  Shield, 
  Stethoscope,
  AlertCircle
} from "lucide-react"

const differentiators = [
  { 
    icon: Heart, 
    code: "BCN-TONE", 
    title: "Empathetic Admissions Tone", 
    detail: "Warm, professional, patient-centric verbal pacing designed specifically for callers experiencing high-stress or crisis scenarios.",
    status: "SYS: ACTIVE"
  },
  { 
    icon: MessageCircle, 
    code: "BCN-FLOW", 
    title: "Structured Single-Question Intake", 
    detail: "Information gathered sequentially to reduce cognitive load, preventing caller fatigue and reducing drop-offs.",
    status: "SYS: ACTIVE"
  },
  { 
    icon: Building2, 
    code: "BCN-RULE", 
    title: "Facility Eligibility Engine", 
    detail: "Validates facility fit in real-time according to customized rules, local zip codes, and available beds.",
    status: "SYS: STABLE"
  },
  { 
    icon: Shield, 
    code: "BCN-PAYR", 
    title: "Insurance Pre-Screening", 
    detail: "Captures commercial insurance carriers, policy numbers, and self-pay readiness prior to staff handoff.",
    status: "SYS: ACTIVE"
  },
  { 
    icon: Stethoscope, 
    code: "BCN-ROUT", 
    title: "Care Placement Routing", 
    detail: "Categorizes clinical needs to recommend detox, residential, PHP, IOP, or outpatient placement structures.",
    status: "SYS: STABLE"
  },
  { 
    icon: AlertCircle, 
    code: "BCN-ESCL", 
    title: "Crisis Escalation Protocols", 
    detail: "Detects crisis triggers to instantly route callers to active human intervention or local emergency services.",
    status: "SYS: STABLE"
  },
]

export function BehavioralHealthSection() {
  return (
    <section className="py-16 lg:py-24 bg-background relative overflow-hidden border-t border-border">
      {/* Background visual detail */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none results-telemetry-grid" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left copy column */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <span className="eyebrow block mb-3">Telemetry Control Engine</span>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-foreground leading-[1.15] text-balance tracking-tight">
              Built Around Clinical Admissions Operations
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              Behavioral health admissions are different from normal lead capture. Callers may be scared, overwhelmed, intoxicated, calling for a loved one, or unsure what level of care they need.
            </p>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Beacon Admit is designed around empathetic, structured, one-question-at-a-time conversations that support your admissions process without replacing clinical judgment.
            </p>

            <div className="mt-8 p-5 rounded-lg bg-accent/[0.04] border border-accent/15 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider block">DISCLAIMER // PROTOCOL_01</span>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                    The AI is not a clinician and does not provide clinical advice, diagnoses, or direct treatment plans. It acts as an intake coordinator passing structured summaries to your licensed team.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right grid column */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {differentiators.map((item, index) => (
              <div 
                key={index}
                className="group p-5 rounded-lg bg-card border border-border/70 hover:border-accent/30 transition-all duration-200 hover:shadow-md hover:shadow-accent/5 flex flex-col justify-between"
              >
                <div>
                  {/* Card Telemetry Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-3 mb-4">
                    <span className="font-mono text-[10px] text-accent font-semibold tracking-wider">
                      [{item.code}]
                    </span>
                    <span className="font-mono text-[9px] text-muted-foreground/60 bg-muted px-1.5 py-0.5 rounded">
                      {item.status}
                    </span>
                  </div>

                  {/* Card Title & Icon */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-accent/[0.06] border border-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/[0.10] group-hover:border-accent/25 transition-colors">
                      <item.icon className="w-4 h-4 text-accent" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground leading-snug tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  {/* Card Detail */}
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                {/* Sub-indicator line */}
                <div className="mt-5 pt-3 border-t border-border/20 flex items-center justify-between text-[9px] text-muted-foreground/40 font-mono">
                  <span>SECURE_DATA_SSL</span>
                  <span>VER_1.0.8</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

