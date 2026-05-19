import { PhoneMissed, AlertTriangle } from "lucide-react"

const painPoints = [
  "Missed after-hours calls",
  "Delayed follow-up on inquiries",
  "No structured intake process",
  "Staff wasting time on unqualified leads",
]

export function ProblemSection() {
  return (
    <section id="problem" className="py-16 lg:py-24 bg-card">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Section header */}
          <div className="mb-12">
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold text-foreground leading-[1.2] text-balance">
              The Cost of a Missed Call
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              When families call during a crisis, they don't wait. They call the next facility on their list.
            </p>
          </div>

          {/* Key stat */}
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-warning/5 border border-warning/20 mb-6">
            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center flex-shrink-0">
              <PhoneMissed className="w-6 h-6 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">42%</p>
              <p className="text-sm text-muted-foreground mt-1">
                of people who don&#39;t reach their behavioral health provider on the first call never try again
              </p>
              <p className="text-xs text-muted-foreground/60 mt-2">
                Source: Mental Health America 2025 Access Report
              </p>
            </div>
          </div>

          {/* Referral window -- what this really costs */}
          <div className="p-5 rounded-xl bg-muted/50 border border-border mb-12">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Each missed call doesn&#39;t just stay a missed call.</span>{" "}
              In referral markets, another facility picks up the same opportunity within
              <span className="font-semibold text-foreground"> under 8 minutes</span> — and the case is coded &quot;placed elsewhere.&quot;
              <span className="text-xs text-muted-foreground/60"> Source: Bx Health CEO Anthony DiLorenzo, 2026</span>
            </p>
          </div>

          {/* Pain points - minimal list */}
          <div className="space-y-4 mb-12">
            <p className="text-foreground font-medium">Common gaps in admissions coverage:</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {painPoints.map((point, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg bg-background/50"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-destructive flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom message */}
          <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20 text-center">
            <p className="text-lg font-semibold text-foreground">
              Beacon Admit helps you respond like a larger admissions department — without hiring one.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
