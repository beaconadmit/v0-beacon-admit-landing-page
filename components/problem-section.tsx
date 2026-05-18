import { 
  PhoneMissed, 
  Clock, 
  FileQuestion, 
  FileText, 
  Users, 
  MessageSquareOff,
  AlertTriangle
} from "lucide-react"

const problems = [
  { icon: PhoneMissed, text: "Missed after-hours calls" },
  { icon: Clock, text: "Delayed follow-up on web forms" },
  { icon: FileQuestion, text: "Inconsistent intake questions" },
  { icon: FileText, text: "No structured call summary" },
  { icon: Users, text: "Admissions staff wasting time on unqualified leads" },
  { icon: MessageSquareOff, text: "No automated SMS follow-up" },
  { icon: AlertTriangle, text: "No clear escalation path for urgent situations" },
]

export function ProblemSection() {
  return (
    <section id="problem" className="py-16 lg:py-24 bg-card">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold text-foreground leading-[1.2] text-balance">
            Your Next Admission Often Calls When Your Team Is Busy, Closed, or Understaffed
          </h2>
          <p className="mt-6 text-base text-muted-foreground leading-relaxed">
            Small and mid-sized behavioral health programs cannot always staff a full 24/7 admissions department. But families, referral partners, and prospective clients do not wait until business hours. They call when the crisis is happening.
          </p>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            When nobody answers — or when follow-up is delayed — that inquiry may call another center, go to a competitor, or never reach treatment.
          </p>
        </div>

        {/* Stat callout */}
        <div className="max-w-2xl mx-auto mb-12 p-6 rounded-xl bg-warning/10 border-l-4 border-warning text-center">
          <p className="text-lg font-semibold text-foreground">
            73% of after-hours calls to behavioral health programs go unanswered.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border hover:border-accent/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                <problem.icon className="w-5 h-5 text-destructive" />
              </div>
              <span className="text-sm text-foreground">{problem.text}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block p-6 rounded-xl bg-accent/5 border border-accent/20">
            <p className="text-lg font-semibold text-foreground">
              Beacon Admit helps you respond like a larger admissions department without hiring one.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
