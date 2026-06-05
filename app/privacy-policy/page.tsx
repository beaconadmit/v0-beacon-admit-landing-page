import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Shield, Lock, Eye, Database, Users, FileText } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | Beacon Admit",
  description: "Privacy policy for Beacon Admit - HIPAA-compliant AI admissions coordinator for behavioral health facilities.",
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent text-sm font-extrabold mb-5">
              <Shield className="w-4 h-4" />
              Privacy Policy
            </div>
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-primary leading-tight mb-4">
              Your Data, Our Responsibility
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Last updated: June 2026. We are committed to protecting the privacy and security of your facility's data and patient information.
            </p>
          </div>

          <div className="space-y-10">
            <section>
              <div className="flex items-start gap-4 mb-4">
                <Lock className="w-6 h-6 text-accent mt-1 shrink-0" />
                <div>
                  <h2 className="text-xl font-extrabold text-primary mb-3">HIPAA Compliance</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Beacon Admit is designed for behavioral health facilities and adheres to HIPAA Privacy and Security Rules. We only process Protected Health Information (PHI) that is voluntarily shared during calls, and we maintain it solely for intake routing purposes. All PHI is encrypted in transit (TLS 1.3) and at rest (AES-256). We sign Business Associate Agreements (BAAs) with all customers and never use PHI for training or marketing purposes.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-start gap-4 mb-4">
                <Database className="w-6 h-6 text-accent mt-1 shrink-0" />
                <div>
                  <h2 className="text-xl font-extrabold text-primary mb-3">Data We Collect</h2>
                  <ul className="text-muted-foreground leading-relaxed space-y-2">
                    <li><strong>Call Metadata:</strong> Timestamps, duration, caller ID (when provided), call outcome (transferred, voicemail, etc.)</li>
                    <li><strong>Intake Information:</strong> Information voluntarily shared by callers including names, dates of birth, insurance details, and treatment needs. This data is processed solely for intake coordination and is never permanently stored beyond the retention period in your plan.</li>
                    <li><strong>Account Data:</strong> Facility name, contact information, staff credentials, and configuration settings necessary for service provision.</li>
                    <li><strong>Usage Analytics:</strong> Aggregate metrics on call volume, duration, and system performance to improve our service quality.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-start gap-4 mb-4">
                <Eye className="w-6 h-6 text-accent mt-1 shrink-0" />
                <div>
                  <h2 className="text-xl font-extrabold text-primary mb-3">How We Use Your Data</h2>
                  <ul className="text-muted-foreground leading-relaxed space-y-2">
                    <li>To provide and maintain the Beacon Admit service</li>
                    <li>To route calls to appropriate staff members via warm transfer protocols</li>
                    <li>To generate reports and analytics for facility management</li>
                    <li>To communicate about service updates and support</li>
                    <li>To comply with legal and regulatory obligations</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-start gap-4 mb-4">
                <Users className="w-6 h-6 text-accent mt-1 shrink-0" />
                <div>
                  <h2 className="text-xl font-extrabold text-primary mb-3">Data Sharing and Disclosure</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    We do not sell, rent, or share your data with third parties except as follows:
                  </p>
                  <ul className="text-muted-foreground leading-relaxed space-y-2">
                    <li><strong>Service Providers:</strong> Infrastructure partners (AWS, database providers) who are bound by strict confidentiality and security requirements.</li>
                    <li><strong>Legal Compliance:</strong> When required by law, subpoena, or to protect rights and safety.</li>
                    <li><strong>Business Transfers:</strong> In the event of a merger or acquisition, with appropriate safeguards maintained.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-start gap-4 mb-4">
                <FileText className="w-6 h-6 text-accent mt-1 shrink-0" />
                <div>
                  <h2 className="text-xl font-extrabold text-primary mb-3">Data Retention and Deletion</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Call logs and intake data are retained according to your subscription plan: 7 days (Starter), 30 days (Growth), or 90 days (Enterprise). Upon request or account termination, we securely delete all data within 30 days. Facilities may request earlier deletion or export of their data at any time by contacting support.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-primary mb-3">Security Measures</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We implement industry-standard security practices including:
              </p>
              <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1 ml-4">
                <li>End-to-end encryption for all call data</li>
                <li>Role-based access controls for staff accounts</li>
                <li>Regular security audits and penetration testing</li>
                <li>Multi-factor authentication for administrative access</li>
                <li>Continuous monitoring and alerting systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-primary mb-3">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">
                You may access, correct, or delete your facility's data at any time. Contact us at privacy@beaconadmit.com or call (844) 444-2442. We will respond to all requests within 30 days.
              </p>
            </section>

            <section className="border-t border-border pt-8">
              <p className="text-sm text-muted-foreground">
                This policy applies to Beacon Admit services. By using our platform, you acknowledge you have read and understood these practices. We may update this policy periodically; significant changes will be communicated via email or in-app notification.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}