"use client"

import { useState, useMemo } from "react"
import { Calculator, DollarSign, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function ROICalculator() {
  const [missedCalls, setMissedCalls] = useState(50)
  const [qualifiedRate, setQualifiedRate] = useState(30)
  const [conversionRate, setConversionRate] = useState(20)
  const [admissionValue, setAdmissionValue] = useState(15000)

  const results = useMemo(() => {
    const qualifiedInquiries = (missedCalls * qualifiedRate) / 100
    const potentialAdmissions = (qualifiedInquiries * conversionRate) / 100
    const monthlyRevenue = potentialAdmissions * admissionValue
    const annualRevenue = monthlyRevenue * 12

    return {
      qualifiedInquiries: Math.round(qualifiedInquiries * 10) / 10,
      potentialAdmissions: Math.round(potentialAdmissions * 10) / 10,
      monthlyRevenue: Math.round(monthlyRevenue),
      annualRevenue: Math.round(annualRevenue)
    }
  }, [missedCalls, qualifiedRate, conversionRate, admissionValue])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <section id="roi" className="py-16 lg:py-24 bg-card">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
            <Calculator className="w-4 h-4" />
            ROI Calculator
          </div>
          <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold text-foreground leading-[1.2] text-balance">
            One Recovered Admission Can Pay for the System Many Times Over
          </h2>
          <p className="mt-6 text-base text-muted-foreground leading-relaxed">
            For many behavioral health programs, even one additional admission per month can represent significant revenue. Beacon Admit is built to help recover opportunities that are currently lost to missed calls, slow follow-up, or inconsistent intake coverage.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="bg-background border border-border rounded-xl p-6 space-y-8">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Calculator className="w-5 h-5 text-accent" />
                Your Numbers
              </h3>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="missed-calls" className="text-sm text-foreground font-medium">
                      Average Monthly Missed Calls
                    </Label>
                    <span className="text-sm font-semibold text-accent">{missedCalls}</span>
                  </div>
                  <Slider
                    id="missed-calls"
                    value={[missedCalls]}
                    onValueChange={(value) => setMissedCalls(value[0])}
                    max={200}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="qualified-rate" className="text-sm text-foreground font-medium">
                      Estimated Qualified Inquiry Rate
                    </Label>
                    <span className="text-sm font-semibold text-accent">{qualifiedRate}%</span>
                  </div>
                  <Slider
                    id="qualified-rate"
                    value={[qualifiedRate]}
                    onValueChange={(value) => setQualifiedRate(value[0])}
                    max={80}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="conversion-rate" className="text-sm text-foreground font-medium">
                      Estimated Admission Conversion Rate
                    </Label>
                    <span className="text-sm font-semibold text-accent">{conversionRate}%</span>
                  </div>
                  <Slider
                    id="conversion-rate"
                    value={[conversionRate]}
                    onValueChange={(value) => setConversionRate(value[0])}
                    max={50}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="admission-value" className="text-sm text-foreground font-medium">
                      Average Value Per Admission
                    </Label>
                    <span className="text-sm font-semibold text-accent">{formatCurrency(admissionValue)}</span>
                  </div>
                  <Input
                    id="admission-value"
                    type="number"
                    value={admissionValue}
                    onChange={(e) => setAdmissionValue(Number(e.target.value) || 0)}
                    min={1000}
                    max={100000}
                    step={1000}
                    className="bg-card border-input"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Potential Recovery
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-background border border-border">
                  <div className="text-sm text-muted-foreground">Qualified Inquiries per Month</div>
                  <div className="text-2xl font-bold text-foreground">{results.qualifiedInquiries}</div>
                </div>

                <div className="p-4 rounded-lg bg-background border border-border">
                  <div className="text-sm text-muted-foreground">Potential Admissions per Month</div>
                  <div className="text-2xl font-bold text-foreground">{results.potentialAdmissions}</div>
                </div>

                <div className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Estimated Monthly Revenue Opportunity
                  </div>
                  <div className="text-3xl font-bold text-accent">{formatCurrency(results.monthlyRevenue)}</div>
                </div>

                <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Estimated Annual Revenue Opportunity
                  </div>
                  <div className="text-4xl font-bold text-primary">{formatCurrency(results.annualRevenue)}</div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground">
                This is not a guarantee. It is a planning tool to help operators estimate the cost of missed admissions opportunities.
              </p>

              <Button asChild size="lg" className="w-full gap-2 bg-accent hover:bg-accent/90 text-accent-foreground mt-4">
                <Link href="#demo">
                  See How We Can Recover This for You
                  <TrendingUp className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
