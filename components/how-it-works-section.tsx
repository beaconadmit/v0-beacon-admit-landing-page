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
    <section id="how-it-works" className="py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold text-foreground leading-[1.2] text-balance">
            From Missed Call to Admissions Opportunity in Minutes
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Connecting line */}
          <div className="absolute left-8 top-8 bottom-8 w-px bg-border hidden lg:block" />

          <div className="space-y-6">
            {steps.map((step, index) => (
              <div key={index} className="relative flex gap-6 items-start">
                {/* Step icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <step.icon className="w-7 h-7 text-accent" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 pt-2 pb-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
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
