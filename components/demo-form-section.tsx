"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { ArrowRight, CheckCircle, Loader2, Building2, Mail, User, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const PROGRAM_TYPES = [
  { value: "detox", label: "Detox" },
  { value: "residential", label: "Residential Treatment" },
  { value: "php", label: "PHP (Partial Hospitalization)" },
  { value: "iop", label: "IOP (Intensive Outpatient)" },
  { value: "outpatient", label: "Outpatient" },
  { value: "mental-health", label: "Mental Health Residential" },
  { value: "dual-diagnosis", label: "Dual Diagnosis" },
  { value: "other", label: "Other" },
] as const

const COVERAGE_NEEDS = [
  { value: "after-hours", label: "After-hours coverage" },
  { value: "weekend", label: "Weekends & holidays" },
  { value: "overflow", label: "Overflow / peak periods" },
  { value: "full-time", label: "Full-time coverage" },
  { value: "not-sure", label: "Not sure yet" },
] as const

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  organization: z.string().min(2, "Organization name is required"),
  programType: z.string().min(1, "Please select a program type"),
  coverageNeed: z.string().optional(),
  message: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

/** Props for passing calculator data as hidden fields */
interface DemoFormSectionProps {
  calculatorData?: {
    missedCalls?: number
    qualifiedRate?: number
    conversionRate?: number
    recaptureRate?: number
    admissionValue?: number
    revenueAtRisk?: number
    recapturedRevenue?: number
  }
}

/**
 * Enhanced lead capture form matching the mockup.
 * 6 visible fields (name, email, org, program type, coverage need, message)
 * plus hidden calculator fields that are silently submitted to `/api/leads`.
 */
export function DemoFormSection({ calculatorData }: DemoFormSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (isSubmitted) {
      const script = document.createElement("script")
      script.src = "https://assets.calendly.com/assets/external/widget.js"
      script.async = true
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }
  }, [isSubmitted])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      programType: "",
      coverageNeed: "",
      message: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      const payload = {
        ...data,
        ...(calculatorData ? { calculator: calculatorData } : {}),
      }

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit")
      }

      setIsSubmitted(true)
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Failed to submit. Please try again."
      alert(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="demo" className="py-16 lg:py-24 bg-primary">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-primary-foreground/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary-foreground" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-foreground mb-4">
              You're In!
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Thanks for your interest! We'll reach out within 24 hours to show you how Beacon Admit can help your facility capture more admissions calls.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="demo" className="py-16 lg:py-24 bg-primary">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/15 text-primary-foreground text-sm font-extrabold mb-5">
              <Building2 className="w-4 h-4" />
              For Behavioral Health Providers
            </span>
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-extrabold text-primary-foreground leading-[1.2] text-balance">
              Request a Demo for Your Facility
            </h2>
            <p className="mt-5 text-base text-primary-foreground/70 leading-relaxed max-w-2xl mx-auto">
              See how Beacon Admit fits your program. Tell us about your facility and we'll walk you through a personalized demo.
            </p>
          </div>

          {/* Form card */}
          <div className="max-w-xl mx-auto bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Row 1: Name + Email */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary-foreground/70 text-sm font-bold flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          Full Name
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Jane Smith"
                            className="h-12 bg-background/90 border-0 focus:ring-2 focus:ring-accent/50 rounded-xl px-4"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary-foreground/70 text-sm font-bold flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5" />
                          Work Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="jane@facility.com"
                            className="h-12 bg-background/90 border-0 focus:ring-2 focus:ring-accent/50 rounded-xl px-4"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Row 2: Organization */}
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground/70 text-sm font-bold flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5" />
                        Organization / Facility
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Recovery Centers of America"
                          className="h-12 bg-background/90 border-0 focus:ring-2 focus:ring-accent/50 rounded-xl px-4"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Row 3: Program Type + Coverage Need */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="programType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary-foreground/70 text-sm font-bold">
                          Program Type
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-background/90 border-0 focus:ring-2 focus:ring-accent/50 rounded-xl px-4">
                              <SelectValue placeholder="Select program" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {PROGRAM_TYPES.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="coverageNeed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-primary-foreground/70 text-sm font-bold">
                          Coverage Need
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="h-12 bg-background/90 border-0 focus:ring-2 focus:ring-accent/50 rounded-xl px-4">
                              <SelectValue placeholder="When do you need help?" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {COVERAGE_NEEDS.map((need) => (
                              <SelectItem key={need.value} value={need.value}>
                                {need.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                {/* Row 4: Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-primary-foreground/70 text-sm font-bold flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5" />
                        Anything else? (optional)
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your current admissions workflow, pain points, or questions..."
                          className="min-h-[100px] bg-background/90 border-0 focus:ring-2 focus:ring-accent/50 rounded-xl px-4 py-3 resize-none"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 gap-2 bg-gradient-to-r from-accent to-[oklch(0.45_0.10_185)] text-white text-lg font-extrabold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/30"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Request Facility Demo
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <p className="text-xs text-primary-foreground/40 text-center mt-5">
              No spam. We'll only reach out to schedule your demo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
