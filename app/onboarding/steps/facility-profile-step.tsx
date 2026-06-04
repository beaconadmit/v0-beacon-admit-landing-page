"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { FacilityConfig } from "../wizard";

const TIMEZONES = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "America/Anchorage", label: "Alaska Time (AKST)" },
  { value: "Pacific/Honolulu", label: "Hawaii Time (HST)" },
];

const FACILITY_TYPES = [
  { value: "behavioral_health", label: "Behavioral Health" },
  { value: "substance_use", label: "Substance Use Treatment" },
  { value: "mental_health", label: "Mental Health" },
  { value: "dual_diagnosis", label: "Dual Diagnosis" },
  { value: "eating_disorder", label: "Eating Disorder" },
];

interface FacilityProfileStepProps {
  config: FacilityConfig;
  setConfig: (config: FacilityConfig) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function FacilityProfileStep({
  config,
  setConfig,
  onNext,
  onPrevious,
}: FacilityProfileStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!config.facility_profile.facility_name.trim()) {
      newErrors.facility_name = "Facility name is required";
    }

    if (!config.facility_profile.primary_address.trim()) {
      newErrors.primary_address = "Address is required";
    }

    if (!config.facility_profile.timezone) {
      newErrors.timezone = "Timezone is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setConfig({
      ...config,
      facility_profile: {
        ...config.facility_profile,
        [field]: value,
      },
    });

    // Clear error
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleStateToggle = (state: string) => {
    const currentStates = config.facility_profile.states_served;
    const newStates = currentStates.includes(state)
      ? currentStates.filter((s) => s !== state)
      : [...currentStates, state];

    setConfig({
      ...config,
      facility_profile: {
        ...config.facility_profile,
        states_served: newStates,
      },
    });
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const STATES = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ];

  return (
    <div className="space-y-6">
      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please fill in all required fields.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Facility Name */}
        <div className="space-y-2">
          <Label htmlFor="facility_name">
            Facility Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="facility_name"
            value={config.facility_profile.facility_name}
            onChange={(e) => handleInputChange("facility_name", e.target.value)}
            placeholder="Beacon Recovery Center"
            className={errors.facility_name ? "border-red-500" : ""}
          />
          {errors.facility_name && (
            <p className="text-sm text-red-500">{errors.facility_name}</p>
          )}
        </div>

        {/* Legal Business Name */}
        <div className="space-y-2">
          <Label htmlFor="legal_business_name">Legal Business Name</Label>
          <Input
            id="legal_business_name"
            value={config.facility_profile.legal_business_name}
            onChange={(e) =>
              handleInputChange("legal_business_name", e.target.value)
            }
            placeholder="Beacon Recovery Center, LLC"
          />
        </div>
      </div>

      {/* Address */}
      <div className="space-y-2">
        <Label htmlFor="primary_address">
          Primary Address <span className="text-red-500">*</span>
        </Label>
        <Input
          id="primary_address"
          value={config.facility_profile.primary_address}
          onChange={(e) => handleInputChange("primary_address", e.target.value)}
          placeholder="123 Main Street, Suite 100, Los Angeles, CA 90012"
          className={errors.primary_address ? "border-red-500" : ""}
        />
        {errors.primary_address && (
          <p className="text-sm text-red-500">{errors.primary_address}</p>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Timezone */}
        <div className="space-y-2">
          <Label htmlFor="timezone">
            Timezone <span className="text-red-500">*</span>
          </Label>
          <Select
            value={config.facility_profile.timezone}
            onValueChange={(value) => handleInputChange("timezone", value)}
          >
            <SelectTrigger
              className={errors.timezone ? "border-red-500" : ""}
            >
              <SelectValue placeholder="Select timezone" />
            </SelectTrigger>
            <SelectContent>
              {TIMEZONES.map((tz) => (
                <SelectItem key={tz.value} value={tz.value}>
                  {tz.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.timezone && (
            <p className="text-sm text-red-500">{errors.timezone}</p>
          )}
        </div>

        {/* Facility Type */}
        <div className="space-y-2">
          <Label htmlFor="facility_type">Facility Type</Label>
          <Select
            value={config.facility_profile.facility_type}
            onValueChange={(value) =>
              handleInputChange("facility_type", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {FACILITY_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="main_phone">Main Phone</Label>
          <Input
            id="main_phone"
            value={config.facility_profile.main_phone}
            onChange={(e) => handleInputChange("main_phone", e.target.value)}
            placeholder="(555) 123-4567"
          />
        </div>

        {/* Website */}
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={config.facility_profile.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            placeholder="https://www.beaconrecovery.com"
          />
        </div>
      </div>

      {/* States Served */}
      <div className="space-y-2">
        <Label>States Served</Label>
        <Card className="p-4">
          <div className="grid grid-cols-5 gap-2 max-h-40 overflow-y-auto">
            {STATES.map((state) => (
              <div key={state} className="flex items-center space-x-2">
                <Checkbox
                  id={`state-${state}`}
                  checked={config.facility_profile.states_served.includes(
                    state
                  )}
                  onCheckedChange={() => handleStateToggle(state)}
                />
                <Label
                  htmlFor={`state-${state}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {state}
                </Label>
              </div>
            ))}
          </div>
          {config.facility_profile.states_served.length > 0 && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {config.facility_profile.states_served.join(", ")}
            </p>
          )}
        </Card>
      </div>

      {/* Navigation handled by parent */}
    </div>
  );
}

// Add useState import
import { useState } from "react";
