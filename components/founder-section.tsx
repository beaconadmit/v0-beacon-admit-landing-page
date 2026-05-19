"use client"

import React from "react"
import { Quote } from "lucide-react"

// AVATAR — put a real headshot at /public/founder-avatar.jpg to show it here
const FOUNDER_AVATAR = "/founder-avatar.jpg"
const FOUNDER_INITIALS = "B"

function FounderPhoto() {
  const [imgOk, setImgOk] = React.useState(false)

  React.useEffect(() => {
    const img = new window.Image()
    img.onload = () => setImgOk(true)
    img.onerror = () => setImgOk(false)
    img.src = FOUNDER_AVATAR
  }, [])

  if (imgOk) {
    return (
      <div className="w-14 h-14 rounded-full overflow-hidden border border-accent/20 flex-shrink-0">
        <img
          src={FOUNDER_AVATAR}
          alt="Beacon Admit founder"
          width={56}
          height={56}
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  return (
    <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
      <span className="text-accent font-semibold text-lg tracking-tight">{FOUNDER_INITIALS}</span>
    </div>
  )
}

export function FounderSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-[clamp(1.75rem,4vw,2.25rem)] font-semibold text-foreground leading-[1.2] text-balance">
              Built by Operators Who Understand Behavioral Health Admissions
            </h2>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 lg:p-10">
            <div className="flex items-start gap-6">
              <FounderPhoto />

              <div className="flex-1">
                {/* Blockquote */}
                <div className="relative">
                  <Quote className="w-8 h-8 text-accent/25 absolute -top-1 -left-1" aria-hidden="true" />
                  <blockquote className="pl-6">
                    <p className="text-base text-muted-foreground leading-relaxed italic mb-4">
                      &ldquo;I&#39;ve seen admissions teams lose the equivalent of one full month&#39;s worth of qualified leads simply because calls went to voicemail after 4 PM — or because no one picked up during the lunch rush. Those families call the next facility and are never heard from again. That&#39;s the gap Beacon Admit was built to close.&rdquo;
                    </p>
                  </blockquote>
                </div>

                <div className="mt-6 pt-5 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Beacon Admit was created by a team with hands-on experience in behavioral health operations, 
                    substance use treatment admissions, and startup treatment center consulting. The product is 
                    designed around the real-world admissions problems small and mid-sized programs face every day: 
                    <span className="font-medium text-foreground"> speed-to-lead</span>,{" "}
                    <span className="font-medium text-foreground">staffing gaps</span>, caller anxiety, insurance 
                    friction, and inconsistent follow-up.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
