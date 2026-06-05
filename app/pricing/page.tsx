"use client"

import { useState } from "react"
import Link from "next/link"
import { Check, ArrowRight, Zap, Building2, Crown, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

/** Billing cycle toggle */
type BillingCycle = "monthly" | "annual"

/** Pricing tier definition */
interface PricingTier {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  monthlyPrice: number | null
  annualPrice: number | null
  priceLabel?: string
  features: string[]
  highlighted: boolean
  ctaLabel: string
  stripePriceEnvKey: {
    monthly: string
    annual: string
  }
}

const TIERS: PricingTier[] = [
    {
      id: "after-hours",
      name: "After Hours / Weekends",
      icon: <Zap className="w-5 h-5" />,
      description: "Extended coverage for nights and weekends when your staff is off-duty.",
      monthlyPrice: 499,
      annualPrice: null,
      features: [
        "1 AI admissions agent",
        "1,000 minutes / mo",
        "Coverage: 6 PM – 8 AM Weekdays",
        "Basic intake form collection",
        "Standard voice models",
        "7-day call log retention",
        "Email support",
      ],
      highlighted: false,
      ctaLabel: "Start Free Trial",
      stripePriceEnvKey: {
        monthly: "STRIPE_PRICE_AFTER_HOURS_MONTHLY",
        annual: "",
      },
    },
    {
      id: "full-time",
      name: "Full-Time Admissions",
      icon: <Building2 className="w-5 h-5" />,
      description: "Complete 24/7 coverage for growing facilities with multi-program needs.",
      monthlyPrice: 1499,
      annualPrice: null,
      features: [
        "Unlimited AI admissions agents",
        "3,300 minutes / mo",
        "24hr Weekends & Holidays",
        "Advanced intake + insurance screening",
        "CRM & admissions queue integration",
        "Warm transfer to on-call staff",
        "Custom voice & personality",
        "30-day call log retention",
        "Priority support + dedicated CSM",
        "HIPAA BAA included",
      ],
      highlighted: true,
      ctaLabel: "Start Free Trial",
      stripePriceEnvKey: {
        monthly: "STRIPE_PRICE_FULL_TIME_MONTHLY",
        annual: "",
      },
    },
    {
      id: "enterprise",
      name: "Enterprise",
      icon: <Crown className="w-5 h-5" />,
      description: "Custom platform for multi-site organizations requiring dedicated infrastructure.",
      monthlyPrice: null,
      annualPrice: null,
      priceLabel: "Custom",
      features: [
        "Dedicated server capacity",
        "Unlimited minutes",
        "24/7/365 Continuous",
        "Custom intake workflows",
        "EHR/EMR integration",
        "Multi-location management",
        "Dedicated voice training",
        "90-day call log retention",
        "99.9% uptime SLA",
        "Dedicated account team",
        "Custom BAA + security review",
        "Custom Routing & Scheduling",
      ],
      highlighted: false,
      ctaLabel: "Contact Sales",
      stripePriceEnvKey: {
        monthly: "",
        annual: "",
      },
    },
  ]

const PRICING_FAQ = [
  {
    question: "Is there a free trial?",
    answer:
      "Yes. All paid plans include a 14-day free trial with full feature access. No credit card required to start.",
  },
  {
    question: "Can I switch plans later?",
    answer:
      "Absolutely. You can upgrade or downgrade at any time. Changes take effect at your next billing cycle.",
  },
  {
    question: "What happens if I exceed my call limit?",
    answer:
      "We'll notify you at 80% usage. Overage calls are billed at $2.50/call on Starter and $1.50/call on Growth. Enterprise plans have no limits.",
  },
  {
    question: "Do you sign a BAA?",
    answer:
      "Yes. Growth and Enterprise plans include a signed HIPAA Business Associate Agreement at no additional cost. Starter plans can add a BAA for $49/month.",
  },
  {
    question: "What's included in the free trial?",
    answer:
      "Full access to all features of your selected plan, including agent configuration, CRM integration setup, and up to 25 test calls.",
  },
]

/**
 * Initiates Stripe Checkout for a given tier and billing cycle.
 */
async function handleCheckout(tierId: string, cycle: BillingCycle) {
  try {
    const response = await fetch("/api/stripe/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tierId, cycle }),
    })

    const data = await response.json()

    if (data.url) {
      window.location.href = data.url
    } else {
      console.error("Stripe checkout error:", data.error)
      alert(data.error || "Unable to start checkout. Please try again.")
    }
  } catch (err) {
    console.error("Checkout request failed:", err)
    alert("Something went wrong. Please try again.")
  }
}

/**
 * Pricing page with three-tier layout, monthly/annual toggle, and Stripe checkout flow.
 */
export default function PricingPage() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly")

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent text-sm font-extrabold mb-5">
              <Zap className="w-4 h-4" />
              Simple, transparent pricing
            </div>
            <h1 className="text-[clamp(2rem,4vw,3rem)] font-extrabold text-primary leading-tight mb-4">
              Plans that scale with your facility
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Start with a 14-day free trial. No credit card required. All plans
              include HIPAA-grade security and 24/7 monitoring.
            </p>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-3 mb-12">
            <button
              onClick={() => setCycle("monthly")}
              className={`px-4 py-2 rounded-lg text-sm font-extrabold transition-all duration-200 ${
                cycle === "monthly"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-white/80 text-muted-foreground border border-border/60 hover:border-primary/30"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setCycle("annual")}
              className={`px-4 py-2 rounded-lg text-sm font-extrabold transition-all duration-200 ${
                cycle === "annual"
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-white/80 text-muted-foreground border border-border/60 hover:border-primary/30"
              }`}
            >
              Annual
              <span className="ml-2 text-xs bg-success/20 text-success px-1.5 py-0.5 rounded-md font-bold">
                Save 17%
              </span>
            </button>
          </div>

          {/* Tier cards */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-20">
            {TIERS.map((tier) => {
              const price =
                cycle === "monthly" ? tier.monthlyPrice : tier.annualPrice
              const isEnterprise = tier.id === "enterprise"

              return (
                <div
                  key={tier.id}
                  className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 hover:-translate-y-1 ${
                    tier.highlighted
                      ? "bg-gradient-to-b from-primary/[0.04] to-accent/[0.04] border-2 border-accent/40 shadow-xl shadow-accent/10"
                      : "glass-card"
                  }`}
                >
                  {/* Popular badge */}
                  {tier.highlighted && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-accent text-accent-foreground text-xs font-extrabold rounded-full shadow-md">
                      Most Popular
                    </div>
                  )}

                  {/* Tier header */}
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/15 grid place-items-center text-accent">
                      {tier.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-primary">
                        {tier.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {tier.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    {price !== null ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-extrabold text-primary">
                          ${price}
                        </span>
                        <span className="text-muted-foreground text-sm font-bold">
                          /mo
                        </span>
                      </div>
                    ) : (
                      <span className="text-4xl font-extrabold text-primary">
                        {tier.priceLabel}
                      </span>
                    )}
                    {cycle === "annual" && price !== null && (
                      <p className="text-xs text-success font-bold mt-1">
                        Billed annually (${price * 12}/yr)
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <Button
                    className={`w-full mb-6 h-12 font-extrabold text-sm transition-all duration-200 hover:-translate-y-0.5 ${
                      tier.highlighted
                        ? "bg-accent hover:bg-[oklch(0.45_0.10_185)] text-accent-foreground shadow-md hover:shadow-lg hover:shadow-accent/20"
                        : "bg-primary hover:bg-primary/90 text-primary-foreground"
                    }`}
                    onClick={() => {
                      if (isEnterprise) {
                        const demoSection = document.getElementById("demo")
                        if (demoSection) {
                          demoSection.scrollIntoView({ behavior: "smooth" })
                        } else {
                          window.location.href = "/#demo"
                        }
                      } else {
                        handleCheckout(tier.id, cycle)
                      }
                    }}
                  >
                    {tier.ctaLabel}
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>

                  {/* Features */}
                  <ul className="space-y-3 flex-1">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-muted-foreground"
                      >
                        <Check className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          {/* Pricing FAQ */}
          <div className="max-w-[780px] mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-extrabold text-primary mb-3">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-sm">
                Have other questions?{" "}
                <Link
                  href="/#demo"
                  className="text-accent font-bold hover:underline"
                >
                  Contact us
                </Link>
              </p>
            </div>

            <div className="space-y-4">
              {PRICING_FAQ.map((faq) => (
                <details
                  key={faq.question}
                  className="glass-card rounded-xl group"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-primary font-extrabold text-sm select-none">
                    {faq.question}
                    <HelpCircle className="w-4 h-4 text-muted-foreground group-open:text-accent transition-colors duration-200 shrink-0 ml-4" />
                  </summary>
                  <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
