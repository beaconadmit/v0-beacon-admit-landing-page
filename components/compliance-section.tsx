import { 
  ShieldCheck, 
  Lock, 
  UserCog, 
  AlertTriangle, 
  FileText, 
  Settings,
  CheckCircle2
} from "lucide-react"

const complianceItems = [
  { 
    icon: FileText, 
    code: "GOV-BAA",
    text: "BAA available where applicable",
    detail: "A Business Associate Agreement can be provided when your program handles protected health information.",
    status: "VERIFIED"
  },
  { 
    icon: Settings, 
    code: "GOV-DATA",
    text: "Configurable data retention",
    detail: "Your team controls retention settings and data purge logs — not the platform defaults.",
    status: "ENFORCED"
  },
  { 
    icon: AlertTriangle, 
    code: "GOV-ESCL",
    text: "Human escalation for urgent situations",
    detail: "Crisis language triggers and safety routing rules are configured per facility policy.",
    status: "ROUTED"
  },
  { 
    icon: UserCog, 
    code: "GOV-PROV",
    text: "Not a clinical provider",
    detail: "Beacon Admit does not employ licensed clinical staff and does not provide clinical advice.",
    status: "COMPLIANT"
  },
  { 
    icon: ShieldCheck, 
    code: "GOV-DIAG",
    text: "No clinical diagnosis or treatment",
    detail: "The AI gathers intake details and passes them to your licensed team for all clinical decisions.",
    status: "COMPLIANT"
  },
  { 
    icon: Lock, 
    code: "GOV-SCRP",
    text: "Facility-controlled routing & scripts",
    detail: "Your team configures exactly what the agent can and cannot say, plus disclosures.",
    status: "VERIFIED"
  },
]

export function ComplianceSection() {
  return (
    <section className="py-16 lg:py-24 bg-background relative overflow-hidden border-t border-border">
      {/* Background visual detail */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none results-telemetry-grid" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Title and Accordions */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <span className="eyebrow block mb-3">Governance & Security</span>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-bold text-foreground leading-[1.15] text-balance tracking-tight">
              Clinical Governance & Security Control
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              Beacon Admit is built to support admissions workflows while keeping clinical decisions, diagnosis, and treatment recommendations with your licensed team.
            </p>

            {/* Folder-style details */}
            <div className="mt-8 space-y-3 font-sans">
              {/* HIPAA */}
              <details className="group [&_summary::-webkit-details-marker]:hidden border border-border/70 rounded-lg bg-card overflow-hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-4 hover:bg-accent/[0.02] transition-colors">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] text-accent font-bold tracking-wider">[GOV-DIR // HIPAA_COMPLIANCE]</span>
                    <strong className="text-sm font-bold text-foreground mt-1 leading-snug">HIPAA-conscious data handling</strong>
                  </div>
                  <span className="text-xs text-muted-foreground/60 font-mono transition-transform group-open:rotate-180">
                    [OPEN]
                  </span>
                </summary>
                <div className="px-4 pb-4 pt-1 border-t border-border/40 bg-accent/[0.01]">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    For programs handling protected health information, HIPAA generally requires covered entities and business associates to use appropriate Business Associate Agreements when PHI is created, received, maintained, or transmitted on behalf of a covered entity.
                  </p>
                </div>
              </details>

              {/* 42 CFR Part 2 */}
              <details className="group [&_summary::-webkit-details-marker]:hidden border border-border/70 rounded-lg bg-card overflow-hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-4 hover:bg-accent/[0.02] transition-colors">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] text-accent font-bold tracking-wider">[GOV-DIR // SUD_PART_2]</span>
                    <strong className="text-sm font-bold text-foreground mt-1 leading-snug">42 CFR Part 2 compliance alignment</strong>
                  </div>
                  <span className="text-xs text-muted-foreground/60 font-mono transition-transform group-open:rotate-180">
                    [OPEN]
                  </span>
                </summary>
                <div className="px-4 pb-4 pt-1 border-t border-border/40 bg-accent/[0.01]">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    For substance use disorder treatment programs, 42 CFR Part 2 places additional restrictions on the use and disclosure of SUD patient records, ensuring absolute caller privacy and consent routing.
                  </p>
                </div>
              </details>
            </div>
          </div>

          {/* Right Column: Grid and Verified Badge */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {complianceItems.map((item, index) => (
                <div 
                  key={index}
                  className="flex flex-col justify-between p-5 rounded-lg bg-card border border-border/70 hover:border-success/30 transition-all duration-200"
                >
                  <div>
                    {/* Header line */}
                    <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-3 mb-4 font-mono text-[9px]">
                      <span className="text-success font-bold">[{item.code}]</span>
                      <span className="text-muted-foreground/60 bg-muted px-1.5 py-0.5 rounded">
                        {item.status}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-md bg-success/[0.06] border border-success/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-4 h-4 text-success" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground leading-snug tracking-tight">
                          {item.text}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Verification Stamp / Consent Notice */}
            <div className="p-5 rounded-lg bg-card border border-border/80 relative overflow-hidden">
              <div className="absolute right-4 top-4 opacity-[0.08] pointer-events-none">
                <CheckCircle2 className="w-24 h-24 text-success" />
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono">
                <div>
                  <span className="text-[10px] text-success font-bold uppercase tracking-wider block">
                    SYSTEM SECURITY STATUS // SECURE_STABLE
                  </span>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mt-1.5 font-sans">
                    Call recording and consent language are configurable by state and facility policy. 
                    Configurations are facility-controlled — Beacon Admit does not impose defaults 
                    that override your compliance posture.
                  </p>
                </div>
                <div className="flex-shrink-0 bg-success/[0.06] border border-success/20 px-3 py-2 rounded text-center md:text-left">
                  <span className="text-[9px] text-success font-bold block">AUDIT STAMP</span>
                  <span className="text-sm font-bold text-foreground font-heading">HIPAA_READY</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

