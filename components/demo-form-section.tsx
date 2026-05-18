"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const programTypes = [
  "Detox",
  "Residential Treatment",
  "PHP (Partial Hospitalization)",
  "IOP (Intensive Outpatient)",
  "Outpatient",
  "Mental Health Residential",
  "Dual Diagnosis",
  "Other"
]

const biggestIssues = [
  "Missed calls",
  "Slow follow-up",
  "Insurance screening",
  "After-hours coverage",
  "Other"
]

export function DemoFormSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
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
              Thank You!
            </h2>
            <p className="text-lg text-primary-foreground/80">
              We&apos;ve received your request and will be in touch within 24 hours to schedule your demo.
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
              Hear What a 24/7 AI Admissions Coordinator Could Sound Like for Your Program
            </h2>
            <p className="mt-6 text-base text-primary-foreground/80 leading-relaxed max-w-2xl mx-auto">
              We&apos;ll walk through your current admissions process, identify where leads are being lost, and show how Beacon Admit can answer calls, qualify inquiries, and alert your team.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 lg:p-8 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-medium">Name</Label>
                  <Input 
                    id="name" 
                    placeholder="John Smith" 
                    required 
                    className="h-12 bg-background border-input focus:border-accent focus:ring-accent" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-medium">Work Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@facility.com" 
                    required 
                    className="h-12 bg-background border-input focus:border-accent focus:ring-accent" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground font-medium">Phone</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="(555) 123-4567" 
                    required 
                    className="h-12 bg-background border-input focus:border-accent focus:ring-accent" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facility" className="text-foreground font-medium">Facility Name</Label>
                  <Input 
                    id="facility" 
                    placeholder="Recovery Center" 
                    required 
                    className="h-12 bg-background border-input focus:border-accent focus:ring-accent" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="program-type" className="text-foreground font-medium">Program Type</Label>
                  <Select required>
                    <SelectTrigger id="program-type" className="h-12 bg-background border-input focus:border-accent focus:ring-accent">
                      <SelectValue placeholder="Select program type" />
                    </SelectTrigger>
                    <SelectContent>
                      {programTypes.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, '-')}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inquiries" className="text-foreground font-medium">Average Monthly Admissions Inquiries</Label>
                  <Input 
                    id="inquiries" 
                    type="number" 
                    placeholder="50" 
                    className="h-12 bg-background border-input focus:border-accent focus:ring-accent" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="biggest-issue" className="text-foreground font-medium">Biggest Issue</Label>
                <Select>
                  <SelectTrigger id="biggest-issue" className="h-12 bg-background border-input focus:border-accent focus:ring-accent">
                    <SelectValue placeholder="Select your biggest challenge" />
                  </SelectTrigger>
                  <SelectContent>
                    {biggestIssues.map((issue) => (
                      <SelectItem key={issue} value={issue.toLowerCase().replace(/\s+/g, '-')}>
                        {issue}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full gap-2 h-12 bg-accent hover:bg-accent/90 text-accent-foreground text-base font-semibold" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Get a Demo
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
