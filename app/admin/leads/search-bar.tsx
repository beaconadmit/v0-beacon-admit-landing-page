'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, X } from 'lucide-react'
import { useState } from 'react'

export function SearchBar({ initialQuery }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery ?? '')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  function handleSearch(value: string) {
    setQuery(value)
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set('q', value)
    } else {
      params.delete('q')
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="relative w-64">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
      <Input
        placeholder="Search leads..."
        value={query}
        onChange={e => handleSearch(e.target.value)}
        className="pl-8"
      />
      {query && (
        <button
          onClick={() => handleSearch('')}
          className="absolute right-2 top-2.5"
        >
          <X className="h-4 w-4 text-gray-400" />
        </button>
      )}
    </div>
  )
}
