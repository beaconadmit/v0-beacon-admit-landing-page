import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FileText, AlertCircle, Phone, CreditCard, Shield, Clock } from "lucide-react"

export const metadata = {
  title: "Terms of Service | Beacon Admit",
  description: "Terms of Service for Beacon Admit - AI admissions coordinator for behavioral health facilities.",
}

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent text-sm font-extrabold mb-5">
              <FileText className="w-4 h-4" />
              Terms of Service
            </div>
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-primary leading-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Last updated: June 2026. Please read these terms carefully before using Beacon Admit.
            </p>
          </div>

          <div className="space-y-10">
            <section>
              <div className="flex items-start gap-4 mb-4">
                <AlertCircle className="w-6 h-6 text-accent mt-1 shrink-0" />
                <div>
                  <h2 className="text-xl font-extrabold text-primary mb-3">Acceptance of Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing or using Beacon Admit (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you are using the Service on behalf of a facility, you represent that you have authority to bind that facility to these Terms.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-start gap-4 mb-4">
                <Phone className="w-6 h-6 text-accent mt-1 shrink-0" />
                <div>
                  <h2 className="text-xl font-extrabold text-primary mb-3">Service Description</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Beacon Admit provides an AI-powered voice assistant for behavioral health facilities to manage after-hours and overflow admissions calls. The Service includes:
                  </p>
                  <ul className="text-muted-foreground leading-relaxed space-y-2">
                    <li>AI voice agent for inbound call handling and intake collection</li>
                    <li>Warm transfer to on-call staff based on your facility's protocols</li>
                    <li>Call logging and reporting dashboard</li>
                    <li>Integration capabilities with CRM and EHR systems</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-start gap-4 mb-4">
                <CreditCard className="w-6 h-6 text-accent mt-1 shrink-0" />
                <div>
                  <h2 className="text-xl font-extrabold text-primary mb-3">Subscription and Billing</h2>
                  <ul className="text-muted-foreground leading-relaxed space-y-2">
                    <li><strong>Billing:</strong> Subscriptions are billed monthly in advance. All prices are in USD.</li>
                    <li><strong>Trial:</strong> 14-day free trial available for paid plans. No credit card required to start.</li>
                    <li><strong>Overages:</strong> Additional minutes beyond plan limits are billed at the published overage rate.</li>
                    <li><strong>Refunds:</strong> No refunds are provided for partial months or unused services.</li>
                    <li><strong>Changes:</strong> Plans can be changed at any time. Changes take effect at the next billing cycle.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-start gap-4 mb-4">
                <Shield className="w-6 h-6 text-accent mt-1 shrink-0" />
                <div>
                  <h2 className="text-xl font-extrabold text-primary mb-3">Medical Disclaimer</h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    Beacon Admit is an intake coordination tool, NOT a medical device or clinical decision-maker:
                  </p>
                  <ul className="text-muted-foreground leading-relaxed space-y-2">
                    <li>The AI agent does not provide medical advice, diagnosis, or treatment recommendations.</li>
                    <li>All intake information is collected for administrative purposes only.</li>
                    <li>Final admission decisions remain with your licensed admissions and clinical staff.</li>
                    <li>The Service should not be relied upon for emergency or crisis situations.</li>
                    <li>Facilities must maintain their own clinical protocols and staff oversight.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-start gap-4 mb-4">
                <Clock className="w-6 h-6 text-accent mt-1 shrink-0" />
                <div>
                  <h2 className="text-xl font-extrabold text-primary mb-3">Availability and Support</h2>
                  <ul className="text-muted-foreground leading-relaxed space-y-2">
                    <li><strong>Service Hours:</strong> As specified in your plan (After-Hours, Full-Time, or Enterprise coverage).</li>
                    <li><strong>Uptime:</strong> We target 99.9% uptime but do not guarantee uninterrupted service.</li>
                    <li><strong>Support:</strong> Email support included; priority support and dedicated CSM for Growth and Enterprise plans.</li>
                    <li><strong>Maintenance:</strong> Scheduled maintenance will be communicated with at least 48 hours notice.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-primary mb-3">Compliance Obligations</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You are responsible for:
              </p>
              <ul className="text-muted-foreground leading-relaxed space-y-2">
                <li>Ensuring your staff are trained on the Service and its limitations</li>
                <li>Maintaining appropriate clinical oversight and protocols</li>
                <li>Notifying callers that they are speaking with an AI assistant</li>
                <li>Complying with all applicable healthcare laws and regulations</li>
                <li>Providing necessary BAAs and regulatory documentation to callers as required</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-primary mb-3">Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <ul className="text-muted-foreground leading-relaxed space-y-2">
                <li>THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.</li>
                <li>WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES.</li>
                <li>OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID FOR THE SERVICE IN THE PRIOR 12 MONTHS.</li>
                <li>WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-primary mb-3">Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                Either party may terminate this agreement with 30 days written notice. Upon termination, we will delete all facility data within 30 days, except as required for legal or regulatory purposes.
              </p>
            </section>

            <section className="border-t border-border pt-8">
              <p className="text-sm text-muted-foreground">
                These Terms constitute the entire agreement between you and Agile AI Lab, Inc. regarding the Service. For questions, contact legal@beaconadmit.com or (844) 444-2442.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}