"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { FacilityConfig } from "../wizard";

const COMMON_INSURANCE = [
  { value: "Blue Cross Blue Shield", label: "Blue Cross Blue Shield" },
  { value: "Aetna", label: "Aetna" },
  { value: "Cigna", label: "Cigna" },
  { value: "UnitedHealthcare", label: "UnitedHealthcare" },
  { value: "Humana", label: "Humana" },
  { value: "Anthem", label: "Anthem" },
  { value: "Kaiser Permanente", label: "Kaiser Permanente" },
  { value: "Tricare", label: "Tricare" },
  { value: "Medicare", label: "Medicare" },
  { value: "Medicaid", label: "Medicaid" },
  { value: "Private Pay", label: "Private Pay (Self-Pay)" },
  { value: "Sliding Scale", label: "Sliding Scale" },
];

interface InsuranceSettingsStepProps {
  config: FacilityConfig;
  setConfig: (config: FacilityConfig) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function InsuranceSettingsStep({
  config,
  setConfig,
  onNext,
  onPrevious,
}: InsuranceSettingsStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [customCarrier, setCustomCarrier] = useState("");

  const handleInsuranceToggle = (carrier: string) => {
    const current = config.insurance_settings.accepted_insurance_carriers;
    const updated = current.includes(carrier)
      ? current.filter((c) => c !== carrier)
      : [...current, carrier];

    setConfig({
      ...config,
      insurance_settings: {
        ...config.insurance_settings,
        accepted_insurance_carriers: updated,
      },
    });
  };

  const handleBooleanChange = (field: string, value: boolean) => {
    setConfig({
      ...config,
      insurance_settings: {
        ...config.insurance_settings,
        [field]: value,
      },
    });
  };

  const addCustomCarrier = () => {
    if (
      customCarrier.trim() &&
      !config.insurance_settings.accepted_insurance_carriers.includes(
        customCarrier.trim()
      )
    ) {
      setConfig({
        ...config,
        insurance_settings: {
          ...config.insurance_settings,
          accepted_insurance_carriers: [
            ...config.insurance_settings.accepted_insurance_carriers,
            customCarrier.trim(),
          ],
        },
      });
      setCustomCarrier("");
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (
      !config.insurance_settings.commercial_insurance_accepted &&
      !config.insurance_settings.medicaid_accepted &&
      !config.insurance_settings.medicare_accepted &&
      !config.insurance_settings.private_pay_accepted
    ) {
      newErrors.insurance_types =
        "At least one insurance type must be accepted";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Please fix the errors below.</AlertDescription>
        </Alert>
      )}

      {/* Insurance Types Accepted */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Insurance Types Accepted</h3>
          <p className="text-sm text-gray-600 mb-4">
            Select all insurance types your facility accepts.
          </p>
        </div>

        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-normal cursor-pointer">
                Commercial Insurance
              </Label>
              <p className="text-sm text-gray-500">
                Private insurance companies (Blue Cross, Aetna, etc.)
              </p>
            </div>
            <Checkbox
              checked={
                config.insurance_settings.commercial_insurance_accepted
              }
              onCheckedChange={(checked) =>
                handleBooleanChange(
                  "commercial_insurance_accepted",
                  checked as boolean
                )
              }
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="space-y-1">
              <Label className="font-normal cursor-pointer">Medicaid</Label>
              <p className="text-sm text-gray-500">
                State-funded insurance for low-income individuals
              </p>
            </div>
            <Checkbox
              checked={config.insurance_settings.medicaid_accepted}
              onCheckedChange={(checked) =>
                handleBooleanChange(
                  "medicaid_accepted",
                  checked as boolean
                )
              }
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="space-y-1">
              <Label className="font-normal cursor-pointer">Medicare</Label>
              <p className="text-sm text-gray-500">
                Federal insurance for seniors (65+) and disabled
              </p>
            </div>
            <Checkbox
              checked={config.insurance_settings.medicare_accepted}
              onCheckedChange={(checked) =>
                handleBooleanChange(
                  "medicare_accepted",
                  checked as boolean
                )
              }
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="space-y-1">
              <Label className="font-normal cursor-pointer">
                Private Pay (Self-Pay)
              </Label>
              <p className="text-sm text-gray-500">
                Patients pay out-of-pocket
              </p>
            </div>
            <Checkbox
              checked={config.insurance_settings.private_pay_accepted}
              onCheckedChange={(checked) =>
                handleBooleanChange(
                  "private_pay_accepted",
                  checked as boolean
                )
              }
            />
          </div>
        </Card>
      </div>

      {/* Specific Insurance Carriers */}
      {config.insurance_settings.commercial_insurance_accepted && (
        <div className="space-y-4 pt-6 border-t">
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Accepted Insurance Carriers
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Select all commercial insurance carriers your facility is in-network
              with.
            </p>
          </div>

          <Card className="p-4">
            <div className="grid grid-cols-2 gap-3">
              {COMMON_INSURANCE.map((carrier) => (
                <div
                  key={carrier.value}
                  className="flex items-center space-x-2"
                >
                  <Checkbox
                    id={`carrier-${carrier.value}`}
                    checked={config.insurance_settings.accepted_insurance_carriers.includes(
                      carrier.value
                    )}
                    onCheckedChange={() => handleInsuranceToggle(carrier.value)}
                  />
                  <Label
                    htmlFor={`carrier-${carrier.value}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {carrier.label}
                  </Label>
                </div>
              ))}
            </div>
          </Card>

          {/* Custom Carrier Input */}
          <Card className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add custom insurance carrier..."
                value={customCarrier}
                onChange={(e) => setCustomCarrier(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCustomCarrier();
                  }
                }}
              />
              <Button onClick={addCustomCarrier} disabled={!customCarrier.trim()}>
                Add
              </Button>
            </div>

            {config.insurance_settings.accepted_insurance_carriers.length >
              0 && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">
                  Selected Carriers:
                </p>
                <div className="flex flex-wrap gap-2">
                  {config.insurance_settings.accepted_insurance_carriers.map(
                    (carrier) => (
                      <span
                        key={carrier}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                      >
                        {carrier}
                        <button
                          onClick={() => handleInsuranceToggle(carrier)}
                          className="ml-2 text-green-600 hover:text-green-800"
                        >
                          ×
                        </button>
                      </span>
                    )
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>
      )}

      {/* VOB Settings */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="text-lg font-semibold">
          Verification of Benefits (VOB)
        </h3>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-normal cursor-pointer">
                Require VOB Before Transfer
              </Label>
              <p className="text-sm text-gray-500">
                AI agent will attempt to verify insurance before transferring call
              </p>
            </div>
            <Checkbox
              checked={
                config.insurance_settings.vob_required_before_transfer
              }
              onCheckedChange={(checked) =>
                setConfig({
                  ...config,
                  insurance_settings: {
                    ...config.insurance_settings,
                    vob_required_before_transfer: checked as boolean,
                  },
                })
              }
            />
          </div>
        </Card>
      </div>

      {/* Summary */}
      <Card className="p-4 bg-green-50 border-green-200">
        <div className="flex items-start space-x-3">
          <ShieldCheck className="h-5 w-5 text-green-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-green-900">
              Insurance Summary
            </p>
            <ul className="mt-2 space-y-1 text-green-800">
              {config.insurance_settings.commercial_insurance_accepted && (
                <li>✓ Commercial insurance accepted</li>
              )}
              {config.insurance_settings.medicaid_accepted && (
                <li>✓ Medicaid accepted</li>
              )}
              {config.insurance_settings.medicare_accepted && (
                <li>✓ Medicare accepted</li>
              )}
              {config.insurance_settings.private_pay_accepted && (
                <li>✓ Private pay accepted</li>
              )}
              {config.insurance_settings.accepted_insurance_carriers.length >
                0 && (
                <li>
                  ✓ In-network with:{" "}
                  {config.insurance_settings.accepted_insurance_carriers
                    .slice(0, 3)
                    .join(", ")}
                  {config.insurance_settings.accepted_insurance_carriers
                    .length > 3 &&
                    ` +${config.insurance_settings.accepted_insurance_carriers.length - 3} more`}
                </li>
              )}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
