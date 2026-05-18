import { 
  Moon, 
  PhoneMissed, 
  Globe, 
  Shield, 
  Users, 
  Clock 
} from "lucide-react"

const useCases = [
  {
    icon: Moon,
    title: "After-Hours Admissions Coverage",
    description: "Answer calls when your admissions team is offline."
  },
  {
    icon: PhoneMissed,
    title: "Missed-Call Text Back",
    description: "Automatically text callers when your team cannot answer."
  },
  {
    icon: Globe,
    title: "Website Lead Follow-Up",
    description: "Call or text new form submissions immediately."
  },
  {
    icon: Shield,
    title: "Insurance Pre-Screening",
    description: "Collect payer, member details, and basic insurance information before staff follow-up."
  },
  {
    icon: Users,
    title: "Referral Partner Routing",
    description: "Capture referral source information and route professional referrals differently from direct-to-consumer calls."
  },
  {
    icon: Clock,
    title: "Admissions Overflow",
    description: "Support your team during high-volume hours."
  },
]

export function UseCasesSection() {
  return (
    <section className="py-20 lg:py-32 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Where Beacon Admit Fits Into Your Admissions Workflow
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <div 
              key={index}
              className="p-6 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <useCase.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{useCase.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
