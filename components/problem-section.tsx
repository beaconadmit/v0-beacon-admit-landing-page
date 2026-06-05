import { PhoneMissed, AlertTriangle, Timer, ShieldAlert, TrendingDown } from "lucide-react"

const failureModes = [
  {
    code: "ERR-OFFHR",
    title: "Missed After-Hours Coverage",
    description: "Over 70% of mental health crises and outreach attempts occur outside standard 9-to-5 operating hours, leading directly to placed cases elsewhere.",
    status: "CRITICAL_LEAKAGE"
  },
  {
    code: "ERR-LATENCY",
    title: "Lead Latency Decay",
    description: "Inquiry decay happens exponentially. Follow-up times exceeding 15 minutes reduce patient intake conversion rates by 390%.",
    status: "INTEGRITY_FAIL"
  },
  {
    code: "ERR-UNSTRUCTURED",
    title: "Unstructured Intake Data",
    description: "Inconsistent call handling by non-specialized staff leads to incomplete payer, present issue, and clinical fit validation.",
    status: "DATA_INCOMPLETE"
  },
  {
    code: "ERR-RESOURCE",
    title: "Representative Time Burn",
    description: "Admissions teams spend up to 40% of their active shifts screening unqualified, out-of-network, or mismatched inquiries.",
    status: "EFFICIENCY_LOSS"
  }
]

export function ProblemSection() {
  return (
    <section 
      id="problem" 
      className="py-16 lg:py-24 bg-background relative overflow-hidden border-t border-border"
      style={{
        background: `
          linear-gradient(rgba(26,139,139,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(26,139,139,0.02) 1px, transparent 1px),
          linear-gradient(180deg, var(--background), var(--card))
        `,
        backgroundSize: '24px 24px, 24px 24px, 100% 100%',
      }}
    >
      {/* Visual Telemetry Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Unified 2-Column Header & Metrics */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16">
          {/* Left copy column */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <span className="eyebrow block mb-3">[DIAGNOSTICS // GAP_ANALYSIS]</span>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-foreground leading-[1.15] tracking-tight text-balance">
              The Financial & Operational Cost of Admissions Leakage
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              Admissions inquiries in behavioral health are highly time-sensitive. Standard answering services, delayed call-backs, and unqualified screening create immediate leakage in your intake pipeline.
            </p>
          </div>
          
          {/* Right metrics column */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            
            {/* Metric 1: 42% Access Failure */}
            <div className="flex flex-col justify-between p-5 rounded-lg bg-card border border-border/80 relative overflow-hidden group hover:border-destructive/30 transition-all duration-200">
              <div className="absolute top-0 left-0 w-1 h-full bg-destructive/60" />
              <div>
                <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-4 font-mono text-[9px]">
                  <span className="text-destructive font-bold">[SYS-METRIC // ACCESS_FAILURE]</span>
                  <span className="text-muted-foreground/60">SECTOR_STD</span>
                </div>
                <div className="flex items-baseline gap-2 font-mono">
                  <span className="text-4xl md:text-5xl font-bold text-destructive tracking-tighter">42.0%</span>
                  <span className="text-xs font-bold text-destructive flex items-center gap-1">
                    <TrendingDown className="w-3.5 h-3.5" />
                    [FAIL_RATE]
                  </span>
                </div>
                
                {/* Telemetry Visualizer Bar */}
                <div className="mt-4 p-2 bg-destructive/[0.04] border border-destructive/15 rounded font-mono text-[9px] text-destructive/90 flex items-center justify-between">
                  <span>SECTOR_LEAKAGE_INDEX</span>
                  <span className="tracking-tight">██████░░░░░░ 42%</span>
                </div>

                <p className="text-sm font-bold text-foreground mt-4 leading-snug">
                  First-Call Communication Breakdown
                </p>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Forty-two percent of individuals experiencing a mental health or substance use crisis who do not reach a provider on the first call never attempt contact again.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border/20 flex items-center justify-between text-[9px] text-muted-foreground/50 font-mono">
                <span>REPORT_REF: MENTAL HEALTH AMERICA</span>
                <span>YEAR: 2025</span>
              </div>
            </div>

            {/* Metric 2: <8m Response Window */}
            <div className="flex flex-col justify-between p-5 rounded-lg bg-card border border-border/80 relative overflow-hidden group hover:border-destructive/30 transition-all duration-200">
              <div className="absolute top-0 left-0 w-1 h-full bg-destructive/60" />
              <div>
                <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-4 font-mono text-[9px]">
                  <span className="text-destructive font-bold">[SYS-METRIC // RESPONSE_THRESHOLD]</span>
                  <span className="text-muted-foreground/60">DECAY_RATE</span>
                </div>
                <div className="flex items-baseline gap-2 font-mono">
                  <span className="text-4xl md:text-5xl font-bold text-destructive tracking-tighter">&lt;08:00m</span>
                  <span className="text-xs font-bold text-destructive flex items-center gap-1">
                    <Timer className="w-3.5 h-3.5" />
                    [DECAY_LMT]
                  </span>
                </div>

                {/* Telemetry Visualizer Bar */}
                <div className="mt-4 p-2 bg-destructive/[0.04] border border-destructive/15 rounded font-mono text-[9px] text-destructive/90 flex items-center justify-between">
                  <span>ENGAGEMENT_WINDOW_LIMIT</span>
                  <span className="tracking-tight">██████████░░ 83%</span>
                </div>

                <p className="text-sm font-bold text-foreground mt-4 leading-snug">
                  Competitor Engagement Window
                </p>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  In referral-heavy behavioral health markets, competing facilities capture and engage the same caller within under eight minutes, resulting in missed calls coded as "placed elsewhere."
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-border/20 flex items-center justify-between text-[9px] text-muted-foreground/50 font-mono">
                <span>REPORT_REF: BX HEALTH OPS AUDIT</span>
                <span>YEAR: 2026</span>
              </div>
            </div>

          </div>
        </div>

        {/* Operational Failure Modes (Grid) */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <ShieldAlert className="w-4 h-4 text-destructive/80 animate-pulse" />
            <h3 className="text-xs font-bold text-foreground uppercase tracking-widest font-mono">
              Operational Gaps & Answering Service Failure Modes
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {failureModes.map((item, index) => (
              <div 
                key={index}
                className="p-5 rounded-lg bg-card/60 border border-border/70 hover:border-destructive/20 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-border/40 pb-2 mb-3">
                    <span className="font-mono text-[9px] text-destructive font-bold tracking-wider">
                      [{item.code}]
                    </span>
                    <span className="font-mono text-[9px] text-destructive font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                      {item.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-foreground leading-snug group-hover:text-destructive transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resolution Banner */}
        <div className="p-6 rounded-lg bg-accent/[0.03] border border-accent/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.01] pointer-events-none results-telemetry-grid" />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
            <div>
              <span className="text-[10px] text-accent font-bold uppercase tracking-wider block">
                SYSTEM RESOLUTION PATH // RECOVERY_READY
              </span>
              <p className="text-sm text-foreground leading-relaxed mt-2 font-sans">
                Beacon Admit intercepts admissions inquiries instantly, running your facility's customized rules engine to pre-qualify payer details and coordinate immediate human warm handoffs.
              </p>
            </div>
            <div className="flex-shrink-0 bg-accent/[0.08] border border-accent/20 px-4 py-2.5 rounded text-center md:text-left self-start md:self-center">
              <span className="text-[9px] text-accent font-bold block">INTEGRITY MATRIX</span>
              <span className="text-xs font-bold text-foreground font-heading tracking-wide uppercase">Zero_Leakage</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
