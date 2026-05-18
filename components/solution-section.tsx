import { 
  Phone, 
  ClipboardList, 
  Bell, 
  UserCheck, 
  FileText, 
  MessageSquare 
} from "lucide-react"

const features = [
  {
    icon: Phone,
    title: "24/7 Call Answering",
    description: "Capture inquiries after hours, during lunch breaks, weekends, holidays, and staff overflow."
  },
  {
    icon: ClipboardList,
    title: "Admissions-Focused Intake",
    description: "Collect key details such as caller relationship, presenting issue, substance use or mental health concern, location, insurance, urgency, and preferred callback method."
  },
  {
    icon: Bell,
    title: "Real-Time Alerts",
    description: "Send qualified inquiries to your team by SMS, email, CRM, or admissions dashboard."
  },
  {
    icon: UserCheck,
    title: "Human Handoff Rules",
    description: "Escalate urgent calls, complex situations, or high-intent admissions opportunities to a live staff member."
  },
  {
    icon: FileText,
    title: "Call Summaries & Transcripts",
    description: "Give admissions staff a clean summary before they call back."
  },
  {
    icon: MessageSquare,
    title: "Follow-Up Automation",
    description: "Trigger SMS or email follow-up when someone does not book, does not answer, or needs more information."
  },
]

export function SolutionSection() {
  return (
    <section id="solution" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            A 24/7 Admissions Front Door for Your Facility
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Beacon Admit gives your program an always-available AI voice admissions coordinator trained around your services, locations, levels of care, insurance rules, and escalation protocols.
          </p>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            It can answer common questions, gather required intake details, identify urgency, send structured summaries, and hand off high-priority inquiries to your admissions team.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
