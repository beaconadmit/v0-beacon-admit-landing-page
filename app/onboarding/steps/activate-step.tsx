"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Phone,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { useState, useEffect } from "react";
import { FacilityConfig } from "../wizard";

interface ActivateStepProps {
  config: FacilityConfig;
  setConfig: (config: FacilityConfig) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function ActivateStep({
  config,
  setConfig,
  onNext,
  onPrevious,
}: ActivateStepProps) {
  const [status, setStatus] = useState<
    "ready" | "activating" | "success" | "error"
  >("ready");
  const [error, setError] = useState("");
  const [activationDetails, setActivationDetails] = useState<{
    phone_number: string;
    agent_id: string;
    dashboard_url: string;
  } | null>(null);

  const handleActivate = async () => {
    setStatus("activating");
    setError("");

    try {
      // Final save/provisioning is owned by the wizard so it can use the
      // invite-token-protected clinic route and the server-side admin proxy.
      await Promise.resolve(onNext());
    } catch (err: any) {
      console.error("Activation error:", err);
      setError(err.message || "Failed to activate. Please try again.");
      setStatus("error");
    }
  };

  const handleComplete = () => {
    // Redirect to dashboard
    window.location.href = activationDetails?.dashboard_url || "/dashboard";
  };

  // Validation check
  const isConfigComplete = (): boolean => {
    return (
      !!config.facility_profile.facility_name &&
      !!config.facility_profile.primary_address &&
      config.hours_availability.business_hours_by_day !== undefined &&
      !!config.warm_transfer_rules.primary_transfer_number
    );
  };

  if (status === "success" && activationDetails) {
    return (
      <div className="space-y-6">
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-green-900">
                🎉 Your AI Agent is Live!
              </h3>

              <Card className="p-6 bg-white">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900">AI Agent Details</h4>
                    <dl className="mt-2 space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-sm text-gray-600">Phone Number:</dt>
                        <dd className="text-sm font-mono font-medium">
                          {activationDetails.phone_number}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-gray-600">Agent ID:</dt>
                        <dd className="text-sm font-mono font-medium">
                          {activationDetails.agent_id}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-gray-600">Status:</dt>
                        <dd className="text-sm font-medium text-green-600">
                          Active
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <Alert>
                    <Phone className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <p className="font-medium">Next Steps:</p>
                        <ol className="list-decimal list-inside space-y-1 text-sm">
                          <li>Forward your after-hours calls to: <code className="font-mono font-medium">{activationDetails.phone_number}</code></li>
                          <li>Test the AI agent by calling the number above</li>
                          <li>View analytics in your dashboard</li>
                        </ol>
                      </div>
                    </AlertDescription>
                  </Alert>
                </div>
              </Card>

              <div className="flex gap-2">
                <Button onClick={handleComplete} className="flex-1">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {status === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Configuration Summary */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-semibold">Configuration Summary</h3>

        <div className="space-y-6">
          {/* Facility Profile */}
          <div>
            <h4 className="mb-2 font-medium text-gray-900">
              Facility Profile
            </h4>
            <dl className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <dt className="text-gray-600">Name:</dt>
                <dd className="font-medium">
                  {config.facility_profile.facility_name || "[Not set]"}
                </dd>
              </div>
              <div>
                <dt className="text-gray-600">Phone:</dt>
                <dd className="font-medium">
                  {config.facility_profile.main_phone || "[Not set]"}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-gray-600">Address:</dt>
                <dd className="font-medium">
                  {config.facility_profile.primary_address || "[Not set]"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="border-t pt-4">
            <h4 className="mb-2 font-medium text-gray-900">
              Services & Programs
            </h4>
            <div className="flex flex-wrap gap-2">
              {config.services_programs.detox_available && (
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                  Detox
                </span>
              )}
              {config.services_programs.residential_available && (
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                  Residential
                </span>
              )}
              {config.services_programs.php_available && (
                <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                  PHP
                </span>
              )}
              {config.services_programs.iop_available && (
                <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800">
                  IOP
                </span>
              )}
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="mb-2 font-medium text-gray-900">
              Warm Transfer
            </h4>
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-600">Primary Number:</dt>
                <dd className="font-mono font-medium">
                  {config.warm_transfer_rules.primary_transfer_number || "[Not set]"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-600">Backup Number:</dt>
                <dd className="font-mono font-medium">
                  {config.warm_transfer_rules.backup_transfer_number || "Not configured"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="border-t pt-4">
            <h4 className="mb-2 font-medium text-gray-900">
              Compliance Scripts
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Opening Disclosure configured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Medical Disclaimer configured</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>Emergency Escalation configured</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Activation Warning */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          <div className="space-y-2">
            <p className="font-medium">Before activating:</p>
            <ul className="list-inside list-decimal space-y-1 text-sm">
              <li>Ensure your facility's after-hours process is documented</li>
              <li>Verify the transfer numbers are correct</li>
              <li>Test the AI agent using the "Test Call" step</li>
              <li>Review compliance scripts for accuracy</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>

      {/* Activation Button */}
      <Card className="p-6">
        <div className="space-y-4 text-center">
          <ShieldCheck className="mx-auto h-12 w-12 text-green-600" />
          <div>
            <h3 className="text-lg font-semibold">Ready to Activate?</h3>
            <p className="mt-1 text-sm text-gray-600">
              Click the button below to provision your AI agent and activate phone
              routing. This will make your agent live.
            </p>
          </div>

          {!isConfigComplete() && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Please complete all required configuration steps before activating.
              </AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleActivate}
            disabled={status === "activating" || !isConfigComplete()}
            className="w-full"
            size="lg"
          >
            {status === "activating" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Activating...
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Activate AI Agent
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500">
            By activating, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </Card>
    </div>
  );
}
