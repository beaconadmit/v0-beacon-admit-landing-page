"use client";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Hospital } from "lucide-react";
import { FacilityConfig } from "../wizard";

const LEVELS_OF_CARE = [
  { value: "Detox", label: "Detoxification" },
  { value: "Residential", label: "Residential Treatment" },
  { value: "PHP", label: "Partial Hospitalization (PHP)" },
  { value: "IOP", label: "Intensive Outpatient (IOP)" },
  { value: "OP", label: "Outpatient (OP)" },
  { value: "Sober_Living", label: "Sober Living" },
  { value: "MAT", label: "Medication-Assisted Treatment" },
];

interface ServicesProgramsStepProps {
  config: FacilityConfig;
  setConfig: (config: FacilityConfig) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function ServicesProgramsStep({
  config,
  setConfig,
  onNext,
  onPrevious,
}: ServicesProgramsStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleServiceToggle = (service: string) => {
    const current = config.services_programs.accepted_levels_of_care;
    const updated = current.includes(service)
      ? current.filter((s) => s !== service)
      : [...current, service];

    setConfig({
      ...config,
      services_programs: {
        ...config.services_programs,
        accepted_levels_of_care: updated,
      },
    });
  };

  const handleBooleanChange = (field: string, value: boolean) => {
    setConfig({
      ...config,
      services_programs: {
        ...config.services_programs,
        [field]: value,
      },
    });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (
      !config.services_programs.detox_available &&
      !config.services_programs.residential_available &&
      !config.services_programs.php_available &&
      !config.services_programs.iop_available
    ) {
      newErrors.services = "At least one service must be available";
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
          <AlertDescription>Please select at least one service.</AlertDescription>
        </Alert>
      )}

      {/* Available Services */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Available Services</h3>
          <p className="text-sm text-gray-600 mb-4">
            Select all services that your facility offers.
          </p>
        </div>

        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="detox"
                checked={config.services_programs.detox_available}
                onCheckedChange={(checked) =>
                  handleBooleanChange("detox_available", checked as boolean)
                }
              />
              <Label htmlFor="detox" className="font-normal cursor-pointer flex-1">
                <div>
                  <p className="font-medium">Detoxification Services</p>
                  <p className="text-sm text-gray-500">
                    Medical detox with 24/7 monitoring
                  </p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="residential"
                checked={config.services_programs.residential_available}
                onCheckedChange={(checked) =>
                  handleBooleanChange("residential_available", checked as boolean)
                }
              />
              <Label htmlFor="residential" className="font-normal cursor-pointer flex-1">
                <div>
                  <p className="font-medium">Residential Treatment</p>
                  <p className="text-sm text-gray-500">
                    Live-in treatment program (30-90 days)
                  </p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="php"
                checked={config.services_programs.php_available}
                onCheckedChange={(checked) =>
                  handleBooleanChange("php_available", checked as boolean)
                }
              />
              <Label htmlFor="php" className="font-normal cursor-pointer flex-1">
                <div>
                  <p className="font-medium">Partial Hospitalization (PHP)</p>
                  <p className="text-sm text-gray-500">
                    Intensive daytime treatment (5-7 days/week)
                  </p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="iop"
                checked={config.services_programs.iop_available}
                onCheckedChange={(checked) =>
                  handleBooleanChange("iop_available", checked as boolean)
                }
              />
              <Label htmlFor="iop" className="font-normal cursor-pointer flex-1">
                <div>
                  <p className="font-medium">Intensive Outpatient (IOP)</p>
                  <p className="text-sm text-gray-500">
                    Evening/weekend treatment (3-5 days/week)
                  </p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox
                id="dual_diagnosis"
                checked={config.services_programs.dual_diagnosis_available}
                onCheckedChange={(checked) =>
                  handleBooleanChange("dual_diagnosis_available", checked as boolean)
                }
              />
              <Label htmlFor="dual_diagnosis" className="font-normal cursor-pointer flex-1">
                <div>
                  <p className="font-medium">Dual Diagnosis Treatment</p>
                  <p className="text-sm text-gray-500">
                    Co-occurring mental health + SUD treatment
                  </p>
                </div>
              </Label>
            </div>
          </div>
        </Card>
      </div>

      {/* Levels of Care Accepted */}
      <div className="space-y-4 pt-6 border-t">
        <div>
          <h3 className="text-lg font-semibold mb-2">Levels of Care Accepted</h3>
          <p className="text-sm text-gray-600 mb-4">
            Which levels of care can your facility accept referrals for?
          </p>
        </div>

        <Card className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {LEVELS_OF_CARE.map((level) => (
              <div key={level.value} className="flex items-center space-x-2">
                <Checkbox
                  id={`level-${level.value}`}
                  checked={config.services_programs.accepted_levels_of_care.includes(
                    level.value
                  )}
                  onCheckedChange={() => handleServiceToggle(level.value)}
                />
                <Label
                  htmlFor={`level-${level.value}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {level.label}
                </Label>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Additional Services */}
      <div className="space-y-4 pt-6 border-t">
        <h3 className="text-lg font-semibold">Additional Services</h3>

        <Card className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-normal cursor-pointer">
                Adult Program (18+)
              </Label>
              <p className="text-sm text-gray-500">
                Treat adults ages 18 and older
              </p>
            </div>
            <Checkbox
              checked={config.services_programs.adult_program}
              onCheckedChange={(checked) =>
                setConfig({
                  ...config,
                  services_programs: {
                    ...config.services_programs,
                    adult_program: checked as boolean,
                  },
                })
              }
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="space-y-1">
              <Label className="font-normal cursor-pointer">
                Transportation Assistance
              </Label>
              <p className="text-sm text-gray-500">
                Help patients arrange transportation to facility
              </p>
            </div>
            <Checkbox
              checked={config.services_programs.transportation_available}
              onCheckedChange={(checked) =>
                setConfig({
                  ...config,
                  services_programs: {
                    ...config.services_programs,
                    transportation_available: checked as boolean,
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
          <Hospital className="h-5 w-5 text-green-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-semibold text-green-900">Services Summary</p>
            <ul className="mt-2 space-y-1 text-green-800">
              {config.services_programs.detox_available && (
                <li>✓ Detoxification services available</li>
              )}
              {config.services_programs.residential_available && (
                <li>✓ Residential treatment available</li>
              )}
              {config.services_programs.php_available && (
                <li>✓ PHP program available</li>
              )}
              {config.services_programs.iop_available && (
                <li>✓ IOP program available</li>
              )}
              {config.services_programs.dual_diagnosis_available && (
                <li>✓ Dual diagnosis treatment available</li>
              )}
              {config.services_programs.accepted_levels_of_care.length > 0 && (
                <li>
                  Accepts:{" "}
                  {config.services_programs.accepted_levels_of_care.join(", ")}
                </li>
              )}
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Add useState import
import { useState } from "react";
