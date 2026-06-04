"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, FileText, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { FacilityConfig } from "../wizard";

interface ComplianceScriptsStepProps {
  config: FacilityConfig;
  setConfig: (config: FacilityConfig) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function ComplianceScriptsStep({
  config,
  setConfig,
  onNext,
  onPrevious,
}: ComplianceScriptsStepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!config.compliance_scripts.opening_disclosure.trim()) {
      newErrors.opening_disclosure = "Opening disclosure is required";
    }

    if (!config.compliance_scripts.not_medical_provider_disclaimer.trim()) {
      newErrors.not_medical_provider_disclaimer =
        "Medical disclaimer is required";
    }

    if (!config.compliance_scripts.emergency_escalation_script.trim()) {
      newErrors.emergency_escalation_script =
        "Emergency escalation script is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setConfig({
      ...config,
      compliance_scripts: {
        ...config.compliance_scripts,
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

  const resetToDefaults = () => {
    setConfig({
      ...config,
      compliance_scripts: {
        opening_disclosure:
          "I'm the after-hours admissions assistant for {{facility_name}}.",
        not_medical_provider_disclaimer:
          "I'm not a clinician and can't provide medical advice or guarantee admission.",
        emergency_escalation_script:
          "If you are in immediate danger, overdosing, or may hurt yourself or someone else, call 911 now or go to the nearest emergency room.",
        privacy_notice_script:
          "I'll collect only the information needed for the admissions team to call you back.",
        consent_to_continue_script:
          "Do I have your permission to collect this information for the admissions team?",
        call_recording_notice:
          "This call may be recorded for quality and follow-up if the facility has enabled recording.",
        third_party_caller_script:
          "I can take your information and the patient's callback details, but the admissions team may need to speak directly with the patient.",
      },
    });
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Please fill in all required scripts.
          </AlertDescription>
        </Alert>
      )}

      <Alert>
        <ShieldCheck className="h-4 w-4" />
        <AlertDescription>
          These scripts ensure your AI agent complies with healthcare regulations
          and maintains patient trust. You can customize them to match your
          facility's voice.
        </AlertDescription>
      </Alert>

      {/* Opening Disclosure */}
      <Card className="p-6">
        <div className="mb-4">
          <Label
            htmlFor="opening_disclosure"
            className="text-base font-semibold"
          >
            Opening Disclosure <span className="text-red-500">*</span>
          </Label>
          <p className="mt-1 text-sm text-gray-600">
            What the AI agent says when answering the call.
          </p>
        </div>
        <Textarea
          id="opening_disclosure"
          value={config.compliance_scripts.opening_disclosure}
          onChange={(e) =>
            handleInputChange("opening_disclosure", e.target.value)
          }
          placeholder="I'm the after-hours admissions assistant for {{facility_name}}."
          className={`min-h-[100px] ${errors.opening_disclosure ? "border-red-500" : ""}`}
        />
        {errors.opening_disclosure && (
          <p className="mt-1 text-sm text-red-500">
            {errors.opening_disclosure}
          </p>
        )}
        <p className="mt-2 text-xs text-gray-500">
          Use {"{{facility_name}}"} to automatically insert your facility name.
        </p>
      </Card>

      {/* Medical Disclaimer */}
      <Card className="p-6">
        <div className="mb-4">
          <Label
            htmlFor="not_medical_provider_disclaimer"
            className="text-base font-semibold"
          >
            Medical Disclaimer <span className="text-red-500">*</span>
          </Label>
          <p className="mt-1 text-sm text-gray-600">
            Disclaimer that the AI is not a medical provider.
          </p>
        </div>
        <Textarea
          id="not_medical_provider_disclaimer"
          value={config.compliance_scripts.not_medical_provider_disclaimer}
          onChange={(e) =>
            handleInputChange(
              "not_medical_provider_disclaimer",
              e.target.value
            )
          }
          placeholder="I'm not a clinician and can't provide medical advice or guarantee admission."
          className={`min-h-[100px] ${errors.not_medical_provider_disclaimer ? "border-red-500" : ""}`}
        />
        {errors.not_medical_provider_disclaimer && (
          <p className="mt-1 text-sm text-red-500">
            {errors.not_medical_provider_disclaimer}
          </p>
        )}
      </Card>

      {/* Emergency Escalation */}
      <Card className="p-6">
        <div className="mb-4">
          <Label
            htmlFor="emergency_escalation_script"
            className="text-base font-semibold"
          >
            Emergency Escalation Script{" "}
            <span className="text-red-500">*</span>
          </Label>
          <p className="mt-1 text-sm text-gray-600">
            Instructions for callers in emergency situations.
          </p>
        </div>
        <Textarea
          id="emergency_escalation_script"
          value={config.compliance_scripts.emergency_escalation_script}
          onChange={(e) =>
            handleInputChange(
              "emergency_escalation_script",
              e.target.value
            )
          }
          placeholder="If you are in immediate danger, overdosing, or may hurt yourself or someone else, call 911 now or go to the nearest emergency room."
          className={`min-h-[100px] ${errors.emergency_escalation_script ? "border-red-500" : ""}`}
        />
        {errors.emergency_escalation_script && (
          <p className="mt-1 text-sm text-red-500">
            {errors.emergency_escalation_script}
          </p>
        )}
      </Card>

      {/* Privacy Notice */}
      <Card className="p-6">
        <div className="mb-4">
          <Label
            htmlFor="privacy_notice_script"
            className="text-base font-semibold"
          >
            Privacy Notice Script
          </Label>
          <p className="mt-1 text-sm text-gray-600">
            Explains what information will be collected and why.
          </p>
        </div>
        <Textarea
          id="privacy_notice_script"
          value={config.compliance_scripts.privacy_notice_script}
          onChange={(e) =>
            handleInputChange("privacy_notice_script", e.target.value)
          }
          placeholder="I'll collect only the information needed for the admissions team to call you back."
          className="min-h-[100px]"
        />
      </Card>

      {/* Consent to Continue */}
      <Card className="p-6">
        <div className="mb-4">
          <Label
            htmlFor="consent_to_continue_script"
            className="text-base font-semibold"
          >
            Consent to Continue Script
          </Label>
          <p className="mt-1 text-sm text-gray-600">
            Asks caller for permission to collect information.
          </p>
        </div>
        <Textarea
          id="consent_to_continue_script"
          value={config.compliance_scripts.consent_to_continue_script}
          onChange={(e) =>
            handleInputChange(
              "consent_to_continue_script",
              e.target.value
            )
          }
          placeholder="Do I have your permission to collect this information for the admissions team?"
          className="min-h-[100px]"
        />
      </Card>

      {/* Call Recording Notice */}
      <Card className="p-6">
        <div className="mb-4">
          <Label
            htmlFor="call_recording_notice"
            className="text-base font-semibold"
          >
            Call Recording Notice
          </Label>
          <p className="mt-1 text-sm text-gray-600">
            Notifies caller if calls are recorded (only shown if recording is
            enabled).
          </p>
        </div>
        <Textarea
          id="call_recording_notice"
          value={config.compliance_scripts.call_recording_notice}
          onChange={(e) =>
            handleInputChange("call_recording_notice", e.target.value)
          }
          placeholder="This call may be recorded for quality and follow-up if the facility has enabled recording."
          className="min-h-[100px]"
        />
      </Card>

      {/* Third-Party Caller Script */}
      <Card className="p-6">
        <div className="mb-4">
          <Label
            htmlFor="third_party_caller_script"
            className="text-base font-semibold"
          >
            Third-Party Caller Script
          </Label>
          <p className="mt-1 text-sm text-gray-600">
            Instructions for when someone calls on behalf of a patient.
          </p>
        </div>
        <Textarea
          id="third_party_caller_script"
          value={config.compliance_scripts.third_party_caller_script}
          onChange={(e) =>
            handleInputChange("third_party_caller_script", e.target.value)
          }
          placeholder="I can take your information and the patient's callback details, but the admissions team may need to speak directly with the patient."
          className="min-h-[100px]"
        />
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between pt-4">
        <Button variant="outline" onClick={resetToDefaults}>
          Reset to Defaults
        </Button>

        <Button
          variant="outline"
          onClick={() => setShowPreview(!showPreview)}
        >
          <FileText className="mr-2 h-4 w-4" />
          {showPreview ? "Hide Preview" : "Preview Scripts"}
        </Button>
      </div>

      {/* Preview */}
      {showPreview && (
        <Card className="p-6 bg-gray-50">
          <h3 className="mb-4 text-lg font-semibold">Script Preview</h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-medium text-gray-900">Opening:</p>
              <p className="mt-1 text-gray-700">
                {config.compliance_scripts.opening_disclosure.replace(
                  "{{facility_name}}",
                  config.facility_profile.facility_name || "[Facility Name]"
                )}
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-900">Disclaimer:</p>
              <p className="mt-1 text-gray-700">
                {config.compliance_scripts.not_medical_provider_disclaimer}
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-900">Emergency:</p>
              <p className="mt-1 text-gray-700">
                {config.compliance_scripts.emergency_escalation_script}
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-900">Privacy:</p>
              <p className="mt-1 text-gray-700">
                {config.compliance_scripts.privacy_notice_script}
              </p>
            </div>

            <div>
              <p className="font-medium text-gray-900">Consent:</p>
              <p className="mt-1 text-gray-700">
                {config.compliance_scripts.consent_to_continue_script}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
