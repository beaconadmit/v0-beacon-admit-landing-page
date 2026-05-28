"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowRight, CheckCircle, Loader2, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const facilityTypes = [
  "Detox",
  "Residential Treatment",
  "PHP (Partial Hospitalization)",
  "IOP (Intensive Outpatient)",
  "Outpatient",
  "Mental Health Residential",
  "Dual Diagnosis",
  "Other",
]

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  facility: z.string().optional(),
  facilityType: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

export function DemoFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

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
      facility: "",
      facilityType: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to submit")
      
      setIsSubmitted(true)
    } catch (error) {
      console.error("Form submission error:", error)
      alert("Failed to submit. Please try again.")
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
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
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
          <div className="text-center mb-10">
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold text-primary-foreground leading-[1.2] text-balance">
              Get Early Access to Beacon Admit
            </h2>
            <p className="mt-6 text-base text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
              Join programs already using AI to capture more admissions calls. See how Beacon Admit can work for your facility.
            </p>
          </div>

          {/* Simple form - just 2 fields */}
          <div className="max-w-xl mx-auto">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Your full name" 
                          className="h-14 text-lg bg-background/90 border-0 focus:ring-2 focus:ring-accent/50 rounded-xl px-6" 
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
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="Work email address" 
                          className="h-14 text-lg bg-background/90 border-0 focus:ring-2 focus:ring-accent/50 rounded-xl px-6" 
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Optional details - collapsible */}
                <button
                  type="button"
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground/80 transition-colors mx-auto"
                >
                  <span>{showDetails ? "Hide" : "Add"} facility details (optional)</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-180' : ''}`} />
                </button>

                {showDetails && (
                  <div className="space-y-4 pt-2">
                    <FormField
                      control={form.control}
                      name="facility"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="Facility name" 
                              className="h-12 bg-background/90 border-0 focus:ring-2 focus:ring-accent/50 rounded-xl px-6" 
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="facilityType"
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 bg-background/90 border-0 focus:ring-2 focus:ring-accent/50 rounded-xl px-6">
                                <SelectValue placeholder="Select facility type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {facilityTypes.map((type) => (
                                <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-14 gap-2 bg-accent hover:bg-[oklch(0.45_0.10_185)] text-accent-foreground text-lg font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Get Early Access
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <p className="text-xs text-primary-foreground/50 text-center mt-6">
              No spam. We'll only reach out to schedule your demo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
