import { 
  Phone, 
  ClipboardList, 
  Bell, 
  UserCheck, 
  FileText, 
  MessageSquare,
  Activity
} from "lucide-react"

const features = [
  {
    icon: Phone,
    code: "SYS-247",
    status: "ACTIVE",
    title: "24/7 Call Answering",
    description: "Instantly capture admissions inquiries after hours, during lunch breaks, weekends, holidays, and staff overflow peak periods.",
    footerLeft: "CONN_LATENCY // 0.2s",
    footerRight: "SECURE_BAA"
  },
  {
    icon: ClipboardList,
    code: "SYS-INTK",
    status: "ACTIVE",
    title: "Admissions-Focused Intake",
    description: "Capture critical intake variables: caller relationship, presenting issue, substance/mental health concern, location, payer details, and urgency level.",
    footerLeft: "VAL_RULE // CUSTOM_RULES",
    footerRight: "HIPAA_ENFORCED"
  },
  {
    icon: Bell,
    code: "SYS-ALRT",
    status: "ROUTED",
    title: "Real-Time Telemetry Alerts",
    description: "Transmit screened caller profiles and telemetry reports directly to your admissions team via SMS, email, CRM integration, or dashboard.",
    footerLeft: "ALERT_TRIG // LIVE_QUEUE",
    footerRight: "JSON_PAYLOAD"
  },
  {
    icon: UserCheck,
    code: "SYS-HAND",
    status: "ENFORCED",
    title: "Human Handoff Protocols",
    description: "Execute automatic live-transfer rules for urgent clinical crises, high-intent admissions, or callers requesting active staff connection.",
    footerLeft: "ROUTING_PATH // URGENT_CARE",
    footerRight: "PROTO_DIRECT"
  },
  {
    icon: FileText,
    code: "SYS-SUMM",
    status: "ACTIVE",
    title: "Structured Call Summaries",
    description: "Receive clinically structured summaries, pre-screened insurance cards, and full call transcripts before your admissions representative rings back.",
    footerLeft: "PARSER // AI_INTAKE",
    footerRight: "EMR_READY"
  },
  {
    icon: MessageSquare,
    code: "SYS-AUTO",
    status: "ACTIVE",
    title: "Consent Follow-Up Automation",
    description: "Trigger outbound SMS or email follow-ups for inquiries that did not result in an immediate intake or require additional program brochures.",
    footerLeft: "DISPATCH // OPT_IN",
    footerRight: "SMS_GATEWAY"
  },
]

export function SolutionSection() {
  return (
    <section 
      id="solution" 
      className="py-16 lg:py-24 bg-background relative overflow-hidden border-t border-border"
      style={{
        background: `
          linear-gradient(rgba(26,139,139,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(26,139,139,0.015) 1px, transparent 1px),
          linear-gradient(180deg, var(--card), var(--background))
        `,
        backgroundSize: '32px 32px, 32px 32px, 100% 100%',
      }}
    >
      {/* Visual Telemetry Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none results-telemetry-grid" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Unified 2-Column Header & Diagnostics */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
          <div className="lg:col-span-7">
            <span className="eyebrow block mb-3">[SYSTEM_CAPABILITIES // INTAKE_ENGINE]</span>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-foreground leading-[1.15] tracking-tight text-balance">
              A 24/7 Admissions Front Door for Your Facility
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Beacon Admit deploys a high-fidelity AI intake coordinator trained explicitly around your facility's services, clinical criteria, payor rules, and escalation protocols.
            </p>
          </div>
          
          <div className="lg:col-span-5 self-stretch">
            {/* Diagnostics Readout Panel */}
            <div className="p-5 rounded-lg bg-card/60 border border-border/70 backdrop-blur-sm relative overflow-hidden flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center justify-between border-b border-border/40 pb-2 mb-3 font-mono text-[9px]">
                  <span className="text-accent font-bold">[SYS-DIAGNOSTICS // STATUS_LOG]</span>
                  <span className="text-success font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    ONLINE
                  </span>
                </div>
                <div className="space-y-2 font-mono text-[10px] text-muted-foreground">
                  <div className="flex justify-between items-center">
                    <span>HIPAA // BAA_CONTRACT</span>
                    <span className="text-foreground font-bold">[VERIFIED]</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>INQUIRY_CAPTURE_RATE</span>
                    <span className="text-foreground font-bold">100.0%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>TELEMETRY_LATENCY</span>
                    <span className="text-foreground font-bold">0.18s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>ROUTING_SUCCESS</span>
                    <span className="text-foreground font-bold">99.9%</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-2 border-t border-border/20 flex items-center justify-between text-[9px] text-muted-foreground/50 font-mono">
                <span>NODE_ID: BCN-INTK-09a</span>
                <span>SECURE_DATA: ESTABLISHED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div 
                key={index}
                className="group p-6 rounded-lg bg-card border border-border/70 hover:border-accent/30 transition-all duration-200 hover:shadow-md hover:shadow-accent/5 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Accent line on hover */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                
                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-3 mb-4">
                    <span className="font-mono text-[10px] text-accent font-bold tracking-wider">
                      [{feature.code}]
                    </span>
                    {feature.status === "ACTIVE" && (
                      <span className="font-mono text-[8px] font-bold text-success bg-success/5 border border-success/15 px-1.5 py-0.5 rounded flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                        ACTIVE
                      </span>
                    )}
                    {feature.status === "ROUTED" && (
                      <span className="font-mono text-[8px] font-bold text-accent bg-accent/5 border border-accent/15 px-1.5 py-0.5 rounded flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        ROUTED
                      </span>
                    )}
                    {feature.status === "ENFORCED" && (
                      <span className="font-mono text-[8px] font-bold text-primary bg-primary/5 border border-primary/15 px-1.5 py-0.5 rounded flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        ENFORCED
                      </span>
                    )}
                  </div>

                  {/* Title and Icon */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-accent/[0.06] border border-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/[0.10] group-hover:border-accent/25 transition-colors">
                      <Icon className="w-4 h-4 text-accent" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground leading-snug tracking-tight">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Card Footer Telemetry */}
                <div className="mt-6 pt-3 border-t border-border/20 flex items-center justify-between text-[9px] text-muted-foreground/45 font-mono">
                  <span className="flex items-center gap-1">
                    <Activity className="w-2.5 h-2.5 text-accent animate-pulse-soft" />
                    {feature.footerLeft}
                  </span>
                  <span>{feature.footerRight}</span>
                </div>

              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}

