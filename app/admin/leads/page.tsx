"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  Phone,
  MapPin,
  Building,
  RefreshCw,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Lead {
  id: string;
  facility_name: string;
  contact_name: string;
  email: string;
  phone: string;
  facility_type: string;
  bed_count: number | null;
  states_served: string[];
  current_after_hours: string | null;
  insurance_accepted: string[];
  status: string;
  clinic_id: string | null;
  created_at: string;
}

interface ConversionResult {
  success: boolean;
  clinic_id: string;
  clinic_name: string;
  clinic_user_id: string;
  invite_token: string;
  temporary_password: string;
  error?: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [conversionResult, setConversionResult] =
    useState<ConversionResult | null>(null);
  const [converting, setConverting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/leads", {
        method: "GET",
        cache: "no-store",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to load leads");
      }

      const result = await response.json();
      setLeads(result.data || []);
    } catch (err: any) {
      console.error("Error loading leads:", err);
      setError(err.message || "Failed to load leads");
    } finally {
      setLoading(false);
    }
  }

  async function convertLead(lead: Lead) {
    setConverting(true);
    setError("");
    setConversionResult(null);

    try {
      const response = await fetch("/api/admin/onboarding/convert-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lead_id: lead.id,
          requested_clinic_id: lead.facility_name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "_")
            .slice(0, 50),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to convert lead");
      }

      const result = await response.json();
      setConversionResult(result);

      // Reload leads to reflect updated status
      await loadLeads();
    } catch (err: any) {
      console.error("Error converting lead:", err);
      setError(err.message || "Failed to convert lead");
    } finally {
      setConverting(false);
    }
  }

  async function resendInvite(leadId: string) {
    try {
      const response = await fetch("/api/admin/onboarding/resend-invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lead_id: leadId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to resend invite");
      }

      alert("Invite resent successfully!");
    } catch (err: any) {
      console.error("Error resending invite:", err);
      alert(err.message || "Failed to resend invite");
    }
  }

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      !searchTerm ||
      lead.facility_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contact_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { variant: "default" | "secondary" | "destructive" | "outline"; color: string }
    > = {
      new: { variant: "default", color: "bg-blue-100 text-blue-800" },
      contacted: {
        variant: "secondary",
        color: "bg-yellow-100 text-yellow-800",
      },
      clinic_account_created: {
        variant: "default",
        color: "bg-green-100 text-green-800",
      },
      onboarding_started: {
        variant: "default",
        color: "bg-purple-100 text-purple-800",
      },
      onboarding_completed: {
        variant: "default",
        color: "bg-green-100 text-green-800",
      },
    };

    const config = statusConfig[status] || {
      variant: "outline",
      color: "bg-gray-100 text-gray-800",
    };

    return (
      <Badge className={config.color} variant={config.variant}>
        {status.replace(/_/g, " ")}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Leads Management
        </h1>
        <p className="text-sm text-gray-500">
          View and convert leads to clinic accounts.
        </p>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Filters */}
      <Card className="mb-6 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex-1">
            <Input
              placeholder="Search by facility, contact, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("all")}
            >
              All ({leads.length})
            </Button>
            <Button
              variant={statusFilter === "new" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter("new")}
            >
              New ({leads.filter((l) => l.status === "new").length})
            </Button>
            <Button
              variant={
                statusFilter === "clinic_account_created" ? "default" : "outline"
              }
              size="sm"
              onClick={() => setStatusFilter("clinic_account_created")}
            >
              Converted (
              {
                leads.filter((l) => l.status === "clinic_account_created")
                  .length
              }
              )
            </Button>
          </div>
        </div>
      </Card>

      {/* Leads Table */}
      <Card className="p-6">
        {filteredLeads.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500">No leads found.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Facility</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLeads.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">
                        {lead.facility_name}
                      </p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {lead.bed_count
                          ? `${lead.bed_count} beds`
                          : "Beds not specified"}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium">{lead.contact_name}</p>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {lead.email}
                      </p>
                      {lead.phone && (
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{lead.facility_type}</Badge>
                  </TableCell>
                  <TableCell>{getStatusBadge(lead.status)}</TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-500">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </p>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {lead.status === "new" && (
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedLead(lead);
                            convertLead(lead);
                          }}
                          disabled={converting}
                        >
                          {converting && selectedLead?.id === lead.id ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <RefreshCw className="mr-2 h-4 w-4" />
                          )}
                          Convert
                        </Button>
                      )}

                      {lead.status === "clinic_account_created" &&
                        !lead.clinic_id && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => resendInvite(lead.id)}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Resend Invite
                          </Button>
                        )}

                      {lead.clinic_id && (
                        <Badge variant="default" className="bg-green-100 text-green-800">
                          <CheckCircle2 className="mr-1 h-3 w-3" />
                          Activated
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Conversion Result Dialog */}
      {conversionResult && (
        <Dialog
          open={!!conversionResult}
          onOpenChange={() => setConversionResult(null)}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Lead Converted Successfully!</DialogTitle>
              <DialogDescription>
                Clinic account created. Share these credentials with the facility
                admin.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  <div className="space-y-2">
                    <p>
                      <strong>Clinic ID:</strong> {conversionResult.clinic_id}
                    </p>
                    <p>
                      <strong>Clinic Name:</strong> {conversionResult.clinic_name}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedLead?.email}
                    </p>
                    <div className="mt-2 rounded bg-white p-3">
                      <p className="text-sm font-medium">Temporary Password:</p>
                      <p className="font-mono text-lg font-bold">
                        {conversionResult.temporary_password}
                      </p>
                    </div>
                    <p className="mt-2 text-sm">
                      The admin will be prompted to change this password on first
                      login.
                    </p>
                  </div>
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  An invitation email has been sent to {selectedLead?.email} with
                  these credentials and the onboarding link.
                </AlertDescription>
              </Alert>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setConversionResult(null)}>
                Close
              </Button>
              <Button
                onClick={() => {
                  // Copy credentials to clipboard
                  const text = `
Clinic ID: ${conversionResult.clinic_id}
Email: ${selectedLead?.email}
Temporary Password: ${conversionResult.temporary_password}
Invite Link: ${process.env.NEXT_PUBLIC_DASHBOARD_URL}/accept-invite?token=${conversionResult.invite_token}
                  `.trim();

                  navigator.clipboard.writeText(text);
                  alert("Credentials copied to clipboard!");
                }}
              >
                Copy Credentials
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
