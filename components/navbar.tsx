"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#problem", label: "Problem" },
  { href: "#solution", label: "Solution" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#roi", label: "ROI Calculator" },
  { href: "#faq", label: "FAQ" },
]

interface NavbarProps {
  onTalkToAgent: () => void
}

export function Navbar({ onTalkToAgent }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-200",
        scrolled 
          ? "bg-card/95 backdrop-blur-sm shadow-sm border-b border-border" 
          : "bg-transparent"
      )}
    >
      <nav className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image
                src="/beacon_admit_logo.png"
                alt="Beacon Admit logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="font-semibold text-lg text-foreground">Beacon Admit</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button size="sm" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground gap-2">
              <Link href="#demo">Get Early Access</Link>
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onTalkToAgent} 
              className="gap-2 text-primary hover:text-primary hover:bg-primary/10"
            >
              <Phone className="w-4 h-4" />
              Try AI Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border bg-card">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors px-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  <Button size="sm" asChild className="w-full justify-center bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="#demo" onClick={() => setMobileMenuOpen(false)}>Get Early Access</Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => { onTalkToAgent(); setMobileMenuOpen(false) }} 
                    className="gap-2 w-full justify-center border-primary text-primary hover:bg-primary/10"
                  >
                    <Phone className="w-4 h-4" />
                    Try AI Demo
                  </Button>
                </div>
              </div>
            </div>
          )}
      </nav>
    </header>
  )
}
