"use client"

import { useState, useMemo } from "react"
import { Calculator, DollarSign, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

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
    <section id="roi" className="py-20 lg:py-32 bg-card/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
            <Calculator className="w-4 h-4" />
            ROI Calculator
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            One Recovered Admission Can Pay for the System Many Times Over
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            For many behavioral health programs, even one additional admission per month can represent significant revenue. Beacon Admit is built to help recover opportunities that are currently lost to missed calls, slow follow-up, or inconsistent intake coverage.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="bg-background border border-border rounded-2xl p-6 space-y-8">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Calculator className="w-5 h-5 text-primary" />
                Your Numbers
              </h3>

              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="missed-calls" className="text-sm text-foreground">
                      Average Monthly Missed Calls
                    </Label>
                    <span className="text-sm font-semibold text-primary">{missedCalls}</span>
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
                    <Label htmlFor="qualified-rate" className="text-sm text-foreground">
                      Estimated Qualified Inquiry Rate
                    </Label>
                    <span className="text-sm font-semibold text-primary">{qualifiedRate}%</span>
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
                    <Label htmlFor="conversion-rate" className="text-sm text-foreground">
                      Estimated Admission Conversion Rate
                    </Label>
                    <span className="text-sm font-semibold text-primary">{conversionRate}%</span>
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
                    <Label htmlFor="admission-value" className="text-sm text-foreground">
                      Average Value Per Admission
                    </Label>
                    <span className="text-sm font-semibold text-primary">{formatCurrency(admissionValue)}</span>
                  </div>
                  <Input
                    id="admission-value"
                    type="number"
                    value={admissionValue}
                    onChange={(e) => setAdmissionValue(Number(e.target.value) || 0)}
                    min={1000}
                    max={100000}
                    step={1000}
                    className="bg-card"
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 space-y-6">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Potential Recovery
              </h3>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-background/50 border border-border">
                  <div className="text-sm text-muted-foreground">Qualified Inquiries per Month</div>
                  <div className="text-2xl font-bold text-foreground">{results.qualifiedInquiries}</div>
                </div>

                <div className="p-4 rounded-xl bg-background/50 border border-border">
                  <div className="text-sm text-muted-foreground">Potential Admissions per Month</div>
                  <div className="text-2xl font-bold text-foreground">{results.potentialAdmissions}</div>
                </div>

                <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Estimated Monthly Revenue Opportunity
                  </div>
                  <div className="text-3xl font-bold text-primary">{formatCurrency(results.monthlyRevenue)}</div>
                </div>

                <div className="p-4 rounded-xl bg-primary/20 border border-primary/40">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
