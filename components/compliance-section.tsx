import { ShieldCheck, Lock, UserCog, AlertTriangle, FileText, Settings } from "lucide-react"

const complianceItems = [
  { icon: FileText, text: "BAA available where applicable" },
  { icon: Settings, text: "Configurable data retention" },
  { icon: AlertTriangle, text: "Human escalation for urgent or high-risk situations" },
  { icon: UserCog, text: "Not a clinical provider" },
  { icon: ShieldCheck, text: "Does not diagnose or recommend medical treatment" },
  { icon: Lock, text: "Facility-controlled scripts, routing, and disclosures" },
]

export function ComplianceSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Designed for Sensitive Admissions Conversations
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Beacon Admit is designed to support admissions workflows while keeping clinical decisions, diagnosis, and treatment recommendations with your licensed team.
            </p>
            
            <div className="mt-8 space-y-4">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">HIPAA:</strong> For programs handling protected health information, HIPAA generally requires covered entities and business associates to use appropriate Business Associate Agreements when PHI is created, received, maintained, or transmitted on behalf of a covered entity.
                </p>
              </div>
              
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">42 CFR Part 2:</strong> For substance use disorder treatment programs, 42 CFR Part 2 places additional restrictions on the use and disclosure of SUD patient records.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {complianceItems.map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-foreground">{item.text}</span>
              </div>
            ))}
            
            <p className="text-xs text-muted-foreground mt-6 p-4 rounded-xl bg-muted/50">
              Call recording and consent language can be configured by state and facility policy. Beacon Admit is designed for HIPAA-conscious admissions workflows, and a BAA can be made available where applicable.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
