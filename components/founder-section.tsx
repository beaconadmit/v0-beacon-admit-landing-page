import { Lightbulb } from "lucide-react"

export function FounderSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold text-foreground leading-[1.2] text-balance">
              Built by Operators Who Understand Behavioral Health Admissions
            </h2>
            <p className="mt-6 text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Beacon Admit was created by a team with hands-on experience in behavioral health operations, substance use treatment admissions, and startup treatment center consulting.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 lg:p-10">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Why We Built Beacon Admit</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Small treatment programs should not need a massive call center to provide fast, compassionate admissions response. Beacon Admit helps lean teams capture more inquiries, respond faster, and give families a better first experience.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  The product is designed around the real-world admissions problems small and mid-sized programs face every day: speed-to-lead, staffing gaps, caller anxiety, insurance friction, and inconsistent follow-up.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
