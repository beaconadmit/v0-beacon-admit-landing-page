import { ShieldCheck, Lock, Users, Stethoscope } from "lucide-react"

const trustItems = [
  {
    icon: ShieldCheck,
    label: "HIPAA-conscious design",
  },
  {
    icon: Lock,
    label: "BAA available where applicable",
  },
  {
    icon: Users,
    label: "Human escalation for crisis situations",
  },
  {
    icon: Stethoscope,
    label: "AI does not provide clinical advice or diagnosis",
  },
]

export function TrustBanner() {
  return (
    <section className="py-0">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-x-8 gap-y-3 flex-wrap py-4 border-y border-border bg-accent/[0.04]">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <item.icon className="w-4 h-4 text-accent flex-shrink-0" />
              <span className="text-xs font-medium text-muted-foreground leading-tight">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
