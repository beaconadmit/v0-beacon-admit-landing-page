'use client'

import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

export function ExportButton({ label, href }: { label: string; href: string }) {
  return (
    <Button variant="outline" size="sm" asChild>
      <a href={href} download>
        <Download className="mr-2 h-4 w-4" />
        Export {label} to CSV
      </a>
    </Button>
  )
}
