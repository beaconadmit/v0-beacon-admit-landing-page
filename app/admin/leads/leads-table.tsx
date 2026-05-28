'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

export function LeadsTable({ leads }: { leads: any[] }) {
  if (leads.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center text-sm text-gray-400">
        No leads found.
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Facility</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leads.map(lead => (
            <TableRow key={lead.id}>
              <TableCell className="font-medium">{lead.name}</TableCell>
              <TableCell>{lead.email}</TableCell>
              <TableCell>{lead.facility ?? '-'}</TableCell>
              <TableCell>
                {lead.facility_type ? (
                  <Badge variant="outline">{lead.facility_type}</Badge>
                ) : (
                  '-'
                )}
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {format(new Date(lead.created_at), 'MMM d, yyyy')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
