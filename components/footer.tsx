import Link from "next/link"
import { ShieldCheck } from "lucide-react"

const footerLinks = {
  product: [
    { label: "Features", href: "#solution" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "ROI Calculator", href: "#roi" },
    { label: "FAQ", href: "#faq" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Contact", href: "#demo" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "BAA Information", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="py-12 lg:py-16 bg-primary text-primary-foreground">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">BA</span>
              </div>
              <span className="font-semibold text-lg text-primary-foreground">Beacon Admit</span>
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/70 leading-relaxed">
              24/7 admissions coverage for behavioral health programs that cannot afford to miss calls.
            </p>
            
            {/* Trust badge */}
            <div className="mt-6 flex items-center gap-2 text-primary-foreground/60">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs">HIPAA-Conscious Design</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-primary-foreground mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/60">
            &copy; {new Date().getFullYear()} Beacon Admit. All rights reserved.
          </p>
          <p className="text-xs text-primary-foreground/50">
            Beacon Admit is not a clinical provider and does not provide medical advice or diagnoses.
          </p>
        </div>
      </div>
    </footer>
  )
}
