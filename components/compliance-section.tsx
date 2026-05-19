import { 
  ShieldCheck, 
  Lock, 
  UserCog, 
  AlertTriangle, 
  FileText, 
  Settings 
} from "lucide-react"

const complianceItems = [
  { 
    icon: FileText, 
    text: "BAA available where applicable",
    detail: "A Business Associate Agreement can be provided when your program handles protected health information.",
  },
  { 
    icon: Settings, 
    text: "Configurable data retention",
    detail: "Your team controls retention settings — not the platform defaults.",
  },
  { 
    icon: AlertTriangle, 
    text: "Human escalation for urgent or high-risk situations",
    detail: "Crisis language and escalation rules are configured per facility policy.",
  },
  { 
    icon: UserCog, 
    text: "Not a clinical provider",
    detail: "Beacon Admit does not employ licensed clinical staff and does not provide clinical advice.",
  },
  { 
    icon: ShieldCheck, 
    text: "Does not diagnose or recommend medical treatment",
    detail: "The AI gathers intake information and passes it to your licensed team for all clinical decisions.",
  },
  { 
    icon: Lock, 
    text: "Facility-controlled scripts, routing, and disclosures",
    detail: "Your team configures what the agent can and cannot say.",
  },
]

export function ComplianceSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold text-foreground leading-[1.2] text-balance">
              Built for Compliance-Conscious Admissions
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              Beacon Admit is built to support admissions workflows while keeping clinical decisions, diagnosis, and treatment recommendations with your licensed team.
            </p>

            <div className="mt-8 space-y-3">
              {/* HIPAA */}
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-4 rounded-xl bg-accent/5 border border-accent/20 hover:bg-accent/[0.07] transition-colors">
                  <p className="text-sm font-medium text-foreground">
                    <strong className="text-foreground leading-snug">HIPAA-conscient data handling</strong>
                    <span className="block text-xs text-muted-foreground mt-0.5 font-normal">BAA available where applicable</span>
                  </p>
                  <span className="text-muted-foreground ml-2 transition-transform group-open:rotate-180">
                    &#9650;
                  </span>
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    For programs handling protected health information, HIPAA generally requires covered entities and business associates to use appropriate Business Associate Agreements when PHI is created, received, maintained, or transmitted on behalf of a covered entity.
                  </p>
                </div>
              </details>

              {/* 42 CFR Part 2 */}
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-4 rounded-xl bg-accent/5 border border-accent/20 hover:bg-accent/[0.07] transition-colors">
                  <p className="text-sm font-medium text-foreground">
                    <strong className="text-foreground leading-snug">42 CFR Part 2 — substance use disorder programs</strong>
                    <span className="block text-xs text-muted-foreground mt-0.5 font-normal">Additional SUD record-use restrictions can be layered in</span>
                  </p>
                  <span className="text-muted-foreground ml-2 transition-transform group-open:rotate-180">
                    &#9650;
                  </span>
                </summary>
                <div className="px-4 pb-4">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    For substance use disorder treatment programs, 42 CFR Part 2 places additional restrictions on the use and disclosure of SUD patient records.
                  </p>
                </div>
              </details>
            </div>
          </div>

          <div className="space-y-3">
            {complianceItems.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="w-5 h-5 text-success" />
                </div>
                <div>
                  <p className="text-foreground font-medium text-sm">{item.text}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
            
            <p className="text-[11px] text-muted-foreground/50 leading-relaxed pt-2 px-1">
              Call recording and consent language can be configured by state and facility policy. 
              Beacon Admit is designed for HIPAA-conscious admissions workflows, and a BAA can be 
              made available where applicable. Configurations are facility-controlled — Beacon Admit 
              does not impose defaults that override your compliance posture.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
