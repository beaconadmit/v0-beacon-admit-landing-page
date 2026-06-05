import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Shield, Clock, FileText } from "lucide-react"

export const metadata = {
  title: "BAA Information | Beacon Admit",
  description: "Business Associate Agreement information for Beacon Admit.",
}

export default function BAAInfoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent text-sm font-extrabold mb-5">
              <Shield className="w-4 h-4" />
              HIPAA Compliance
            </div>
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-primary leading-tight mb-4">
              Business Associate Agreement
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Page coming soon
            </p>
          </div>

          <div className="space-y-10">
            <div className="glass-card rounded-xl p-8 text-center">
              <Clock className="w-16 h-16 text-accent mx-auto mb-4" />
              <h2 className="text-2xl font-extrabold text-primary mb-3">
                BAA Information Coming Soon
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We're preparing comprehensive Business Associate Agreement (BAA) documentation for our healthcare partners. This page will include:
              </p>
              <ul className="text-left text-muted-foreground leading-relaxed space-y-2 max-w-md mx-auto">
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>BAA template and execution process</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>HIPAA compliance documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Security and encryption details</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent">•</span>
                  <span>Audit and retention policies</span>
                </li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-6">
                In the meantime, Growth and Enterprise plans include BAAs at no additional cost. Contact us at <a href="mailto:privacy@beaconadmit.com" className="text-accent font-bold hover:underline">privacy@beaconadmit.com</a> for immediate BAA requests.
              </p>
            </div>

            <div className="bg-muted/20 rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-5 h-5 text-accent" />
                <h3 className="font-extrabold text-primary">Quick BAA Facts</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                All paid plans include HIPAA-grade encryption. The BAA formalizes our shared responsibility to protect Protected Health Information (PHI) and ensures compliance with 45 CFR Parts 160 and 164. BAAs are executed upon request as part of your onboarding process.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}