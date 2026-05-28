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
import { Button } from '@/components/ui/button'
import { FileText, Play } from 'lucide-react'

export function CallsTable({ calls }: { calls: any[] }) {
  if (calls.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center text-sm text-gray-400">
        No calls yet.
      </div>
    )
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Facility</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Outcome</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calls.map(call => (
            <TableRow key={call.id}>
              <TableCell className="font-medium">
                {call.facility_name ?? '-'}
              </TableCell>
              <TableCell>
                <Badge variant={call.call_status === 'ended' ? 'default' : 'secondary'}>
                  {call.call_status ?? 'unknown'}
                </Badge>
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {call.call_outcome ?? '-'}
              </TableCell>
              <TableCell className="text-sm">
                {call.duration_seconds
                  ? `${Math.round(call.duration_seconds / 60)}m`
                  : '-'}
              </TableCell>
              <TableCell className="text-sm text-gray-500">
                {format(new Date(call.created_at), 'MMM d, yyyy')}
              </TableCell>
              <TableCell className="flex gap-1">
                {call.recording_url && (
                  <Button variant="ghost" size="icon" asChild>
                    <a href={call.recording_url} target="_blank" rel="noopener noreferrer">
                      <Play className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {call.transcript && (
                  <Button variant="ghost" size="icon">
                    <FileText className="h-4 w-4" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
