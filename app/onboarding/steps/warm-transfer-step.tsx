"use client";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Phone, PhoneCall } from "lucide-react";
import { useState } from "react";
import { FacilityConfig } from "../wizard";

interface WarmTransferStepProps {
  config: FacilityConfig;
  setConfig: (config: FacilityConfig) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function WarmTransferStep({
  config,
  setConfig,
  onNext,
  onPrevious,
}: WarmTransferStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!config.warm_transfer_rules.primary_transfer_number.trim()) {
      newErrors.primary_transfer_number =
        "Primary transfer number is required";
    } else if (
      !/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(
        config.warm_transfer_rules.primary_transfer_number
      )
    ) {
      newErrors.primary_transfer_number = "Invalid phone number format";
    }

    if (
      config.warm_transfer_rules.backup_transfer_number &&
      !/^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/.test(
        config.warm_transfer_rules.backup_transfer_number
      )
    ) {
      newErrors.backup_transfer_number = "Invalid phone number format";
    }

    if (config.warm_transfer_rules.transfer_timeout_seconds < 5) {
      newErrors.transfer_timeout_seconds =
        "Timeout must be at least 5 seconds";
    }

    if (config.warm_transfer_rules.max_transfer_attempts < 1) {
      newErrors.max_transfer_attempts =
        "Must have at least 1 transfer attempt";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string | number) => {
    setConfig({
      ...config,
      warm_transfer_rules: {
        ...config.warm_transfer_rules,
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

  const handleBooleanChange = (field: string, value: boolean) => {
    setConfig({
      ...config,
      warm_transfer_rules: {
        ...config.warm_transfer_rules,
        [field]: value,
      },
    });
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const formatPhoneNumber = (value: string): string => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    
    // Format as (XXX) XXX-XXXX
    if (digits.length <= 3) return digits;
    if (digits.length <= 6)
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handlePhoneInput = (field: string, value: string) => {
    const digits = value.replace(/\D/g, "");
    if (digits.length <= 10) {
      handleInputChange(field, formatPhoneNumber(digits));
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

      {/* Primary Transfer Number */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            <Phone className="inline h-5 w-5 mr-2" />
            Primary Transfer Number
          </h3>
          <p className="text-sm text-gray-600">
            This is the main number the AI agent will transfer calls to during
            business hours or when urgent.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="primary_transfer_number">
            Phone Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="primary_transfer_number"
            value={config.warm_transfer_rules.primary_transfer_number}
            onChange={(e) =>
              handlePhoneInput("primary_transfer_number", e.target.value)
            }
            placeholder="(555) 123-4567"
            className={
              errors.primary_transfer_number ? "border-red-500" : ""
            }
          />
          {errors.primary_transfer_number && (
            <p className="text-sm text-red-500">
              {errors.primary_transfer_number}
            </p>
          )}
          <p className="text-xs text-gray-500">
            This should be your admissions direct line or on-call phone.
          </p>
        </div>
      </Card>

      {/* Backup Transfer Number */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">
            <PhoneCall className="inline h-5 w-5 mr-2" />
            Backup Transfer Number (Optional)
          </h3>
          <p className="text-sm text-gray-600">
            If the primary number doesn't answer, the AI agent will try this
            number.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="backup_transfer_number">Backup Phone Number</Label>
          <Input
            id="backup_transfer_number"
            value={config.warm_transfer_rules.backup_transfer_number}
            onChange={(e) =>
              handlePhoneInput("backup_transfer_number", e.target.value)
            }
            placeholder="(555) 987-6543"
            className={
              errors.backup_transfer_number ? "border-red-500" : ""
            }
          />
          {errors.backup_transfer_number && (
            <p className="text-sm text-red-500">
              {errors.backup_transfer_number}
            </p>
          )}
        </div>
      </Card>

      {/* Transfer Rules */}
      <Card className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Transfer Rules</h3>
          <p className="text-sm text-gray-600">
            Configure how the AI agent handles call transfers.
          </p>
        </div>

        <div className="space-y-6">
          {/* Max Transfer Attempts */}
          <div className="space-y-2">
            <Label htmlFor="max_transfer_attempts">
              Maximum Transfer Attempts
            </Label>
            <Input
              id="max_transfer_attempts"
              type="number"
              min="1"
              max="5"
              value={config.warm_transfer_rules.max_transfer_attempts}
              onChange={(e) =>
                handleInputChange(
                  "max_transfer_attempts",
                  parseInt(e.target.value) || 1
                )
              }
              className={
                errors.max_transfer_attempts ? "border-red-500" : ""
              }
            />
            {errors.max_transfer_attempts && (
              <p className="text-sm text-red-500">
                {errors.max_transfer_attempts}
              </p>
            )}
            <p className="text-xs text-gray-500">
              How many times should the AI agent try to transfer before taking a
              message?
            </p>
          </div>

          {/* Transfer Timeout */}
          <div className="space-y-2">
            <Label htmlFor="transfer_timeout_seconds">
              Transfer Timeout (seconds)
            </Label>
            <Input
              id="transfer_timeout_seconds"
              type="number"
              min="5"
              max="60"
              value={
                config.warm_transfer_rules.transfer_timeout_seconds
              }
              onChange={(e) =>
                handleInputChange(
                  "transfer_timeout_seconds",
                  parseInt(e.target.value) || 20
                )
              }
              className={
                errors.transfer_timeout_seconds ? "border-red-500" : ""
              }
            />
            {errors.transfer_timeout_seconds && (
              <p className="text-sm text-red-500">
                {errors.transfer_timeout_seconds}
              </p>
            )}
            <p className="text-xs text-gray-500">
              How long to wait for the transfer to be answered before trying
              backup.
            </p>
          </div>

          {/* Fallback Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="fallback_callback_required"
              checked={
                config.warm_transfer_rules.fallback_callback_required
              }
              onCheckedChange={(checked) =>
                handleBooleanChange(
                  "fallback_callback_required",
                  checked as boolean
                )
              }
            />
            <Label
              htmlFor="fallback_callback_required"
              className="font-normal cursor-pointer"
            >
              Require callback if all transfer attempts fail
            </Label>
          </div>
        </div>
      </Card>

      {/* After-Hours Transfer */}
      <Card className="p-6 bg-yellow-50 border-yellow-200">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">After-Hours Behavior</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="font-normal cursor-pointer">
                Enable after-hours warm transfer
              </Label>
              <p className="text-sm text-gray-500">
                If disabled, the AI agent will only take messages after hours.
              </p>
            </div>
            <Checkbox
              checked={
                config.warm_transfer_rules.after_hours_transfer_enabled
              }
              onCheckedChange={(checked) =>
                handleBooleanChange(
                  "after_hours_transfer_enabled",
                  checked as boolean
                )
              }
            />
          </div>

          {config.warm_transfer_rules.after_hours_transfer_enabled && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                The AI agent will attempt to transfer after-hours calls to the
                primary number. Make sure your on-call staff is prepared to
                answer.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </Card>

      {/* Preview */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-2">
          Transfer Flow Preview
        </h4>
        <div className="text-sm text-blue-800 space-y-1">
          <p>1. AI agent answers call</p>
          <p>
            2. Collects intake information (name, phone, insurance, etc.)
          </p>
          <p>
            3. Attempts transfer to{" "}
            <span className="font-medium">
              {config.warm_transfer_rules.primary_transfer_number ||
                "[Primary Number]"}
            </span>
          </p>
          {config.warm_transfer_rules.backup_transfer_number && (
            <p>
              4. If no answer, tries{" "}
              <span className="font-medium">
                {config.warm_transfer_rules.backup_transfer_number}
              </span>
            </p>
          )}
          <p>
            {config.warm_transfer_rules.fallback_callback_required
              ? "5. If all attempts fail → Schedule callback"
              : "5. If all attempts fail → Take message only"}
          </p>
        </div>
      </Card>
    </div>
  );
}
