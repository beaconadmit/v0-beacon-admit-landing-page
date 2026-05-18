import { PhoneForwarded, Settings, UserCheck, Bell, MessageSquare } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: PhoneForwarded,
    title: "Connect Your Admissions Number",
    description: "Forward calls after hours, during overflow, or 24/7."
  },
  {
    number: "02",
    icon: Settings,
    title: "Configure Your Admissions Flow",
    description: "We customize the agent around your program, accepted insurance, levels of care, locations, exclusion criteria, and handoff rules."
  },
  {
    number: "03",
    icon: UserCheck,
    title: "Capture and Qualify Inquiries",
    description: "The AI gathers the right information, identifies urgency, and keeps the caller engaged."
  },
  {
    number: "04",
    icon: Bell,
    title: "Alert Your Team",
    description: "Your admissions team receives a clean summary with the caller's details, intent, urgency, and recommended next step."
  },
  {
    number: "05",
    icon: MessageSquare,
    title: "Follow Up Automatically",
    description: "Send SMS follow-ups, missed-call replies, reminders, or nurture sequences for leads that are not ready yet."
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            From Missed Call to Admissions Opportunity in Minutes
          </h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden lg:block" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex gap-6 items-start">
                {/* Step number circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {step.number.slice(-1)}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
