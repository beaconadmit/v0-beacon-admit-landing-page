import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Inline CTA banner for blog posts — drives readers to the demo form or ROI calculator.
 */
export function CtaBanner() {
  return (
    <div className="my-10 rounded-xl p-6 sm:p-8 bg-gradient-to-br from-primary via-primary to-accent/80 text-white">
      <h3 className="text-xl font-extrabold mb-2">
        See how much revenue your facility is leaving on the table
      </h3>
      <p className="text-white/80 text-sm leading-relaxed mb-5 max-w-lg">
        Use our ROI calculator to model your missed-call revenue, or schedule a
        live demo to hear the AI agent in action.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          asChild
          className="gap-2 bg-white text-primary font-extrabold hover:bg-white/90 transition-all duration-200"
        >
          <Link href="/#roi">
            Calculate Your ROI
            <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="gap-2 border-white/40 text-white font-extrabold hover:bg-white/10 transition-all duration-200"
        >
          <Link href="/#demo">Request a Demo</Link>
        </Button>
      </div>
    </div>
  )
}
