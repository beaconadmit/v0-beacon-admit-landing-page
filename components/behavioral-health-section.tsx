import { 
  Heart, 
  MessageCircle, 
  Building2, 
  Shield, 
  Stethoscope,
  AlertCircle
} from "lucide-react"

const differentiators = [
  { icon: Heart, text: "Warm, professional admissions tone" },
  { icon: MessageCircle, text: "One-question-at-a-time intake flow" },
  { icon: Building2, text: "Facility-specific eligibility rules" },
  { icon: Shield, text: "Insurance and private-pay pre-screening" },
  { icon: Stethoscope, text: "Detox, residential, PHP, IOP, and outpatient routing" },
  { icon: AlertCircle, text: "Crisis and safety escalation pathways" },
]

export function BehavioralHealthSection() {
  return (
    <section className="py-16 lg:py-24 bg-card">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold text-foreground leading-[1.2] text-balance">
              Not a Generic Receptionist Bot. Built Around Admissions Operations.
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed">
              Behavioral health admissions are different from normal lead capture. Callers may be scared, overwhelmed, intoxicated, calling for a loved one, or unsure what level of care they need.
            </p>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              Beacon Admit is designed around empathetic, structured, one-question-at-a-time conversations that support your admissions process without replacing clinical judgment.
            </p>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Behavioral health broadly includes mental health and substance use concerns, so the workflow needs to be sensitive, structured, and escalation-aware.
            </p>

            <div className="mt-8 p-4 rounded-xl bg-accent/5 border border-accent/20">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Clear disclaimer:</strong> The AI is not a clinician and does not provide clinical advice or diagnoses.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {differentiators.map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-accent" />
                </div>
                <span className="text-foreground font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
