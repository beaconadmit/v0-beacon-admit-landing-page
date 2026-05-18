"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const faqs = [
  {
    question: "Does Beacon Admit replace our admissions team?",
    answer: "No. Beacon Admit supports your admissions team. It answers calls, collects information, summarizes inquiries, and routes opportunities. Your team remains responsible for clinical review, admissions decisions, and final placement."
  },
  {
    question: "Can it handle crisis calls?",
    answer: "Beacon Admit can be configured with escalation rules, crisis language, and emergency instructions. It should not replace emergency services, licensed clinical staff, or crisis intervention protocols."
  },
  {
    question: "Can it verify insurance?",
    answer: "It can collect insurance information and route it for verification. Depending on your setup, it may also integrate with your existing VOB workflow or CRM."
  },
  {
    question: "Can it work after hours only?",
    answer: "Yes. You can use it after hours, during overflow, on weekends, or as a full-time admissions front door."
  },
  {
    question: "Can we customize the script?",
    answer: "Yes. The agent can be customized around your program, accepted insurance, locations, services, admissions criteria, tone, and escalation rules."
  },
  {
    question: "Is it HIPAA compliant?",
    answer: "Beacon Admit is designed for HIPAA-conscious admissions workflows, and a BAA can be made available where applicable. Final compliance depends on your implementation, data flows, vendors, internal policies, and use case."
  },
  {
    question: "What types of programs is this for?",
    answer: "Detox, residential treatment, mental health residential, PHP, IOP, outpatient programs, dual diagnosis programs, and smaller behavioral health operators that need better admissions coverage."
  },
  {
    question: "How fast can we launch?",
    answer: "Most programs can start with a focused admissions workflow first, then expand into SMS follow-up, CRM routing, insurance workflows, and reporting."
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-16 lg:py-24 bg-card">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold text-foreground leading-[1.2] text-balance">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-background border border-border rounded-xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-foreground pr-4">{faq.question}</span>
                <ChevronDown 
                  className={cn(
                    "w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div 
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <p className="px-5 pb-5 text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
