"use client"

import { useState, useMemo } from "react"
import { Calculator, DollarSign, TrendingUp, ArrowRight } from "lucide-react"
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
  const [isAnimated, setIsAnimated] = useState(false)

  const results = useMemo(() => {
    const qualifiedInquiries = (missedCalls * qualifiedRate) / 100
    const potentialAdmissions = (qualifiedInquiries * conversionRate) / 100
    const monthlyRevenue = potentialAdmissions * admissionValue
    const annualRevenue = monthlyRevenue * 12
    const beaonCost = 3000 // Estimated monthly cost
    const netMonthly = monthlyRevenue - beaonCost
    const roi = beaonCost > 0 ? ((monthlyRevenue - beaonCost) / beaonCost) * 100 : 0

    return {
      qualifiedInquiries: Math.round(qualifiedInquiries * 10) / 10,
      potentialAdmissions: Math.round(potentialAdmissions * 10) / 10,
      monthlyRevenue: Math.round(monthlyRevenue),
      annualRevenue: Math.round(annualRevenue),
      netMonthly: Math.round(netMonthly),
      roi: Math.round(roi)
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
    <section id="roi" className="py-20 lg:py-32 bg-gradient-to-b from-background to-accent/5 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, oklch(0.28 0.08 250) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold mb-6">
            <Calculator className="w-4 h-4" />
            ROI Calculator
          </div>
          <h2 className="text-[clamp(2rem,5vw,3rem)] font-bold text-foreground leading-[1.1] text-balance">
            Calculate Your <span className="text-accent">Lost Revenue</span> From Missed Calls
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            See exactly how much revenue walks out the door when calls go unanswered. 
            Most facilities are shocked by the numbers.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Inputs - Left Side */}
            <div className="bg-card border border-border rounded-2xl p-8 space-y-8 shadow-sm roi-calculator-glow">
              <div className="flex items-center gap-3 pb-4 border-b border-border">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Your Facility Data</h3>
                  <p className="text-sm text-muted-foreground">Adjust the sliders to match your situation</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="missed-calls" className="text-base text-foreground font-semibold">
                      Monthly Missed Calls
                    </Label>
                    <span className="text-2xl font-bold text-accent">{missedCalls}</span>
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
                  <p className="text-xs text-muted-foreground">Calls that go to voicemail or get missed after hours</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="qualified-rate" className="text-base text-foreground font-semibold">
                      Qualified Inquiry Rate
                    </Label>
                    <span className="text-2xl font-bold text-accent">{qualifiedRate}%</span>
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
                  <p className="text-xs text-muted-foreground">Percentage of callers who qualify for your program</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="conversion-rate" className="text-base text-foreground font-semibold">
                      Admission Conversion Rate
                    </Label>
                    <span className="text-2xl font-bold text-accent">{conversionRate}%</span>
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
                  <p className="text-xs text-muted-foreground">Percentage of qualified inquiries that convert to admissions</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="admission-value" className="text-base text-foreground font-semibold">
                      Average Admission Value
                    </Label>
                    <span className="text-2xl font-bold text-accent">{formatCurrency(admissionValue)}</span>
                  </div>
                  <Input
                    id="admission-value"
                    type="number"
                    value={admissionValue}
                    onChange={(e) => setAdmissionValue(Number(e.target.value) || 0)}
                    min={1000}
                    max={100000}
                    step={1000}
                    className="bg-background border-input text-lg font-semibold"
                  />
                  <p className="text-xs text-muted-foreground">Average revenue per patient admission (including length of stay)</p>
                </div>
              </div>
            </div>

            {/* Results - Right Side */}
            <div className="bg-gradient-to-br from-accent/5 via-accent/8 to-primary/5 border border-accent/20 rounded-2xl p-8 space-y-6 shadow-lg">
              <div className="flex items-center gap-3 pb-4 border-b border-accent/20">
                <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Revenue Opportunity</h3>
                  <p className="text-sm text-muted-foreground">Based on your inputs above</p>
                </div>
              </div>

              <div className="space-y-5">
                <div className="p-5 rounded-xl bg-card border border-border hover:shadow-md transition-shadow">
                  <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    Qualified Inquiries/Month
                  </div>
                  <div className="text-3xl font-bold text-foreground">{results.qualifiedInquiries}</div>
                </div>

                <div className="p-5 rounded-xl bg-card border border-border hover:shadow-md transition-shadow">
                  <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    Potential Admissions/Month
                  </div>
                  <div className="text-3xl font-bold text-foreground">{results.potentialAdmissions}</div>
                </div>

                <div className="p-5 rounded-xl bg-accent/10 border border-accent/30 hover:shadow-md transition-shadow">
                  <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-accent" />
                    Monthly Revenue Opportunity
                  </div>
                  <div className="text-4xl font-bold text-accent">{formatCurrency(results.monthlyRevenue)}</div>
                </div>

                <div className="p-5 rounded-xl bg-primary/10 border border-primary/30 hover:shadow-md transition-shadow">
                  <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    Annual Revenue Opportunity
                  </div>
                  <div className="text-5xl font-bold text-primary">{formatCurrency(results.annualRevenue)}</div>
                </div>

                {results.roi > 0 && (
                  <div className="p-5 rounded-xl bg-success/10 border border-success/30">
                    <div className="text-sm text-muted-foreground mb-2">Estimated Monthly ROI</div>
                    <div className="text-3xl font-bold text-success">{results.roi}%</div>
                    <p className="text-xs text-muted-foreground mt-2">After accounting for Beacon Admit costs (~$3k/mo)</p>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-accent/20">
                <p className="text-xs text-muted-foreground text-center">
                  * Estimates based on industry averages. Actual results vary by facility.
                </p>
              </div>

              <Button asChild size="lg" className="w-full gap-2 bg-accent hover:bg-[oklch(0.45_0.10_185)] text-accent-foreground text-base font-semibold h-14 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20">
                <Link href="#demo">
                  See How We Recover This Revenue
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Trust Indicator */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Join 50+ facilities already calculating their recovery with Beacon Admit
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
